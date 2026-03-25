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
// 🔥 FONTE ÚNICA DE DADOS
// ================================

let pedido = JSON.parse(localStorage.getItem("pedidoAtual")) || {itens:[]}

// ================================
// 
// ================================
function getPedido(){
return JSON.parse(localStorage.getItem("pedidoAtual")) || {itens:[]}
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
const pedidoAtual = getPedido()
let itens = pedidoAtual.itens || [pedidoAtual]

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

if(lista && pedidoAtual.itens){

lista.innerHTML = ""

let totalCarrinho = 0

pedidoAtual.itens.forEach(item => {

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

const pedido = JSON.parse(localStorage.getItem("pedidoAtual")) || {itens:[]}

// 🔥 salva quantidade anterior
localStorage.setItem("qtdAntes", pedido.itens.length)

window.location.href = "../index.html"

}


// ================================
// CANCELAR
// ================================

function cancelarPedido(){

if(!confirm("Cancelar pedido?")) return

localStorage.removeItem("pedidoAtual")

window.location.href = "../index.html"

}

// ================================
// 🛠 MODAL EDITAR PEDIDOS
// ================================

function abrirModalEditar(){

const modal = document.getElementById("modalEditar")
if(!modal) return

modal.classList.add("ativo")

renderEditar()

}


// ================================
// 🔥 RENDER LISTA EDITAR
// ================================

function renderEditar(){

const lista = document.getElementById("listaEditar")
const totalEl = document.getElementById("totalEditar")

if(!lista) return

lista.innerHTML = ""

// 🔥 pega dados corretos
const pedido = JSON.parse(localStorage.getItem("pedidoAtual")) || {itens:[]}
const itens = pedido.itens || []

let total = 0

itens.forEach((item,i)=>{

const subtotal = item.preco * (item.qtd || 1)
total += subtotal

const div = document.createElement("div")
div.className = "item-editar"

div.innerHTML = `
<div>
<strong>${item.nome}</strong><br>
<small>${item.ingredientes || ""}</small>
</div>

<div class="qtd-box">
<button onclick="diminuirEditar(${i})">−</button>
<span>${item.qtd || 1}</span>
<button onclick="aumentarEditar(${i})">+</button>
</div>
`

lista.appendChild(div)

})

// total
if(totalEl){
totalEl.innerText = "Total: " + formatarMoeda(total)
}

}


// ================================
// ➕ AUMENTAR
// ================================

function aumentarEditar(i){

let pedido = JSON.parse(localStorage.getItem("pedidoAtual"))

pedido.itens[i].qtd = (pedido.itens[i].qtd || 1) + 1

localStorage.setItem("pedidoAtual", JSON.stringify(pedido))

renderEditar()
render()
renderConfirmacao?.()

}


// ================================
// ➖ DIMINUIR
// ================================

function diminuirEditar(i){

let pedido = JSON.parse(localStorage.getItem("pedidoAtual"))

if(pedido.itens[i].qtd > 1){
pedido.itens[i].qtd--
}else{
pedido.itens.splice(i,1)
}

localStorage.setItem("pedidoAtual", JSON.stringify(pedido))

renderEditar()
render()
renderConfirmacao?.()

}


// ================================
// ❌ FECHAR MODAL
// ================================

function fecharModalEditar(){

const modal = document.getElementById("modalEditar")
if(!modal) return

modal.classList.remove("ativo")

// 🔥 ESSA LINHA É A CHAVE
renderConfirmacao()

}


// ================================
// 🔥 RENDER CONFIRMAÇÃO (OFICIAL)
// ================================

function renderConfirmacao(){

const pedido = JSON.parse(localStorage.getItem("pedidoAtual")) || {itens:[]}
const itens = pedido.itens || []

const lista = document.getElementById("listaConfirmacao")
const totalEl = document.getElementById("totalConfirmacao")

if(!lista) return

lista.innerHTML = ""

let total = 0

itens.forEach((item, i) => {

const qtd = item.qtd || 1
const subtotal = item.preco * qtd

total += subtotal

lista.innerHTML += `
<div class="item-confirmacao">

<strong>${item.nome}</strong><br>

<small>${item.ingredientes || ""}</small><br>

Qtd: ${qtd}<br>

<span>${formatarMoeda(subtotal)}</span>

<br>

<!-- 🔥 BOTÃO OBS -->
<button onclick="toggleObs(${i})" class="btn-obs">
${item.observacao ? "✏️ Editar observação" : "📝 Observação"}
</button>

<!-- 🔥 CAMPO OBS -->
<div id="obsBox-${i}" class="obs-box" style="display:${item.observacao ? 'block' : 'none'};">

<textarea
placeholder="Ex: sem cebola, bem passado..."
oninput="salvarObs(${i}, this.value)"
>${item.observacao || ""}</textarea>

</div>

</div>
`

})

// total geral
if(totalEl){
totalEl.innerText = "Total: " + formatarMoeda(total)
}

}


// ================================
// CONFIRMAR
// ================================

function confirmar(){

let pedido = JSON.parse(localStorage.getItem("pedidoAtual")) || {itens:[]}

// 🔥 já tem observações por item, não precisa mais global
localStorage.setItem("pedidoAtual", JSON.stringify(pedido))

window.location.href = "pedido.html"

}


// ================================
// 🔥 EFEITO "ATUALIZANDO PEDIDO"
// ================================

document.addEventListener("DOMContentLoaded", ()=>{

render()
renderConfirmacao()

const pedido = JSON.parse(localStorage.getItem("pedidoAtual")) || {itens:[]}
const qtdAntes = Number(localStorage.getItem("qtdAntes") || 0)

// 🔥 se aumentou itens → mostrar toast
if(pedido.itens.length > qtdAntes){

localStorage.removeItem("qtdAntes")

const toast = document.getElementById("toastAtualizando")

if(toast){

// 🔥 mensagens dinâmicas
if(textoToast){

const novasQtd = pedido.itens.length - qtdAntes

if(novasQtd === 1){
textoToast.innerText = "✨ Novo item adicionado ao pedido!"
}else{
textoToast.innerText = `🔥 ${novasQtd} itens adicionados ao pedido!`
}

}

toast.classList.add("ativo")

const lista = document.getElementById("listaConfirmacao")
if(lista) lista.style.opacity = "0"

setTimeout(()=>{

render()
renderConfirmacao()

if(lista) lista.style.opacity = "1"

toast.classList.remove("ativo")

},2500)

}
}

})

// ================================
// 📝 ABRIR / FECHAR OBS
// ================================

function toggleObs(i){

const box = document.getElementById(`obsBox-${i}`)
if(!box) return

box.style.display = box.style.display === "none" ? "block" : "none"

}


// ================================
// 💾 SALVAR OBSERVAÇÃO
// ================================

function salvarObs(i, valor){

let pedido = JSON.parse(localStorage.getItem("pedidoAtual")) || {itens:[]}

if(!pedido.itens[i]) return

pedido.itens[i].observacao = valor

localStorage.setItem("pedidoAtual", JSON.stringify(pedido))

}


// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded", ()=>{
render()
renderConfirmacao()
})