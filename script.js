const ul = document.getElementById('lista');
let li;
let itemId;
let item;

let listaArray = [];


const form = document.getElementById('form');
form.addEventListener('submit', el =>{
    el.preventDefault();
});

//Função que gera id aleatório
const gerarId = () => {
    return Math.floor(Math.random() * 1000);
};

//Função que adiciona item no array
const adicionaItem = () => {
    item = document.getElementById('list-item');
    itemId = gerarId();
    if(item.value.trim() != ""){
        if(listaArray == null){
            listaArray = [];
        }
        listaArray.push({selecionado: false, 'id':itemId, 'item':item.value, 'valor': 0});
        console.log(listaArray);
        addHtml(item.value, itemId);
        salvaLocalStorage('Lista', listaArray)
        item.value = "";
        item.focus();
    }else {
        alert('Digite um item na lista!');
    };
};

//Função que cria elemento li da lista
const criarElemItem = (itemValue, itemId) => {
    let li = document.createElement('li');
    li.setAttribute('index', itemId);
    li.appendChild(document.createTextNode(itemValue));
    return li;
};

//Função que adiona item do do array no HTML
const addHtml = (itemValue, itemId) => {
    let hr = document.createElement('hr')
    li = criarElemItem(itemValue, itemId);
    li.appendChild(criarBtnCheck(itemId));
    li.appendChild(criarBtnRemover(itemId));
    li.appendChild(hr)
    ul.appendChild(li);
};

//Função que remove item do array
const removeItem = (itemId) => {
    for(i = 0; i < ul.children.length; i++ ){
        if(ul.children[i].getAttribute("index") == itemId){
            ul.children[i].remove();
        };
        if(listaArray[i].id == itemId){
            listaArray.splice(i, 1);
        };
    };
    totalFinal(listaArray);
    salvaLocalStorage('Lista', listaArray);
    console.log(listaArray);
};

//Função que cria botão de remover
const criarBtnRemover = (itemId) => {
    let btn = document.createElement('button');
    btn.setAttribute('onclick', 'removeItem('+itemId+')');
    btn.innerHTML = "X";
    btn.className = "excluiItem"

    return btn;
};

//Função que cria botão checkbox
const criarBtnCheck = (itemId) => {
    let btnCheck = document.createElement('input');
    btnCheck.type = 'checkbox';
    btnCheck.className = "form-check-input";
    btnCheck.checked = false;
    btnCheck.setAttribute('onclick', 'abreModal('+itemId+')');

    return btnCheck;
};

//Função que impede modar de ser fehado sem colocar valor
const modal = document.getElementById('exampleModal')
modal.addEventListener('click', function(elem) {
    if (elem.target == this){
        alert('Insira um valor no campo!');
    };
}); 

//Função de abrir modal, deixar item selecionado e taxado
let idItemSelecionado;
const abreModal = (itemId) => {
    modal.style.display = 'block';
    let valor = document.getElementById('valor');
    let item = document.getElementById('itemPreco');
    valor.focus();
    for(i = 0; i < ul.children.length; i++ ){
        if(ul.children[i].getAttribute("index") == itemId){
            ul.children[i].className = "taxado";
            listaArray[i].selecionado = true;
            item.textContent = ` - ${listaArray[i].item.toUpperCase()}`
            idItemSelecionado = ul.children[i].getAttribute("index");
        };
    };

};

//Função de fechar modal
const fechaModal = () => {
    let valor = document.getElementById('valor');
    valor.value?modal.style.display = 'none':alert('Insira um valor no campo!');
};

//Função de inserir valor
const insereValor = () => {
    const valorItem = document.getElementById('valor');
    let valor = Number(valorItem.value);
    for(i = 0; i < listaArray.length; i++ ){
        if(listaArray[i].id == idItemSelecionado){
            listaArray[i].valor = valor;
        };
    };
    console.log(listaArray);
    salvaLocalStorage('Lista', listaArray);
    fechaModal();
    valorItem.value = "";
    totalFinal(listaArray);
};

//função que soma o valor total da lista
const totalFinal = (lista) => {
    const total = document.getElementById('total')
    const somaTotal = lista.reduce((soma, item) => soma + item.valor, 0).toFixed(2).replace('.',',');
    total.innerText = `R$ ${somaTotal.toLocaleString('pt-BR')}`;
};

//Função que salva item no LocalStorage
const salvaLocalStorage = (chave, elem) => {
    localStorage.setItem(chave, JSON.stringify(elem));
};

//Função que retorna item do LocalStorage
const recebeLocalStorage = () => {
    let listaLocalStorage = localStorage.getItem('Lista');
    listaArray = JSON.parse(listaLocalStorage);
};

//Função que atualiza item se for recarregada a página
const atualizar = () => {
    if(listaArray == null){
        listaArray = [];
    } else{
        listaArray.forEach((prod) => {
            addHtml(prod.item, prod.id);
        });
    }
    let btnCheck = document.querySelectorAll('.form-check-input');
    for(let i = 0; i < listaArray.length; i++){
        if(listaArray[i].selecionado == true){
            btnCheck[i].checked = true;
            ul.children[i].className = "taxado";
        };
    };
};


//Função de limpar lista e LocalStorage
const limparLocalStorage = () => {
    localStorage.clear();
    location.reload();
    listaArray.splice(0, listaArray.length);
    console.log(listaArray);
};

//Função de Recarregar a página
const carregarPagina = () => {
    recebeLocalStorage();
    atualizar();
    totalFinal(listaArray);
    console.log(listaArray);
};
