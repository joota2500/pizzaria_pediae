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
// 🔥 FUNÇÃO GLOBAL (BEBIDA CHAMA)
// ================================

function selecionarBebidaGlobal(bebida){

// 🔁 DESMARCAR
if(!bebida){

removerPedidoAnterior()

pedidoAtual.bebida = null
pedidoAnterior.bebida = null

return
}

// 🔥 TROCA DE BEBIDA
pedidoAnterior.bebida = pedidoAtual.bebida
pedidoAtual.bebida = bebida

verificarEnvio()
}

window.selecionarBebidaGlobal = selecionarBebidaGlobal



// ================================
// MAIS PEDIDAS
// ================================

document.addEventListener("DOMContentLoaded",()=>{

const lista = document.getElementById("lista-pizzas")
if(!lista) return

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

// 🔁 REMOVER TUDO
if(pedidoAtual.pizza && pedidoAtual.pizza.nome === pizza.nome){

removerPedidoAnterior()

pedidoAtual = {pizza:null,bebida:null}
pedidoAnterior = {pizza:null,bebida:null}

resetUI()
liberarSistema()

notificar("Pedido removido","warning")

return
}


// 🔥 TROCA DE PIZZA
pedidoAnterior.pizza = pedidoAtual.pizza
pedidoAtual.pizza = pizza


// limpar UI pizzas
document.querySelectorAll("#lista-pizzas .pizza-card").forEach(c=>{
c.classList.remove("selecionado")
c.querySelector("button").innerText="Selecionar"
})

// selecionar atual
card.classList.add("selecionado")
botao.innerText="✔ Selecionado"

bloquearSistema()

verificarEnvio()

}

lista.appendChild(card)

})

})



// ================================
// 🚀 ENVIO CONTROLADO
// ================================

function verificarEnvio(){

if(pedidoAtual.pizza && pedidoAtual.bebida){

// 🔥 remove anterior corretamente
removerPedidoAnterior()

// adiciona novo
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

// salva como anterior
pedidoAnterior = {
pizza:{...pedidoAtual.pizza},
bebida:{...pedidoAtual.bebida}
}

notificar("✅ Pedido atualizado no carrinho")

}

}



// ================================
// 🔥 REMOVE ANTERIOR (FIX REAL)
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