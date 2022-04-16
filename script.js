const ul = document.getElementById('lista')
let li;
let itemId;
let item;

let listaArray = [];


const form = document.getElementById('form');
form.addEventListener('submit', el =>{
    el.preventDefault();
});

const gerarId = () => {
    return Math.floor(Math.random() * 1000);
}

const adicionaItem = () => {
    item = document.getElementById('list-item');;
    itemId = gerarId()
    if(item.value.trim() != ""){
        if(listaArray == null){
            listaArray = [];
        }
        listaArray.push({selecionado: false, 'id':itemId, 'item':item.value, 'valor': 0});
        console.log(listaArray)
        addHtml(item.value, itemId)
        salvaLocalStorage('Lista', listaArray)
        item.value = ""
        item.focus();
    }else {
        alert('Digite um item na lista!');
    }

}


const addHtml = (itemValue, itemId) => {
    li = criarElemItem(itemValue, itemId);
    li.appendChild(criarBtnCheck(itemId));
    li.appendChild(criarBtnRemover(itemId));
    ul.appendChild(li);

}

const removeItem = (itemId) => {
    for(i = 0; i < ul.children.length; i++ ){
        if(ul.children[i].getAttribute("index") == itemId){
            ul.children[i].remove();
        };
        if(listaArray[i].id == itemId){
            listaArray.splice(i, 1);
        };
    };
    totalFinal(listaArray)
    salvaLocalStorage('Lista', listaArray)
    console.log(listaArray)
    
};

const criarElemItem = (itemValue, itemId) => {
    let li = document.createElement('li');
    li.setAttribute('index', itemId);
    li.appendChild(document.createTextNode(itemValue));
    return li;

}

const criarBtnRemover = (itemId) => {
    let btn = document.createElement('button');
    btn.setAttribute('onclick', 'removeItem('+itemId+')');
    btn.innerHTML = "X";
    btn.className = "excluiItem"
    return btn;
}

const criarBtnCheck = (itemId) => {
    let btnCheck = document.createElement('input');
    btnCheck.type = 'checkbox';
    btnCheck.className = "form-check-input";
    btnCheck.checked = false;
    btnCheck.setAttribute('onclick', 'abreModal('+itemId+')');

    return btnCheck;
}

const modal = document.getElementById('exampleModal')
modal.addEventListener('click', function(ele) {
    if (ele.target == this){
        alert('Insira um valor no campo!')
    };
}); 


let idItemSelecionado;
function abreModal(itemId){
    modal.style.display = 'block';
    let valor = document.getElementById('valor');
    let item = document.getElementById('itemPreço');

    valor.focus()
    for(i = 0; i < ul.children.length; i++ ){
        if(ul.children[i].getAttribute("index") == itemId){
            ul.children[i].className = "taxado";
            listaArray[i].selecionado = true;
            item.textContent = ` - ${listaArray[i].item.toUpperCase()}`
            idItemSelecionado = ul.children[i].getAttribute("index");
        };
    }

    
};


function fechaModal() {
    modal.style.display = 'none';
};


const insereValor = () => {
    const valorItem = document.getElementById('valor');
    let valor = Number(valorItem.value);
    for(i = 0; i < listaArray.length; i++ ){
        if(listaArray[i].id == idItemSelecionado){
            listaArray[i].valor = valor;
        };
    };
    console.log(listaArray)
    salvaLocalStorage('Lista', listaArray)
    valorItem.value = "";
    fechaModal()
    totalFinal(listaArray)
};


const totalFinal = (list) => {
    const total = document.getElementById('total')
    const somaTotal = list.reduce((soma, item) => soma + item.valor, 0).toFixed(2).replace('.',',');
    total.innerText = `R$ ${somaTotal.toLocaleString('pt-BR')}`;
}

const salvaLocalStorage = (key, elem) => {
    localStorage.setItem(key, JSON.stringify(elem))
};

const recebeLocalStorage = () => {
    let listaLocal = localStorage.getItem('Lista');
    listaArray = JSON.parse(listaLocal);
}

const atualizar = () => {
    if(listaArray == null){
        listaArray = [];
    } else{
        listaArray.forEach((prod) => {
            addHtml(prod.item, prod.id);
        })
    }
    let btnCheck = document.querySelectorAll('.form-check-input');
    for(let i = 0; i < listaArray.length; i++){
        if(listaArray[i].selecionado == true){
            btnCheck[i].checked = true;
            ul.children[i].className = "taxado";
        };
    };
};

const limparLocalStorage = () => {
    localStorage.clear();
    location.reload()
    listaArray.splice(0, listaArray.length);
    console.log(listaArray)
}


const carregarPagina = () => {
    recebeLocalStorage();
    atualizar()
    totalFinal(listaArray)
    console.log(listaArray)
}
