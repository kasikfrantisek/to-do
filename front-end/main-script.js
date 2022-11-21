let username = document.cookie.slice(8);
let container = document.querySelector('.container');
let statut = document.querySelectorAll('.status');
let addForm = document.querySelector('.add-form');
let addBtn = document.querySelector('.add-todo');
let addClose = document.querySelector('.add-close');
let addModal = document.querySelector('.add-modal');
let editModal = document.querySelector('.edit-modal');
let editForm = document.querySelector('.edit-form');
let user = document.querySelector('.name');

user.textContent = username

function tasksFunctionality(){
    let tasks = document.querySelectorAll('.task');
    let edit = document.querySelectorAll('.edit')
    
    for(let i = 0; i < tasks.length; i++){
        tasks[i].addEventListener('mouseenter', () => {
            edit[i].classList.remove('hidden')
        })
        tasks[i].addEventListener('mouseleave', () => {
            edit[i].classList.add('hidden')
        })
    }
}

function editBtnFunctionality(){
    let editBtn = document.querySelectorAll('.edit-btn');

    for(let i = 0; i < editBtn.length; i++){
        editBtn[i].addEventListener('click', () => {
            addBtn.classList.add('hidden')
            addClose.classList.remove('hidden')
            container.setAttribute('style', "display:none")
            editModal.classList.remove('hidden')
        })


        editBtn[i].addEventListener('click', (event) => {
            fetch(`http://localhost:3000/posts/${Number(event.target.id)}/post`)
            .then(res => res.json())
            .then(obj => {
                editForm.title.value = obj.title;
                document.querySelector('textarea[form=edit]').textContent = obj.body;
                editForm.status.value = obj.status;
                addPost(editForm, `http://localhost:3000/posts/${Number(event.target.id)}/post`, "PUT" )
            })
        })
    }
}

function deleteBtnFunctionality(){
    let delete_btn = document.querySelectorAll('.delete');

    for(let i = 0; i < delete_btn.length; i++){
        delete_btn[i].addEventListener('click', (event) => {
            fetch(`http://localhost:3000/posts/${Number(event.target.id)}`, {
            method: "DELETE",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            }
        })
        location.reload()
        })
    }
    
}

function getId(){
   fetch(`http://localhost:3000/user/${username}`)
    .then(res => res.json())
    .then(obj => {
        return obj.user_id;
    })
}

async function getPosts(){
    let resId = await fetch(`http://localhost:3000/user/${username}`);
    let objId = await resId.json();

    let resPost = await fetch(`http://localhost:3000/posts/${objId.user_id}/owner`)
    let objPost = await resPost.json();

    for(let i = 0; i < objPost.length; i++){
        let ago = Math.floor((new Date() - ((new Date(objPost[i].timestamp)).getTime())) / 86400000)
        for(let j = 0; j < statut.length; j++){
            if(statut[j].classList.contains(objPost[i].status)){
                statut[j].innerHTML += `<div class="task ${objPost[i].status}">
                <h4 class="title">${objPost[i].title}</h4>
                <p class="body">${objPost[i].body}</p>
                <p class="ago">${ago} days ago</p>
                <div class="edit hidden">
                        <ion-icon class="edit-btn" id=${objPost[i].post_id} name="create-outline"></ion-icon>
                        <ion-icon class="delete" id=${objPost[i].post_id} name="trash-outline"></ion-icon>
                </div>
            </div>`
            }
        }
    }

    tasksFunctionality();
    deleteBtnFunctionality();
    editBtnFunctionality()
}

getPosts();



let out_btn = document.querySelector('.log-out');

out_btn.addEventListener('click', () =>{
    window.location = `./log.html`
})


function addPost(form, adress, methods){
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        let resId = await fetch(`http://localhost:3000/user/${username}`);
        let objId = await resId.json();
    
        await fetch(adress,{
            method: methods,
            body: JSON.stringify({
                title: form.title.value,
                body: form.body.value,
                status: form.status.value,
                owner: objId.user_id
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        location.reload()
        
    })
}

addPost(addForm, "http://localhost:3000/posts", "POST" )



addBtn.addEventListener('click', () => {
    addModal.classList.remove('hidden')
    addBtn.classList.add('hidden')
    addClose.classList.remove('hidden')
    container.setAttribute('style', "display:none")
})

addClose.addEventListener('click', () => {
    if(addModal.classList.contains('hidden')){
        editModal.classList.add('hidden')
    } else{
        addModal.classList.add('hidden')
    }
    addBtn.classList.remove('hidden')
    addClose.classList.add('hidden')
    container.removeAttribute('style')
})