// ================================
// ESTADO
// ================================

let pedidoAtual = null



// ================================
// FORMATAR
// ================================

function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{
style:"currency",
currency:"BRL"
})
}



// ================================
// 🔍 BUSCA
// ================================

function filtrarPizza(valor){

valor = valor.toLowerCase()

// reset
if(valor.length === 0){
renderPizzas(4)
return
}

// mostra tudo
if(typeof renderPizzas === "function"){
renderPizzas(pizzas.length)
}

// filtra
document.querySelectorAll(".pizza-card").forEach(card=>{

const nome = card.dataset.nome || ""

if(nome.includes(valor)){
card.style.display="block"
}else{
card.style.display="none"
}

})

}



// ================================
// 🍕 SELEÇÃO LOCAL (CORRIGIDA)
// ================================

function selecionarPizzaLocal(botao,nome,tamanho,preco,ingredientes){

const card = botao.closest(".pizza-card")

// 🔁 toggle (desmarcar)
if(
pedidoAtual &&
pedidoAtual.nome === nome &&
pedidoAtual.tamanho === tamanho
){
pedidoAtual = null
limparUI()
atualizarResumo()
return
}

// 🔥 limpar anterior
limparUI()

// 🔥 animação
card.classList.add("animar")
setTimeout(()=>card.classList.remove("animar"),200)

// 🔥 marcar
card.classList.add("pizza-selecionada")
botao.classList.add("ativo")

// 🔥 AGORA SALVA COMPLETO (FIX PRINCIPAL)
pedidoAtual = { 
nome, 
tamanho, 
preco,
ingredientes
}

atualizarResumo()

// 🔥 scroll automático
const resumo = document.querySelector(".resumo-pedido")
if(resumo){
resumo.scrollIntoView({behavior:"smooth"})
}

// 🔥 sugestão inteligente
sugestao()

}



// ================================
// 💡 SUGESTÃO AUTOMÁTICA
// ================================

function sugestao(){

if(!pedidoAtual) return

const nome = pedidoAtual.nome.toLowerCase()

if(nome.includes("calabresa")){
notificar?.("💡 Combina com Coca-Cola!")
}

if(nome.includes("frango")){
notificar?.("💡 Que tal um Guaraná?")
}

}



// ================================
// 🔙 VOLTAR
// ================================

function voltarIndex(){
window.location.href = "../index.html"
}

window.voltarIndex = voltarIndex



// ================================
// LIMPAR UI
// ================================

function limparUI(){

document.querySelectorAll(".pizza-card")
.forEach(c=>{
c.classList.remove("pizza-selecionada")
})

document.querySelectorAll(".tamanhos button")
.forEach(b=>{
b.classList.remove("ativo")
})

}



// ================================
// RESUMO (AGORA COM INGREDIENTES)
// ================================

function atualizarResumo(){

const texto = document.getElementById("resumoTexto")
const btn = document.getElementById("btnProximo")

if(!pedidoAtual){
texto.innerText="Nenhuma pizza selecionada"
btn.disabled=true
return
}

texto.innerHTML = `
<strong>${pedidoAtual.nome}</strong><br>
<small style="color:#666;">${pedidoAtual.ingredientes}</small><br>
Tamanho: ${pedidoAtual.tamanho}<br>
<span style="color:#28a745;font-weight:600;">
${formatarMoeda(pedidoAtual.preco)}
</span>
`

btn.disabled=false
}



// ================================
// AÇÕES
// ================================

function cancelar(){
pedidoAtual = null
limparUI()
atualizarResumo()
}

function proximo(){
if(!pedidoAtual) return
window.pedidoAtual = pedidoAtual // 🔥 importante
abrirAdicionais()
}



// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",()=>{

// ================================
// 🔥 LOADING SKELETON
// ================================

const lista = document.getElementById("lista-pizzas")

if(lista){
lista.innerHTML = `
<div class="pizza-loading"></div>
<div class="pizza-loading"></div>
<div class="pizza-loading"></div>
`
}

// ================================
// 🔥 CARREGAR CARDÁPIO
// ================================

setTimeout(()=>{

if(typeof renderPizzas === "function"){
renderPizzas(4)
}

},300)



// ================================
// BOTÃO VER MAIS
// ================================

const btn = document.getElementById("mostrarCardapio")

if(btn){

btn.dataset.aberto = "false"

btn.onclick = ()=>{

const aberto = btn.dataset.aberto === "true"

if(aberto){
renderPizzas(4)
btn.innerText="Ver cardápio completo"
btn.dataset.aberto="false"
}else{
renderPizzas(pizzas.length)
btn.innerText="Fechar cardápio"
btn.dataset.aberto="true"
}

}

}



// ================================
// 🔥 BUSCA INPUT
// ================================

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