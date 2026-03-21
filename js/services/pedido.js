// =================================
// SISTEMA PROFISSIONAL DE PEDIDO
// =================================



// ================================
// CONTROLE METADE / METADE
// ================================

let metadeSelecionada = {
pizza1:null,
pizza2:null,
tamanho:null,
preco1:0,
preco2:0
}



// ================================
// SANITIZAR TEXTO
// ================================

function sanitizar(texto){

return String(texto)
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")

}



// ================================
// TOAST BOOTSTRAP
// ================================

function toast(msg,tipo="success"){

if(!window.bootstrap) return

let container = document.querySelector(".toast-container")

if(!container){

container = document.createElement("div")
container.className="toast-container position-fixed bottom-0 end-0 p-3"
document.body.appendChild(container)

}

const toast = document.createElement("div")

toast.className=`toast align-items-center text-bg-${tipo} border-0`

toast.innerHTML=`
<div class="d-flex">
<div class="toast-body">
${msg}
</div>
<button type="button"
class="btn-close btn-close-white me-2 m-auto"
data-bs-dismiss="toast"></button>
</div>
`

container.appendChild(toast)

const t = new bootstrap.Toast(toast)

t.show()

setTimeout(()=>toast.remove(),4000)

}



// ================================
// METADE ATIVA
// ================================

function metadeAtiva(){

const check = document.getElementById("meiaPizza")

return check && check.checked

}



// ================================
// BORDA SELECIONADA
// ================================

function bordaSelecionada(){

const select = document.getElementById("bordaPizza")

if(!select) return "nenhuma"

return select.value

}



// ================================
// VALOR DA BORDA
// ================================

function valorBorda(){

const borda = bordaSelecionada()

if(borda === "cheddar") return 5
if(borda === "catupiry") return 6

return 0

}



// ================================
// TEXTO BORDA
// ================================

function textoBorda(){

const borda = bordaSelecionada()

if(borda === "cheddar") return "Cheddar"
if(borda === "catupiry") return "Catupiry"

return "Sem borda"

}



// ================================
// RESETAR BORDA
// ================================

function resetarBorda(){

const select = document.getElementById("bordaPizza")

if(select){

select.value = "nenhuma"

}

}



// ================================
// LIMPAR SELEÇÃO VISUAL
// ================================

function limparSelecaoPizzas(){

document.querySelectorAll(".tamanhos button")
.forEach(btn=>btn.classList.remove("tamanhoSelecionado"))

}



// ================================
// CALCULAR PREÇO COM BORDA
// ================================

function calcularPreco(preco){

return preco + valorBorda()

}



// ================================
// SELECIONAR PIZZA
// ================================

function selecionarPizza(botao,nome,tamanho,preco){

if(!botao) return
if(typeof preco !== "number") return

nome = sanitizar(nome)



// ================================
// MODO METADE / METADE
// ================================

if(metadeAtiva()){


// PRIMEIRA METADE

if(!metadeSelecionada.pizza1){

metadeSelecionada.pizza1 = nome
metadeSelecionada.tamanho = tamanho
metadeSelecionada.preco1 = preco

botao.classList.add("tamanhoSelecionado")

toast("Escolha a segunda metade da pizza","warning")

return

}



// SEGUNDA METADE

if(!metadeSelecionada.pizza2){

if(metadeSelecionada.tamanho !== tamanho){

toast("As duas pizzas devem ter o mesmo tamanho","danger")
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

toast(`Pizza metade adicionada | Borda: ${textoBorda()} 🍕`)

}



// RESETAR CONTROLE

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
// PIZZA NORMAL
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

toast(`Pizza adicionada | Borda: ${textoBorda()} 🍕`)

}



// ANIMAÇÃO VISUAL

limparSelecaoPizzas()

botao.classList.add("tamanhoSelecionado")

setTimeout(()=>{

botao.classList.remove("tamanhoSelecionado")

},600)


// RESETAR BORDA

resetarBorda()

}



// ================================
// SELECIONAR BEBIDA
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

toast("Bebida adicionada 🥤")

}

}



// ================================
// ABRIR CARRINHO
// ================================

function abrirCarrinho(){

const painel = document.getElementById("painelPedido")

if(painel){

painel.classList.add("ativo")

}

}



// ================================
// FECHAR CARRINHO
// ================================

function fecharCarrinho(){

const painel = document.getElementById("painelPedido")

if(painel){

painel.classList.remove("ativo")

}

}



// ================================
// FINALIZAR PEDIDO
// ================================

function irParaPedido(){

const carrinho =
JSON.parse(localStorage.getItem("carrinho")) || []

if(carrinho.length === 0){

toast("Seu carrinho está vazio","danger")

return

}



localStorage.setItem("pedido", JSON.stringify(carrinho))

window.location.href = "pedido.html"

}



// ================================
// FUNÇÕES GLOBAIS
// ================================

window.selecionarPizza = selecionarPizza
window.selecionarBebida = selecionarBebida
window.abrirCarrinho = abrirCarrinho
window.fecharCarrinho = fecharCarrinho
window.irParaPedido = irParaPedido