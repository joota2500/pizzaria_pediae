// ================================
// SISTEMA DE ENTREGA
// ================================


// -------------------------------
// NORMALIZAR NOME DO BAIRRO
// -------------------------------

function normalizarBairro(nome){

return nome
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"")
.replaceAll(" ","")

}



// -------------------------------
// CALCULAR TAXA DE ENTREGA
// -------------------------------

function calcularEntrega(bairro){

if(!CONFIG || !bairro) return 0

const chave = normalizarBairro(bairro)

const taxa = CONFIG.taxaEntrega[chave]

return taxa || 0

}



// -------------------------------
// MOSTRAR TAXA NA TELA
// -------------------------------

function mostrarTaxaEntrega(bairro){

const elemento = document.getElementById("taxaEntrega")

if(!elemento) return

const taxa = calcularEntrega(bairro)

if(typeof formatarMoeda === "function"){

elemento.innerText = "Entrega: " + formatarMoeda(taxa)

}else{

elemento.innerText = "Entrega: R$ " + taxa

}

}



// -------------------------------
// ATUALIZAR TOTAL COM ENTREGA
// -------------------------------

function atualizarTotalEntrega(){

const bairroSelect = document.getElementById("bairro")
const totalElemento = document.getElementById("totalResumo")

if(!bairroSelect || !totalElemento) return

const bairro = bairroSelect.value
const taxa = calcularEntrega(bairro)

let subtotal = 0

if(typeof pedido !== "undefined" && Array.isArray(pedido)){

pedido.forEach(item=>{

const qtd = item.qtd || 1
subtotal += Number(item.preco) * Number(qtd)

})

}

const totalFinal = subtotal + Number(taxa)

if(typeof formatarMoeda === "function"){

totalElemento.innerText = "Total: " + formatarMoeda(totalFinal)

}else{

totalElemento.innerText = "Total: R$ " + totalFinal

}

}



// -------------------------------
// PREENCHER SELECT DE BAIRROS
// -------------------------------

function carregarBairros(){

const select = document.getElementById("bairro")

if(!select || !CONFIG) return

Object.keys(CONFIG.bairros).forEach(chave=>{

const option = document.createElement("option")

option.value = chave
option.innerText = CONFIG.bairros[chave]

select.appendChild(option)

})

}



// -------------------------------
// EVENTO DE ALTERAÇÃO DE BAIRRO
// -------------------------------

document.addEventListener("DOMContentLoaded",()=>{

carregarBairros()

const bairroSelect = document.getElementById("bairro")

if(bairroSelect){

bairroSelect.addEventListener("change",()=>{

const bairro = bairroSelect.value

mostrarTaxaEntrega(bairro)

atualizarTotalEntrega()

})

}

})