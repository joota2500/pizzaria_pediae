// ================================
// FORMATAR
// ================================

function formatarMoeda(valor){
return Number(valor || 0).toLocaleString("pt-BR",{
style:"currency",
currency:"BRL"
})
}


// ================================
// ESTRUTURA V3
// ================================

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []
let pedidoAtualId = localStorage.getItem("pedidoAtualId")

let pedido = pedidos.find(p => p.id == pedidoAtualId)

// fallback (carrinho)
if(!pedido){
pedido = JSON.parse(localStorage.getItem("pedidoAtual"))
}


// ================================
// GERAR IMAGEM SEGURA 🔥
// ================================

function gerarImagem(nome){

if(!nome) return "../img/pizzas/imgPizzaPadrao.jpg"

if(nome.includes("/")){
nome = nome.split("/")[0]
}

nome = nome.trim()

const nomeImg = nome
.replaceAll(" ","")
.replaceAll("ç","c")
.replaceAll("ã","a")
.replaceAll("á","a")
.replaceAll("é","e")
.replaceAll("í","i")
.replaceAll("ó","o")
.replaceAll("ú","u")

return `../img/pizzas/imgPizza${nomeImg}.jpg`
}


// ================================
// RENDER
// ================================

function render(){

if(!pedido){
alert("Pedido não encontrado")
window.location.href = "../index.html"
return
}

// 🔥 suporte carrinho OU sistema antigo
let itens = pedido.itens || [pedido]

// remove render antigo
const antigo = document.getElementById("outrosItens")
if(antigo) antigo.remove()

// ================================
// ITEM PRINCIPAL
// ================================

const item = itens[0]

document.getElementById("nomePizza").innerText = item.nome || "-"
document.getElementById("ingredientes").innerText = item.ingredientes || ""
document.getElementById("tamanho").innerText = "Tamanho: " + (item.tamanho || "-")

if(item.img){
document.getElementById("imgPizza").src = "../" + item.img
}else{
document.getElementById("imgPizza").src = gerarImagem(item.nome)
}


// ================================
// ADICIONAIS
// ================================

const listaAdicionais = document.getElementById("listaAdicionais")

if(!item.adicionais || item.adicionais.length === 0){
listaAdicionais.innerHTML = "<li>Nenhum adicional</li>"
}else{
listaAdicionais.innerHTML = item.adicionais.map(a=>`
<li>
<span>${a.nome}</span>
<span>+ ${formatarMoeda(a.preco)}</span>
</li>
`).join("")
}


// ================================
// OUTROS ITENS (MULTI)
// ================================

if(itens.length > 1){

const container = document.createElement("div")
container.id = "outrosItens"
container.className = "lista-itens"

container.innerHTML = "<h4>Outros itens</h4>"

itens.slice(1).forEach(item=>{

const div = document.createElement("div")
div.className = "item-pedido"

div.innerHTML = `
<div class="item-info">
<h4>${item.nome} ${item.tamanho ? "(" + item.tamanho + ")" : ""}</h4>

<small>${item.ingredientes || ""}</small>

${
item.adicionais?.length
? `<div class="item-adicionais">
+ ${item.adicionais.map(a=>a.nome).join(", ")}
</div>`
: ""
}

<div class="item-preco">
${formatarMoeda(item.precoFinal || item.preco)}
</div>
</div>
`

container.appendChild(div)

})

document.querySelector(".container-confirmacao")
.appendChild(container)

}


// ================================
// 🔥 NOVO BLOCO: ITENS DO CARRINHO
// ================================

const lista = document.getElementById("listaConfirmacao")
const totalEl = document.getElementById("totalConfirmacao")

if(lista && pedido.itens){

lista.innerHTML = ""

let totalCarrinho = 0

pedido.itens.forEach(item => {

const qtd = item.qtd || 1
const subtotal = (item.preco || 0) * qtd

totalCarrinho += subtotal

const div = document.createElement("div")
div.className = "item-confirmacao"

div.innerHTML = `
<strong>${item.nome}</strong><br>

<small style="color:#666;">
${item.ingredientes || ""}
</small><br>

Qtd: ${qtd}<br>

<span style="color:#28a745;">
${formatarMoeda(subtotal)}
</span>
`

lista.appendChild(div)

})

if(totalEl){
totalEl.innerText = "Total: " + formatarMoeda(totalCarrinho)
}

}


// ================================
// STATUS
// ================================

if(pedido.status){

let statusEl = document.getElementById("statusPedido")

if(!statusEl){
statusEl = document.createElement("div")
statusEl.id = "statusPedido"
statusEl.className = "status-pedido"

document.querySelector(".container-confirmacao")
.prepend(statusEl)
}

statusEl.className = "status-pedido status-" + pedido.status

statusEl.innerText =
pedido.status === "confirmado" ? "🟢 Pedido confirmado" :
pedido.status === "cancelado" ? "🔴 Pedido cancelado" :
"🟡 Em edição"

}


// ================================
// TOTAL FINAL (GERAL)
// ================================

let totalFinal = 0

itens.forEach(i=>{
const qtd = i.qtd || 1
totalFinal += (i.precoFinal || i.preco || 0) * qtd
})

document.getElementById("totalPedido").innerText =
formatarMoeda(totalFinal)

}


// ================================
// AÇÕES
// ================================

function voltar(){

if(pedido?.tipo === "pizza_2sabores"){
window.location.href = "../html/pizza-2-sabores.html"
}else{
window.location.href = "../html/pizza-1-sabor.html"
}

}

function adicionarMais(){
window.location.href = "../index.html"
}


// ================================
// CANCELAR
// ================================

function cancelarPedido(){

if(!confirm("Cancelar pedido?")) return

if(pedidoAtualId){

pedidos = pedidos.map(p=>{
if(p.id == pedidoAtualId){
p.status = "cancelado"
}
return p
})

localStorage.setItem("pedidos", JSON.stringify(pedidos))
localStorage.removeItem("pedidoAtualId")

}else{
localStorage.removeItem("pedidoAtual")
}

window.location.href = "../index.html"

}


// ================================
// CONFIRMAR
// ================================

function confirmar(){

const obs = document.getElementById("observacao").value

if(pedidoAtualId){

pedidos = pedidos.map(p=>{
if(p.id == pedidoAtualId){
p.observacao = obs
p.status = "confirmado"
}
return p
})

localStorage.setItem("pedidos", JSON.stringify(pedidos))

}else{

pedido.observacao = obs
localStorage.setItem("pedidoAtual", JSON.stringify(pedido))

}

window.location.href = "pedido.html"

}


// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",render)