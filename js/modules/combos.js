// ================================
// DADOS DOS COMBOS
// ================================

const combos = [

{
nome:"Combo Calabresa",
desc:"Pizza Calabresa + Coca 1L",
preco:40,
img:"img/combos/comboCalabresa.jpg"
},

{
nome:"Combo Portuguesa",
desc:"Pizza Portuguesa + Guaraná",
preco:42,
img:"img/combos/comboPortuguesa.jpg"
},

{
nome:"Combo Teste 1",
desc:"Pizza + refri",
preco:35,
img:"img/combos/comboCalabresa.jpg"
},

{
nome:"Combo Teste 2",
desc:"Pizza + suco",
preco:36,
img:"img/combos/comboPortuguesa.jpg"
}

]

// ================================
// VARIÁVEIS
// ================================

let aberto = false
let listaCombos

// 🔥 estado local
let comboSelecionado = null



// ================================
// BLOQUEIO GLOBAL
// ================================

function comboBloqueado(){

if(typeof temPizzaSimples === "function" && temPizzaSimples()){
return true
}

if(typeof pedidoAtual !== "undefined" && pedidoAtual.pizza){
return true
}

return false
}



// ================================
// CRIAR CARD
// ================================

function criarCardCombo(c){

const card = document.createElement("article")
card.className = "combo-card"

card.innerHTML = `
<img src="${c.img}" alt="${c.nome}">
<h3>${c.nome}</h3>
<p>${c.desc}</p>
<p class="preco">R$ ${c.preco}</p>
<button class="btn btn-warning">Selecionar</button>
`

const botao = card.querySelector("button")


// ================================
// CLICK (🔥 NOVA LÓGICA)
// ================================

botao.onclick = ()=>{

// bloqueio
if(comboBloqueado()){
notificar("❌ Não pode usar combo com pizza mais pedida","danger")
return
}


// ================================
// 🔁 TOGGLE (DESSELECIONAR)
// ================================

if(comboSelecionado && comboSelecionado.nome === c.nome){

comboSelecionado = null

card.classList.remove("selecionado")
botao.innerText="Selecionar"

notificar("Combo removido","warning")

return
}


// ================================
// 🔥 LIMPAR OUTROS
// ================================

document.querySelectorAll(".combo-card").forEach(card=>{
card.classList.remove("selecionado")
card.querySelector("button").innerText="Selecionar"
})


// ================================
// 🔥 SELECIONAR
// ================================

comboSelecionado = c

card.classList.add("selecionado")
botao.innerText="✔ Selecionado"

notificar("Combo selecionado","success")


// ================================
// 🚀 FUTURO (PÁGINA)
// ================================
// window.location.href = "combo.html"

}

return card
}



// ================================
// RENDER
// ================================

function renderCombos(qtd){

if(!listaCombos) return

listaCombos.innerHTML=""

combos.slice(0,qtd).forEach(c=>{
listaCombos.appendChild(criarCardCombo(c))
})

}



// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",()=>{

listaCombos = document.getElementById("lista-combos")
const btn = document.getElementById("verCombos")

if(!listaCombos) return

renderCombos(2)

if(btn){

btn.onclick = ()=>{

aberto = !aberto

if(aberto){
renderCombos(combos.length)
btn.innerText = "Mostrar menos"
}else{
renderCombos(2)
btn.innerText = "Ver todos combos"
}

}

}

})