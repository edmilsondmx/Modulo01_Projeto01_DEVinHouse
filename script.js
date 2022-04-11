const botao = document.getElementById('btn');
const produto = document.getElementById('list-item');
const lista = document.getElementById('lista');

const check = document.createElement('input');
check.type = 'checkbox';
check.className = "form-check-input";



botao.addEventListener('click', () => {
    const item = document.createElement('li');
    item.appendChild(check)
    item.innerHTML += produto.value
    lista.appendChild(item)
});