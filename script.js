const botao = document.getElementById('btn');
const produto = document.getElementById('list-item');
const lista = document.getElementById('lista');

const form = document.querySelector('form');
form.addEventListener('submit', el =>{
    el.preventDefault();
});

botao.addEventListener('click', () => {
    if(produto.value){
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.className = "form-check-input";
        check.setAttribute('onclick', "abreModal()")

        const btnExclui = document.createElement('button');
        btnExclui.onclick = () => removeItem();
        btnExclui.textContent = 'X';
        btnExclui.className = 'excluiItem';

        const item = document.createElement('li');
        item.appendChild(check);
        item.innerHTML += produto.value;
        item.appendChild(btnExclui);
        lista.appendChild(item);
        produto.value = "";
        produto.focus();
        
        return carrinho.nome
        
    } else {
        alert('Digite um item na lista!');
    };
});


const modal = document.getElementById('exampleModal')
modal.addEventListener('click', function(e) {
    if (e.target == this){
        modal.style.display = 'none';
    };
});  

function abreModal() {
    modal.style.display = 'block';
};
  
function fechaModal() {
    modal.style.display = 'none';
};


const insereValor = () => {
    const valorItem = document.getElementById('valor');
    modal.value = "";
    fechaModal();
    console.log(valorItem.value)
};






