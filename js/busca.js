// ================================
// BUSCA DE PIZZAS MELHORADA
// ================================

function buscarPizza(){

const campo = document.getElementById("buscarPizza")
if(!campo) return

const termo = normalizarTexto(campo.value.trim())

const cards = document.querySelectorAll("#lista-pizzas .pizza-card")

let resultados = 0


// campo vazio mostra tudo
if(termo === ""){

cards.forEach(card=>{
card.style.display=""
})

removerMensagemBusca()

return

}


cards.forEach(card=>{

const titulo = card.querySelector("h3")

if(!titulo) return

const nome = normalizarTexto(titulo.innerText)

const ingredientes =
card.querySelector(".ingredientes") ?
normalizarTexto(card.querySelector(".ingredientes").innerText) : ""

if(nome.includes(termo) || ingredientes.includes(termo)){

card.style.display=""
resultados++

}else{

card.style.display="none"

}

})

mostrarMensagemBusca(resultados)

}



// ================================
// NORMALIZAR TEXTO (REMOVER ACENTOS)
// ================================

function normalizarTexto(texto){

return texto
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"")

}



// ================================
// MOSTRAR MENSAGEM DE RESULTADO
// ================================

function mostrarMensagemBusca(total){

let aviso = document.getElementById("semResultado")

if(!aviso){

aviso = document.createElement("p")

aviso.id="semResultado"
aviso.style.textAlign="center"
aviso.style.marginTop="20px"
aviso.style.fontWeight="600"

const lista = document.getElementById("lista-pizzas")

if(lista){
lista.after(aviso)
}

}

if(total === 0){

aviso.innerText="❌ Nenhuma pizza encontrada"

}else{

aviso.innerText=""

}

}



// ================================
// REMOVER MENSAGEM
// ================================

function removerMensagemBusca(){

const aviso = document.getElementById("semResultado")

if(aviso){
aviso.innerText=""
}

}