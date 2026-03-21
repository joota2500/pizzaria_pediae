// ================================
// SISTEMA DE CARRINHO PROFISSIONAL
// ================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

const LIMITE_ITENS = 30
const EXPIRACAO_CARRINHO = 1000 * 60 * 60 * 1 // 1 hora



// ================================
// SANITIZAR TEXTO
// ================================

function sanitizar(texto){
return String(texto)
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;") 
}



// ================================
// FORMATAR MOEDA
// ================================

function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{
style:"currency",
currency:"BRL"
})
}



// ================================
// SALVAR CARRINHO
// ================================

function salvarCarrinho(){
localStorage.setItem("carrinho", JSON.stringify(carrinho))
localStorage.setItem("carrinhoHora", Date.now())
}



// ================================
// EXPIRAÇÃO
// ================================

function verificarExpiracao(){

const hora = localStorage.getItem("carrinhoHora")
if(!hora) return

const agora = Date.now()

if(agora - hora > EXPIRACAO_CARRINHO){

localStorage.removeItem("carrinho")
carrinho = []

atualizarCarrinhoLista()

notificar("⏳ Carrinho expirado após 1 hora","warning")
}

}



// ================================
// TOAST
// ================================

function notificar(msg,tipo="success"){

if(!window.bootstrap) return

const toast = document.createElement("div")

toast.className =
`toast align-items-center text-bg-${tipo} border-0 position-fixed bottom-0 end-0 m-3`

toast.innerHTML = `
<div class="d-flex">
<div class="toast-body">${msg}</div>
<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
</div>
`

document.body.appendChild(toast)

const t = new bootstrap.Toast(toast)
t.show()

setTimeout(()=>toast.remove(),4000)

}



// ================================
// ABRIR / FECHAR CARRINHO 🔥
// ================================

function abrirCarrinho(){

const painel = document.getElementById("painelPedido")
if(!painel) return

painel.classList.add("ativo")
document.body.style.overflow="hidden"

}

function fecharCarrinho(){

const painel = document.getElementById("painelPedido")
if(!painel) return

painel.classList.remove("ativo")
document.body.style.overflow="auto"

}


// fechar clicando fora (UX PRO)
document.addEventListener("click",(e)=>{

const painel = document.getElementById("painelPedido")
const botao = document.getElementById("iconeCarrinho")

if(!painel || !botao) return

if(
painel.classList.contains("ativo") &&
!painel.contains(e.target) &&
!botao.contains(e.target)
){
fecharCarrinho()
}

})



// ================================
// ADICIONAR ITEM
// ================================

function adicionarCarrinho(item,botao){

if(!item || typeof item.preco !== "number") return

if(carrinho.length >= LIMITE_ITENS){
notificar("Limite de itens atingido","danger")
return
}

if(botao && typeof animarProdutoCarrinho === "function"){
animarProdutoCarrinho(botao)
}

const novoItem = {
tipo:item.tipo || "pizza",
nome:sanitizar(item.nome || ""),
nome2:sanitizar(item.nome2 || ""),
tamanho:item.tamanho || "",
borda:item.borda || "nenhuma",
preco:item.preco,
qtd:1
}

const existente = carrinho.find(p=>
p.nome===novoItem.nome &&
p.nome2===novoItem.nome2 &&
p.tamanho===novoItem.tamanho &&
p.borda===novoItem.borda
)

if(existente){
existente.qtd++
}else{
carrinho.push(novoItem)
}

salvarCarrinho()
atualizarCarrinhoLista()

notificar(`✔ ${novoItem.nome} adicionada`)

abrirCarrinho()
}



// ================================
// REMOVER / QTD
// ================================

function removerCarrinho(index){
carrinho.splice(index,1)
salvarCarrinho()
atualizarCarrinhoLista()
}

function aumentarQtd(index){
carrinho[index].qtd++
salvarCarrinho()
atualizarCarrinhoLista()
}

function diminuirQtd(index){
if(carrinho[index].qtd > 1){
carrinho[index].qtd--
}else{
carrinho.splice(index,1)
}
salvarCarrinho()
atualizarCarrinhoLista()
}



// ================================
// LIMPAR
// ================================

function limparCarrinho(){

if(!confirm("Deseja limpar o carrinho?")) return

carrinho=[]
salvarCarrinho()
atualizarCarrinhoLista()

}



// ================================
// ATUALIZAR LISTA
// ================================

function atualizarCarrinhoLista(){

const lista=document.getElementById("listaCarrinho")
const contador=document.getElementById("contadorCarrinho")
const totalElemento=document.getElementById("totalCarrinho")

if(!lista) return

lista.innerHTML=""

let total=0
let qtdTotal=0

carrinho.forEach((item,index)=>{

const subtotal=item.preco*item.qtd
total+=subtotal
qtdTotal+=item.qtd

const div=document.createElement("div")
div.className="item-carrinho"

div.innerHTML=`
<div class="info">
<strong>${item.nome}${item.nome2 ? " / "+item.nome2 : ""}</strong>
<small>${item.tamanho}</small>
<span>${formatarMoeda(item.preco)}</span>
</div>

<div class="controles">
<button onclick="diminuirQtd(${index})">−</button>
<span>${item.qtd}</span>
<button onclick="aumentarQtd(${index})">+</button>
</div>

<div class="subtotal">${formatarMoeda(subtotal)}</div>

<button onclick="removerCarrinho(${index})">❌</button>
`

lista.appendChild(div)

})

if(contador) contador.innerText=qtdTotal
if(totalElemento) totalElemento.innerText="Total: "+formatarMoeda(total)

}



// ================================
// FINALIZAR
// ================================

function irParaPedido(){

if(carrinho.length===0){
notificar("Carrinho vazio","danger")
return
}

localStorage.setItem("pedido",JSON.stringify(carrinho))
window.location.href="pedido.html"

}



// ================================
// INIT 
// ================================

document.addEventListener("DOMContentLoaded",()=>{
verificarExpiracao()
atualizarCarrinhoLista()
})



// ================================
// GLOBAL
// ================================

window.adicionarCarrinho=adicionarCarrinho
window.abrirCarrinho=abrirCarrinho
window.fecharCarrinho=fecharCarrinho
window.irParaPedido=irParaPedido
window.limparCarrinho=limparCarrinho