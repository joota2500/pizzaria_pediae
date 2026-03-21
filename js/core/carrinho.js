// ================================
// SISTEMA DE CARRINHO PROFISSIONAL
// ================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

const LIMITE_ITENS = 30
const EXPIRACAO_CARRINHO = 1000 * 60 * 60 * 1



// ================================
// SANITIZAR
// ================================

function sanitizar(texto){
return String(texto)
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
}



// ================================
// MOEDA
// ================================

function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{
style:"currency",
currency:"BRL"
})
}



// ================================
// SALVAR
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

if(Date.now() - hora > EXPIRACAO_CARRINHO){
localStorage.removeItem("carrinho")
carrinho = []
atualizarCarrinhoLista()
notificar("⏳ Carrinho expirado","warning")
}

}



// ================================
// TOAST (🔥 CORRIGIDO)
// ================================

function notificar(msg,tipo="success"){

if(!window.bootstrap) return

const toast = document.createElement("div")

toast.className =
`toast align-items-center text-bg-${tipo} border-0 position-fixed top-0 end-0 m-3`

toast.style.zIndex = "99999"

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
// ABRIR / FECHAR
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



// ================================
// ANIMAÇÃO PRODUTO → CARRINHO
// ================================

function animarProdutoCarrinho(botao){

const carrinhoIcon = document.querySelector(".carrinho-flutuante")
if(!carrinhoIcon) return

const rectBtn = botao.getBoundingClientRect()
const rectCarrinho = carrinhoIcon.getBoundingClientRect()

const bola = document.createElement("div")

bola.style.position="fixed"
bola.style.left = rectBtn.left + "px"
bola.style.top = rectBtn.top + "px"
bola.style.width="14px"
bola.style.height="14px"
bola.style.background="#ff6b00"
bola.style.borderRadius="50%"
bola.style.zIndex="99999"
bola.style.transition="all 0.6s ease"

document.body.appendChild(bola)

setTimeout(()=>{
bola.style.left = rectCarrinho.left + "px"
bola.style.top = rectCarrinho.top + "px"
bola.style.opacity="0.3"
bola.style.transform="scale(0.5)"
},50)

setTimeout(()=>{
bola.remove()
if(window.animarCarrinho){
animarCarrinho()
}
},650)

}



// ================================
// ADICIONAR
// ================================

function adicionarCarrinho(item,botao){

if(!item || typeof item.preco !== "number") return

if(carrinho.length >= LIMITE_ITENS){
notificar("Limite de itens atingido","danger")
return
}

if(botao){
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
// CONTROLES
// ================================

function removerCarrinho(i){
carrinho.splice(i,1)
salvarCarrinho()
atualizarCarrinhoLista()
}

function aumentarQtd(i){
carrinho[i].qtd++
salvarCarrinho()
atualizarCarrinhoLista()
}

function diminuirQtd(i){
if(carrinho[i].qtd > 1){
carrinho[i].qtd--
}else{
carrinho.splice(i,1)
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
// RENDER
// ================================

function atualizarCarrinhoLista(){

const lista=document.getElementById("listaCarrinho")
const contador=document.getElementById("contadorCarrinho")
const totalElemento=document.getElementById("totalCarrinho")

if(!lista) return

lista.innerHTML=""

let total=0
let qtdTotal=0

carrinho.forEach((item,i)=>{

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
<button onclick="diminuirQtd(${i})">−</button>
<span>${item.qtd}</span>
<button onclick="aumentarQtd(${i})">+</button>
</div>

<div class="subtotal">${formatarMoeda(subtotal)}</div>

<button class="remover" onclick="removerCarrinho(${i})">✕</button>
`

lista.appendChild(div)

})

if(contador) contador.innerText=qtdTotal
if(totalElemento) totalElemento.innerText="Total: "+formatarMoeda(total)

// 🔥 AÇÕES FIXAS
if(carrinho.length > 0){

const acoes = document.createElement("div")
acoes.className="acoes-carrinho"

acoes.innerHTML=`
<button class="botao-limpar-carrinho" onclick="limparCarrinho()">
🗑 Limpar carrinho
</button>

<button class="botao-enviar" onclick="irParaPedido()">
Finalizar pedido
</button>
`

lista.appendChild(acoes)

}

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