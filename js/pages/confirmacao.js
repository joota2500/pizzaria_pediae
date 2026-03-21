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
// PEDIDO
// ================================

let pedido = JSON.parse(localStorage.getItem("pedidoAtual"))


// ================================
// RENDER
// ================================

function render(){

if(!pedido) return

document.getElementById("nomePizza").innerText = pedido.nome
document.getElementById("ingredientes").innerText = pedido.ingredientes
document.getElementById("tamanho").innerText = "Tamanho: " + pedido.tamanho

// imagem
const nomeImg = pedido.nome.replaceAll(" ","")
document.getElementById("imgPizza").src =
`../img/pizzas/imgPizza${nomeImg}.jpg`

// adicionais
const lista = document.getElementById("listaAdicionais")

if(!pedido.adicionais || pedido.adicionais.length === 0){
lista.innerHTML = "<li>Nenhum adicional</li>"
}else{
lista.innerHTML = pedido.adicionais.map(a=>`
<li>
<span>${a.nome}</span>
<span>+ ${formatarMoeda(a.preco)}</span>
</li>
`).join("")
}

// total
const total = pedido.precoFinal || pedido.preco
document.getElementById("totalPedido").innerText = formatarMoeda(total)

}



// ================================
// AÇÕES
// ================================

function voltar(){
window.history.back()
}

function adicionarMais(){
window.location.href = "../index.html"
}

function cancelarPedido(){

if(!confirm("Cancelar pedido?")) return

localStorage.removeItem("pedidoAtual")

window.location.href = "../index.html"

}

function confirmar(){

const obs = document.getElementById("observacao").value

pedido.observacao = obs

localStorage.setItem("pedidoAtual", JSON.stringify(pedido))

window.location.href = "pedido.html"

}



// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",render)