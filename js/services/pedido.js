// =================================
// SISTEMA PROFISSIONAL DE PEDIDO
// =================================



let metadeSelecionada = {
pizza1:null,
pizza2:null,
tamanho:null,
preco1:0,
preco2:0
}



// ================================
// SANITIZAR
// ================================

function sanitizar(texto){
return String(texto)
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
}



// ================================
// METADE ATIVA
// ================================

function metadeAtiva(){
const check = document.getElementById("meiaPizza")
return check && check.checked
}



// ================================
// BORDA
// ================================

function bordaSelecionada(){
const select = document.getElementById("bordaPizza")
return select ? select.value : "nenhuma"
}

function valorBorda(){
const b = bordaSelecionada()
if(b==="cheddar") return 5
if(b==="catupiry") return 6
return 0
}

function textoBorda(){
const b = bordaSelecionada()
if(b==="cheddar") return "Cheddar"
if(b==="catupiry") return "Catupiry"
return "Sem borda"
}

function resetarBorda(){
const select = document.getElementById("bordaPizza")
if(select) select.value="nenhuma"
}



// ================================
// UI
// ================================

function limparSelecaoPizzas(){
document.querySelectorAll(".tamanhos button")
.forEach(btn=>btn.classList.remove("tamanhoSelecionado"))
}

function calcularPreco(preco){
return preco + valorBorda()
}



// ================================
// SELECIONAR PIZZA (🔥 CORRIGIDO)
// ================================

function selecionarPizza(botao,nome,tamanho,preco){

if(!botao || typeof preco !== "number") return

nome = sanitizar(nome)



// ================================
// METADE
// ================================

if(metadeAtiva()){

if(!metadeSelecionada.pizza1){

metadeSelecionada.pizza1 = nome
metadeSelecionada.tamanho = tamanho
metadeSelecionada.preco1 = preco

botao.classList.add("tamanhoSelecionado")

// ✔ MANTÉM aviso (não é duplicação)
if(typeof notificar==="function"){
notificar("Escolha a segunda metade","warning")
}

return
}



if(!metadeSelecionada.pizza2){

if(metadeSelecionada.tamanho !== tamanho){

if(typeof notificar==="function"){
notificar("Mesma tamanho obrigatório","danger")
}

return
}

metadeSelecionada.pizza2 = nome
metadeSelecionada.preco2 = preco

botao.classList.add("tamanhoSelecionado")

let precoFinal =
(metadeSelecionada.preco1 + metadeSelecionada.preco2) / 2

precoFinal = calcularPreco(precoFinal)

const item = {
tipo:"pizza",
nome:metadeSelecionada.pizza1,
nome2:metadeSelecionada.pizza2,
tamanho:tamanho,
borda:textoBorda(),
preco:precoFinal
}

if(typeof adicionarCarrinho === "function"){
adicionarCarrinho(item,botao)
}

// RESET
metadeSelecionada = {
pizza1:null,
pizza2:null,
tamanho:null,
preco1:0,
preco2:0
}

limparSelecaoPizzas()
resetarBorda()

return
}

}



// ================================
// NORMAL
// ================================

let precoFinal = calcularPreco(preco)

const item = {
tipo:"pizza",
nome:nome,
tamanho:tamanho,
borda:textoBorda(),
preco:precoFinal
}

if(typeof adicionarCarrinho === "function"){
adicionarCarrinho(item,botao)
}



// UI

limparSelecaoPizzas()

botao.classList.add("tamanhoSelecionado")

setTimeout(()=>{
botao.classList.remove("tamanhoSelecionado")
},600)

resetarBorda()

}



// ================================
// BEBIDA (🔥 CORRIGIDO)
// ================================

function selecionarBebida(botao,nome,preco){

if(typeof preco !== "number") return

document.querySelectorAll(".botao-bebida")
.forEach(btn=>btn.classList.remove("bebidaSelecionada"))

botao.classList.add("bebidaSelecionada")

const item = {
tipo:"bebida",
nome:sanitizar(nome),
preco:preco
}

if(typeof adicionarCarrinho === "function"){
adicionarCarrinho(item,botao)
}

}



// ================================
// FINALIZAR
// ================================

function irParaPedido(){

const carrinho =
JSON.parse(localStorage.getItem("carrinho")) || []

if(carrinho.length === 0){

if(typeof notificar==="function"){
notificar("Carrinho vazio","danger")
}

return 
}

localStorage.setItem("pedido", JSON.stringify(carrinho))
window.location.href = "pedido.html"

}



// ================================
// GLOBAL
// ================================

window.selecionarPizza = selecionarPizza
window.selecionarBebida = selecionarBebida
window.irParaPedido = irParaPedido