let show = document.querySelectorAll('.show');
let form = document.querySelectorAll('form');
let container = document.querySelector('.form-container');

let btn_log = document.querySelector('input[value=Login]')

show[0]?.addEventListener('click', () => {
    hide(0, 1)
})

show[1]?.addEventListener('click', () => {
    hide(1, 0)
})

function hide(x, y){
        show[y].classList.remove('hidden');
        show[x].classList.add('hidden');

        form[x].classList.remove('hidden');
        form[y].classList.add('hidden');
}

form[0]?.addEventListener('submit', (event) => {
    console.log(form[0].username.value)
    event.preventDefault();
    fetch(`http://localhost:3000/user/${form[0].username.value}`)
    .then((res) => res.json())
    .then((obj) => {
        window.location = './index.html'
    })
})

form[1]?.addEventListener('submit', (event) => {
    console.log(form[1].username.value)
    event.preventDefault();
    fetch(`http://localhost:3000/user/${form[1].username.value}`)
    .then((res) => res.json())
    .then((obj) => {
        window.location = './index.html'
    })
})

