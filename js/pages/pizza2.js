// ================================
// ESTADO FINAL
// ================================

let pizzasSelecionadas = [
{ sabores: [], tamanho: null }
]

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
// PEGAR PIZZA ATUAL
// ================================

function getPizzaAtual(){
return pizzasSelecionadas[pizzasSelecionadas.length - 1]
}

// ================================
// SELEÇÃO FINAL
// ================================

function selecionarPizzaLocal(tipo, botao, nome, tamanho, preco, ingredientes){

let pizzaAtual = getPizzaAtual()

const pizza = {
nome,
tamanho,
preco,
ingredientes,
tipo,
key: `${nome}_${tamanho}_${tipo}`
}

// TOGGLE
const index = pizzaAtual.sabores.findIndex(p => p.key === pizza.key)

if(index !== -1){
pizzaAtual.sabores.splice(index,1)

if(pizzaAtual.sabores.length === 0){
pizzaAtual.tamanho = null
}

renderVisual()
atualizarResumo()
return
}

// NOVA PIZZA
if(pizzaAtual.sabores.length === 2){

const confirmar = confirm("👉 Deseja adicionar outra pizza?")
if(!confirmar) return

pizzasSelecionadas.push({
sabores: [],
tamanho: null
})

pizzaAtual = getPizzaAtual()
}

// VALIDA TAMANHO
if(!pizzaAtual.tamanho){
pizzaAtual.tamanho = tamanho
}else if(pizzaAtual.tamanho !== tamanho){
alert("❌ Essa pizza deve ter o mesmo tamanho")
return
}

// ADICIONA
pizzaAtual.sabores.push(pizza)

renderVisual()
atualizarResumo()
}

// ================================
// RENDER VISUAL
// ================================

function renderVisual(){

["lista-pizzas-1","lista-pizzas-2"].forEach(id=>{

const lista = document.getElementById(id)
if(!lista) return

lista.querySelectorAll(".pizza-card").forEach(c=>{
c.classList.remove("pizza-selecionada")
})

lista.querySelectorAll(".tamanhos button").forEach(b=>{
b.classList.remove("ativo")
})

})

// reaplica
pizzasSelecionadas.forEach(pizza=>{
pizza.sabores.forEach(p=>{

const lista = document.getElementById(
p.tipo === 1 ? "lista-pizzas-1" : "lista-pizzas-2"
)

if(!lista) return

lista.querySelectorAll(".pizza-card").forEach(card=>{

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
})

}

// ================================
// RESUMO
// ================================

function atualizarResumo(){

const texto = document.getElementById("resumoTexto")
const btn = document.getElementById("btnProximo")

if(!texto || !btn) return

if(pizzasSelecionadas.length === 1 && pizzasSelecionadas[0].sabores.length === 0){
texto.innerText = "Selecione sua pizza"
btn.disabled = true
return
}

let completas = pizzasSelecionadas.every(p => p.sabores.length === 2)

if(!completas){
texto.innerText = "👉 Complete 2 sabores por pizza"
btn.disabled = true
return
}

let html = ""
let total = 0

pizzasSelecionadas.forEach((pizza,i)=>{

const preco = Math.max(...pizza.sabores.map(s=>s.preco))
total += preco

html += `
<strong>Pizza ${i+1}:</strong> 
${pizza.sabores.map(s=>s.nome).join(" + ")} (${pizza.tamanho})<br>
`

})

html += `<span style="color:#28a745;">${formatarMoeda(total)}</span>`

texto.innerHTML = html
btn.disabled = false
}

// ================================
// CANCELAR
// ================================

function cancelar(){
pizzasSelecionadas = [{ sabores: [], tamanho: null }]
renderVisual()
atualizarResumo()
}

// ================================
// PRÓXIMO (🔥 CORRIGIDO)
// ================================

function proximo(){

let completas = pizzasSelecionadas.every(p => p.sabores.length === 2)
if(!completas) return

let itens = []

pizzasSelecionadas.forEach(pizza=>{
itens.push({
nome: pizza.sabores.map(s=>s.nome).join(" / "),
tamanho: pizza.tamanho,
preco: Math.max(...pizza.sabores.map(s=>s.preco)),
ingredientes: pizza.sabores.map(s=>s.ingredientes).join(" / "),
adicionais: []
})
})

// 🔥 estrutura padrão do sistema
const pedido = { itens }

// 🔥 salva global + storage
window.pedidoAtual = pedido
localStorage.setItem("pedidoAtual", JSON.stringify(pedido))

// 🔥 DEBUG (pode remover depois)
console.log("Pedido criado:", pedido)

// 🔥 GARANTE QUE O SCRIPT DE ADICIONAIS EXISTE
setTimeout(()=>{

if(typeof abrirAdicionais === "function"){

// 🔥 força leitura correta no adicionais.js
window.pedidoAtual = JSON.parse(localStorage.getItem("pedidoAtual"))

abrirAdicionais()

}else{

console.warn("abrirAdicionais não encontrado → indo direto")
window.location.href = "confirmacao.html"

}

}, 100)

} // ✅ FECHAMENTO CORRETO

// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",()=>{

if(typeof renderPizzas === "function"){
renderPizzas(4,"lista-pizzas-1",1)
renderPizzas(4,"lista-pizzas-2",2)
}

})

// ================================
// GLOBAL
// ================================

window.selecionarPizzaLocal = selecionarPizzaLocal
window.cancelar = cancelar
window.proximo = proximo
window.voltarIndex = () => window.location.href="../index.html"