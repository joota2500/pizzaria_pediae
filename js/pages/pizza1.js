// ================================
// ESTADO V3 (MÚLTIPLAS PIZZAS)
// ================================

let pizzasSelecionadas = []



// ================================
// FORMATAR
// ================================

function formatarMoeda(valor){
return Number(valor).toLocaleString("pt-BR",{
style:"currency",
currency:"BRL"
})
}



// ================================
// 🔍 BUSCA
// ================================

function filtrarPizza(valor){

valor = valor.toLowerCase()

if(valor.length === 0){
renderPizzas(4)
return
}

if(typeof renderPizzas === "function"){
renderPizzas(pizzas.length)
}

document.querySelectorAll(".pizza-card").forEach(card=>{

const nome = card.dataset.nome || ""

card.style.display =
nome.includes(valor) ? "block" : "none"

})

}
function renderVisual(){

// limpa tudo
document.querySelectorAll(".pizza-card").forEach(c=>{
c.classList.remove("pizza-selecionada")
})

document.querySelectorAll(".tamanhos button").forEach(b=>{
b.classList.remove("ativo")
})

// reaplica seleção real
pizzasSelecionadas.forEach(p=>{

document.querySelectorAll(".pizza-card").forEach(card=>{

if(card.dataset.nome === p.nome.toLowerCase()){

card.classList.add("pizza-selecionada")

card.querySelectorAll(".tamanhos button").forEach(btn=>{
if(btn.innerText === p.tamanho){
btn.classList.add("ativo")
}
})

}

})

})

}



// ================================
// 🍕 SELEÇÃO V3 (MÚLTIPLAS)
// ================================

function selecionarPizzaLocal(botao,nome,tamanho,preco,ingredientes){

const card = botao.closest(".pizza-card")

const key = `${nome}_${tamanho}`

const pizza = { nome, tamanho, preco, ingredientes, key }

// ================================
// 🔁 TOGGLE (REMOVE)
// ================================

const index = pizzasSelecionadas.findIndex(p => p.key === key)

if(index !== -1){

pizzasSelecionadas.splice(index,1)

renderVisual()
atualizarResumo()
return
}

// ================================
// ADICIONAR
// ================================

if(pizzasSelecionadas.length > 0){

const confirmar = confirm("👉 Deseja adicionar outra pizza?")

if(!confirmar){
pizzasSelecionadas = []
}

}

pizzasSelecionadas.push(pizza)

renderVisual()
atualizarResumo()

// scroll
document.querySelector(".resumo-pedido")?.scrollIntoView({
behavior:"smooth"
})

// sugestão
sugestao(nome)

}



// ================================
// 💡 SUGESTÃO
// ================================

function sugestao(nome){

nome = nome.toLowerCase()

if(nome.includes("calabresa")){
notificar?.("💡 Combina com Coca-Cola!")
}

if(nome.includes("frango")){
notificar?.("💡 Que tal um Guaraná?")
}

}



// ================================
// LIMPAR UI
// ================================

function limparUI(){

document.querySelectorAll(".pizza-card").forEach(c=>{
c.classList.remove("pizza-selecionada")
})

document.querySelectorAll(".tamanhos button").forEach(b=>{
b.classList.remove("ativo")
})

}



// ================================
// RESUMO V3 🔥
// ================================

function atualizarResumo(){

const texto = document.getElementById("resumoTexto")
const btn = document.getElementById("btnProximo")

if(pizzasSelecionadas.length === 0){
texto.innerText = "Nenhuma pizza selecionada"
btn.disabled = true
return
}

let html = ""
let total = 0

pizzasSelecionadas.forEach((p,i)=>{

total += p.preco

html += `
<strong>Pizza ${i+1}:</strong> ${p.nome}<br>
<small>${p.ingredientes}</small><br>
Tamanho: ${p.tamanho}<br><br>
`

})

html += `
<span style="color:#28a745;font-weight:600;">
Total: ${formatarMoeda(total)}
</span>
`

 texto.innerHTML = html

// 🔥 sempre rola pro final quando adiciona
texto.scrollTop = texto.scrollHeight

btn.disabled = false

}



// ================================
// CANCELAR
// ================================

function cancelar(){

pizzasSelecionadas = []
limparUI()
atualizarResumo()

}



// ================================
// PRÓXIMO → ADICIONAIS 🔥
// ================================

function proximo(){

if(pizzasSelecionadas.length === 0) return

// 🔥 estrutura V3
window.pedidoAtual = {
itens: pizzasSelecionadas.map(p=>({
nome: p.nome,
tamanho: p.tamanho,
preco: p.preco,
ingredientes: p.ingredientes,
adicionais: []
}))
}

// abre adicionais
if(typeof abrirAdicionais === "function"){
abrirAdicionais()
}else{
localStorage.setItem("pedidoAtual", JSON.stringify(window.pedidoAtual))
window.location.href = "confirmacao.html"
}

}



// ================================
// 🔙 VOLTAR
// ================================

function voltarIndex(){
window.location.href = "../index.html"
}



// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",()=>{

const lista = document.getElementById("lista-pizzas")

if(lista){
lista.innerHTML = `
<div class="pizza-loading"></div>
<div class="pizza-loading"></div>
<div class="pizza-loading"></div>
`
}

setTimeout(()=>{

if(typeof renderPizzas === "function"){
renderPizzas(4)
}

},300)



// botão ver mais
const btn = document.getElementById("mostrarCardapio")

if(btn){

btn.dataset.aberto = "false"

btn.onclick = ()=>{

const aberto = btn.dataset.aberto === "true"

if(aberto){
renderPizzas(4)
btn.innerText = "Ver cardápio completo"
btn.dataset.aberto = "false"
}else{
renderPizzas(pizzas.length)
btn.innerText = "Fechar cardápio"
btn.dataset.aberto = "true"
}

}

}



// busca
const inputBusca = document.getElementById("buscaPizza")

if(inputBusca){
inputBusca.addEventListener("input",(e)=>{
filtrarPizza(e.target.value)
})
}

})



// ================================
// GLOBAL
// ================================

window.selecionarPizzaLocal = selecionarPizzaLocal
window.filtrarPizza = filtrarPizza
window.cancelar = cancelar
window.proximo = proximo
window.voltarIndex = voltarIndex