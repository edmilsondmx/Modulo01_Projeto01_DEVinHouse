const ul = document.getElementById('lista')
let li;
let itemId;
let item;

const listaArray = [];

const form = document.querySelector('form');
form.addEventListener('submit', el =>{
    el.preventDefault();
});

const gerarId = () => {
    return Math.floor(Math.random() * 1000);
}

addItem = () => {
    if(document.getElementById('list-item').value != ""){
        item = document.getElementById('list-item');;
        itemId = gerarId()
        li = criarElItem(item.value, itemId);
        li.appendChild(criarBtnCheck(itemId));
        li.appendChild(criarBtnRemover(itemId));
        ul.appendChild(li);

        listaArray.push({'id':itemId, 'item':item.value, 'valor': 0})

        item.value = "";
        item.focus();
    } else {
        alert('Digite um item na lista!');
    }

    console.log(listaArray)

}

removeItem = (itemId) => {
    for(i = 0; i < ul.children.length; i++ ){
        if(ul.children[i].getAttribute("index") == itemId){
            ul.children[i].remove();
        };
        if(listaArray[i].id == itemId){
            listaArray.splice(i, 1);
        };
    };
    console.log(listaArray)
};

criarElItem = (itemValue, itemId) => {
    let li = document.createElement('li');
    li.setAttribute('index', itemId);
    li.appendChild(document.createTextNode(itemValue));
    return li;

}

criarBtnRemover = (itemId) => {
    let btn = document.createElement('button');
    btn.setAttribute('onclick', 'removeItem('+itemId+')');
    btn.innerHTML = "X";
    btn.className = "excluiItem"
    return btn;
}

criarBtnCheck = (itemId) => {
    let btnCheck = document.createElement('input');
    btnCheck.type = 'checkbox';
    btnCheck.className = "form-check-input";
    btnCheck.setAttribute('onclick', 'abreModal('+itemId+')');

    return btnCheck;
}

const modal = document.getElementById('exampleModal')
modal.addEventListener('click', function(e) {
    if (e.target == this){
        modal.style.display = 'none';
    };
});  



function abreModal(itemId){
    modal.style.display = 'block';
    for(i = 0; i < ul.children.length; i++ ){
        if(ul.children[i].getAttribute("index") == itemId){
            ul.children[i].className = "taxado";
        };
    }
};


function fechaModal(itemId) {
    modal.style.display = 'none';
};


const insereValor = (itemId) => {
    const valorItem = document.getElementById('valor');
    let valor = Number(valorItem.value);
    for(i = 0; i < listaArray.length; i++ ){
        if(listaArray[i].id == itemId){
            listaArray[i].valor = valor;
        };
    };
    
    modal.value = "";
    fechaModal()
    totalFinal()
    console.log(listaArray)
};


const totalFinal = () => {
    const total = document.getElementById('total')
    const somaTotal = listaArray.reduce((soma, item) => soma + item.valor, 0).toFixed(2);
    total.innerText = `R$ ${somaTotal.toLocaleString()}`
}


