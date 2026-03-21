// ================================
// 🔥 CONTROLE GLOBAL
// ================================

let pedidoAtual = {
pizza:null,
bebida:null
}

let pedidoAnterior = {
pizza:null,
bebida:null
}



// ================================
// 🔥 STATUS PIZZARIA
// ================================

function verificarStatus(){

const status = document.getElementById("statusPizzaria")
if(!status) return

const hora = new Date().getHours()

const aberto = hora >= 17 && hora <= 23

if(aberto){
status.innerHTML = "🟢 Aberto agora"
status.style.background = "#d4edda"
status.style.color = "#155724"
}else{
status.innerHTML = "🔴 Fechado"
status.style.background = "#f8d7da"
status.style.color = "#721c24"
}

}



// ================================
// 🔥 FUNÇÃO GLOBAL (BEBIDA)
// ================================

function selecionarBebidaGlobal(bebida){

if(!bebida){

removerPedidoAnterior()

pedidoAtual.bebida = null
pedidoAnterior.bebida = null

return
}

pedidoAnterior.bebida = pedidoAtual.bebida
pedidoAtual.bebida = bebida

verificarEnvio()
}

window.selecionarBebidaGlobal = selecionarBebidaGlobal



// ================================
// 🔥 INIT GERAL (TUDO AQUI)
// ================================

document.addEventListener("DOMContentLoaded",()=>{

// 🔥 status pizzaria
verificarStatus()



// ================================
// MAIS PEDIDAS
// ================================

const lista = document.getElementById("lista-pizzas")

if(lista){

const pizzas = [
{nome:"Calabresa",img:"img/pizzas/imgPizzaMaisPedidas1.jpg",desc:"Molho, mussarela e calabresa",preco:30},
{nome:"Portuguesa",img:"img/pizzas/imgPizzaMaisPedidas2.jpg",desc:"Presunto, ovo e cebola",preco:35},
{nome:"4 Queijos",img:"img/pizzas/imgPizzaMaisPedidas3.jpg",desc:"Mix de queijos",preco:38}
]

lista.innerHTML=""

pizzas.forEach(pizza=>{

const card = document.createElement("article")
card.className="pizza-card"

card.innerHTML=`
<img src="${pizza.img}">
<h3>${pizza.nome}</h3>
<p class="ingredientes">${pizza.desc}</p>
<p class="preco">R$ ${pizza.preco}</p>
<button class="btn btn-warning">Selecionar</button>
`

const botao = card.querySelector("button")

botao.onclick = ()=>{

if(pedidoAtual.pizza && pedidoAtual.pizza.nome === pizza.nome){

removerPedidoAnterior()

pedidoAtual = {pizza:null,bebida:null}
pedidoAnterior = {pizza:null,bebida:null}

resetUI()
liberarSistema()

notificar("Pedido removido","warning")

return
}

pedidoAnterior.pizza = pedidoAtual.pizza
pedidoAtual.pizza = pizza

document.querySelectorAll("#lista-pizzas .pizza-card").forEach(c=>{
c.classList.remove("selecionado")
c.querySelector("button").innerText="Selecionar"
})

card.classList.add("selecionado")
botao.innerText="✔ Selecionado"

bloquearSistema()
verificarEnvio()

}

lista.appendChild(card)

})

}



// ================================
// 🔥 BOTÕES PIZZA (AGORA FUNCIONA)
// ================================

const btnPizza1 = document.getElementById("btnPizza1")
const btnPizza2 = document.getElementById("btnPizza2")

if(btnPizza1){
btnPizza1.onclick = ()=>{
console.log("clicou pizza 1")
window.location.href = "./html/pizza-1-sabor.html"
}
}

if(btnPizza2){
btnPizza2.onclick = ()=>{
console.log("clicou pizza 2")
window.location.href = "./html/pizza-2-sabores.html"
}
}

})



// ================================
// 🚀 ENVIO CONTROLADO
// ================================

function verificarEnvio(){

if(pedidoAtual.pizza && pedidoAtual.bebida){

removerPedidoAnterior()

adicionarCarrinho({
tipo:"pizza_simples",
nome:pedidoAtual.pizza.nome,
tamanho:"M",
preco:pedidoAtual.pizza.preco
})

adicionarCarrinho({
tipo:"bebida",
nome:pedidoAtual.bebida.nome,
preco:pedidoAtual.bebida.preco
})

pedidoAnterior = {
pizza:{...pedidoAtual.pizza},
bebida:{...pedidoAtual.bebida}
}

notificar("✅ Pedido atualizado no carrinho")

}

}



// ================================
// 🔥 REMOVE ANTERIOR
// ================================

function removerPedidoAnterior(){

if(pedidoAnterior.pizza){
carrinho = carrinho.filter(item =>
!(item.nome === pedidoAnterior.pizza.nome && item.tipo === "pizza_simples")
)
}

if(pedidoAnterior.bebida){
carrinho = carrinho.filter(item =>
!(item.nome === pedidoAnterior.bebida.nome && item.tipo === "bebida")
)
}

salvarCarrinho()
atualizarCarrinhoLista()

}



// ================================
// UI RESET
// ================================

function resetUI(){

document.querySelectorAll("#lista-pizzas .pizza-card").forEach(c=>{
c.classList.remove("selecionado")
c.querySelector("button").innerText="Selecionar"
})

document.querySelectorAll(".bebida-card").forEach(c=>{
c.classList.remove("selecionado")
})

document.querySelectorAll(".botao-bebida").forEach(btn=>{
btn.classList.remove("bebidaSelecionada")
btn.innerText="Selecionar"
})

}



// ================================
// BLOQUEIO
// ================================

function bloquearSistema(){

document.querySelectorAll(".combo-card button").forEach(btn=>{
btn.disabled = true
btn.style.opacity = "0.5"
})

document.querySelectorAll("#escolha button").forEach(btn=>{
btn.disabled = true
btn.style.opacity = "0.5"
})

notificar("⚠️ Apenas bebidas disponíveis agora","warning")

}

function liberarSistema(){

document.querySelectorAll(".combo-card button").forEach(btn=>{
btn.disabled = false
btn.style.opacity = "1"
})

document.querySelectorAll("#escolha button").forEach(btn=>{
btn.disabled = false
btn.style.opacity = "1"
})

}