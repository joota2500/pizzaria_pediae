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
// SELEÇÃO LOCAL
// ================================

function selecionarPizzaLocal(botao,nome,tamanho,preco){

const card = botao.closest(".pizza-card")

// 🔥 SE CLICOU NA MESMA → DESMARCA
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

// 🔥 LIMPA ANTES DE MARCAR
limparUI()

// 🔥 MARCA CARD E BOTÃO
card.classList.add("pizza-selecionada")
botao.classList.add("ativo")

// 🔥 SALVA ESTADO
pedidoAtual = {
nome,
tamanho,
preco
}

// 🔥 ATUALIZA UI
atualizarResumo()

}

// ================================
// VOLTAR
// ================================

function voltarIndex(){
window.location.href = "index.html"
}

window.voltarIndex = voltarIndex

// ================================
// LIMPAR UI
// ================================

function limparUI(){

document.querySelectorAll(".pizza-card")
.forEach(c=>c.classList.remove("pizza-selecionada"))

document.querySelectorAll(".tamanhos button")
.forEach(b=>b.classList.remove("ativo"))

}

// ================================
// RESUMO
// ================================

function atualizarResumo(){

const texto = document.getElementById("resumoTexto")
const btn = document.getElementById("btnProximo")

if(!pedidoAtual){
texto.innerText="Nenhuma pizza selecionada"
btn.disabled=true
return
}

texto.innerText =
`${pedidoAtual.nome} (${pedidoAtual.tamanho}) - ${formatarMoeda(pedidoAtual.preco)}`

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

localStorage.setItem("pedidoAtual", JSON.stringify(pedidoAtual))

window.location.href = "confirmacao-item.html"

}

// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",()=>{

// 🔥 IMPORTANTE: usa id correto
if(typeof renderPizzas === "function"){

// 🔥 garante que render usa o container certo
const lista = document.getElementById("lista-pizzas")
if(lista){
window.lista = lista
renderPizzas(4)
}

}

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

})
window.selecionarPizzaLocal = selecionarPizzaLocal