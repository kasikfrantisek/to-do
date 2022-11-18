let show = document.querySelectorAll('.show');
let form = document.querySelectorAll('form');
let container = document.querySelector('.form-container');

let btn_log = document.querySelector('input[value=Login]')

show[0].addEventListener('click', () => {
    hide(0, 1)
})

show[1].addEventListener('click', () => {
    hide(1, 0)
})

function hide(x, y){
        show[y].classList.remove('hidden');
        show[x].classList.add('hidden');

        form[x].classList.remove('hidden');
        form[y].classList.add('hidden');
}

form[0].addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/user/${form[0].username.value}`)
    .then((res) => res.json())
    .then((obj) => {
        document.cookie = `user_id=${form[0].username.value}`
        window.location = './index.html'
    }).catch(err => {
        form[0].innerHTML += `<p style="color :#B80616">This username does not exist</p>`
    })
})

form[1].addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify({username: form[1].username.value}),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((obj) => {
        document.cookie = `user_id=${form[1].username.value}`
        window.location = './index.html'
    }).catch(err => {
        console.log(err)
        form[1].innerHTML += `<p style="color :#B80616">This username already exists</p>`
    })
})

