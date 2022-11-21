const express = require('express');
const { toNamespacedPath } = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const conn = require('./db');
const port = 3000;

let cors = require("cors");
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static('static'));

app.set('view engine', 'ejs');

app.listen(port, () => console.log(`You are listening to port ${port}`));


// POST /users
app.post('/users', (req, res) => {
    conn.query(`SELECT * FROM users WHERE username = ?`, [req.body.username], (err, check) => {
        if(err) throw err;
        console.log(check.length >= 1)
        if(check.length >= 1){
            res.status(400).send(err)
            return;
        } else {
        conn.query(`INSERT INTO users SET ?`, req.body, (err, user) => {
            if(err) throw err;
            conn.query(`SELECT * FROM users WHERE user_id = ?`, [user.insertId], (err, result) => {
                if(err) throw err;
                console.log(result)
                res.setHeader('Content-Type', 'application/json')
                .status(200).json(result[0]);
            })
        })
    }
    })
})


// GET /users
app.get('/users', (req, res) => {
    conn.query(`SELECT * FROM users`, (err, users) => {
        if(err) throw err;
        res.setHeader('Content-type', 'application/json')
        .status(200).json(users);
    })
})


// GET /user/:username
app.get('/user/:username', (req, res) => {
    let username = req.params.username;
    conn.query(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if(err) throw err;
        res.setHeader('Content-type', 'application/json')
        .status(200).json(user[0]);
    })
})

//POST /posts
app.post('/posts', (req, res) => {
    conn.query(`INSERT INTO posts SET ?`, req.body, (err, posts) => {
        if(err) throw err;
        conn.query(`SELECT * FROM posts WHERE post_id = ?`, [posts.insertId], (err, post) => {
            if(err) throw err;
            res.setHeader('Content-type', 'application/json')
            .status(200).json(post[0]);
        })
    })
})

//GET /posts
app.get('/posts', (req, res) => {
    conn.query(`SELECT * FROM posts;`, (err, posts) => {
        if(err) throw err;
        res.setHeader('Content-type', 'application/json')
        .status(200).json(posts);
    })
})

//GET /posts/:owner/owner
app.get('/posts/:owner/owner', (req, res) =>{
    let owner = Number(req.params.owner);
    conn.query(`SELECT * FROM posts WHERE owner = ?`, [owner], (err, posts) => {
        if(err) throw err;
        res.setHeader('Content-type', 'application/json')
        .status(200).json(posts);
    })
})

//GET /posts/:post_id/post
app.get('/posts/:post_id/post', (req, res) => {
    let post_id = Number(req.params.post_id);
    conn.query(`SELECT * FROM posts WHERE post_id = ?`, [post_id], (err, posts) => {
        if(err) throw err;
        res.setHeader('Content-type', 'application/json')
        .status(200).json(posts[0]);
    })
})

//DELETE /posts/:post_id
app.delete('/posts/:post_id', (req, res) => {
    let post_id = Number(req.params.post_id);
    conn.query(`SELECT * FROM posts WHERE post_id = ?`, [post_id], (err, posts) => {
        if(err) throw err;
        conn.query(`DELETE FROM posts WHERE post_id = ?`, [post_id], (err, deleted) =>{
            if(err) throw err;
            res.setHeader('Content-type', 'application/json')
            .status(200).json(posts[0]);
        })
    })
})

//PUT /posts/:post_id/post
app.put('/posts/:post_id/post', (req, res) =>{
    let post_id = Number(req.params.post_id);
        conn.query(`UPDATE posts SET ? WHERE post_id = ${post_id};`, req.body,  (err, post) => {
            if(err) throw err;
            conn.query(`SELECT * FROM posts WHERE post_id = ?`, [post_id], (err, updated) => {
                if(err) throw err;
                res.setHeader('Content-type', 'application/json')
                .status(200).json(updated[0]);
            })
        })

})