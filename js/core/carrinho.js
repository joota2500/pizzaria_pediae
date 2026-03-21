// ================================
// SISTEMA DE CARRINHO PROFISSIONAL (ATUALIZADO)
// ================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

const LIMITE_ITENS = 30
const EXPIRACAO_CARRINHO = 1000 * 60 * 60 * 1



// ================================
// 🔥 VERIFICAÇÕES
// ================================

function temPizzaSimples(){
return carrinho.some(item => item.tipo === "pizza_simples")
}

function temComboOuCustom(){
return carrinho.some(item =>
item.tipo === "combo" || item.tipo === "pizza_custom"
)
}

function removerPorTipo(tipo){
carrinho = carrinho.filter(item => item.tipo !== tipo)
salvarCarrinho()
atualizarCarrinhoLista()
}



// ================================
// UTIL
// ================================

function sanitizar(texto){
return String(texto).replace(/</g,"&lt;").replace(/>/g,"&gt;")
}

function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})
}



// ================================
// STORAGE
// ================================

function salvarCarrinho(){
localStorage.setItem("carrinho", JSON.stringify(carrinho))
localStorage.setItem("carrinhoHora", Date.now())
}

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
// TOAST
// ================================

function notificar(msg,tipo="success"){

document.querySelectorAll(".toast").forEach(t=>t.remove())

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
// 🔥 FECHAR AO CLICAR FORA (CORRETO)
// ================================

document.addEventListener("click",(e)=>{

const painel = document.getElementById("painelPedido")
const botao = document.getElementById("iconeCarrinho")

if(!painel || !botao) return

const clicouFora =
!painel.contains(e.target) &&
!botao.contains(e.target)

if(painel.classList.contains("ativo") && clicouFora){
fecharCarrinho()
}

})



// ================================
// ANIMAÇÃO
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
bola.style.width="12px"
bola.style.height="12px"
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

setTimeout(()=>bola.remove(),650)

}



// ================================
// ADICIONAR
// ================================

function adicionarCarrinho(item,botao){

if(!item || typeof item.preco !== "number") return

if(item.tipo === "pizza_simples" && temComboOuCustom()){
notificar("❌ Não pode misturar","danger")
return
}

if((item.tipo === "combo" || item.tipo === "pizza_custom") && temPizzaSimples()){
notificar("❌ Já tem pizza mais pedida","danger")
return
}

if(carrinho.length >= LIMITE_ITENS){
notificar("Limite atingido","danger")
return
}

if(botao) animarProdutoCarrinho(botao)

const existente = carrinho.find(p=>
p.nome===item.nome &&
p.tipo===item.tipo &&
p.tamanho===item.tamanho
)

if(existente){
existente.qtd++
}else{
carrinho.push({...item,qtd:1})
}

salvarCarrinho()
atualizarCarrinhoLista()

}



// ================================
// 🔥 NOVOS BOTÕES TOPO
// ================================

function limparTudo(){

if(!confirm("Limpar todo carrinho?")) return

carrinho=[]
salvarCarrinho()
atualizarCarrinhoLista()

// 🔥 RESET FORÇADO (resolve 100%)
resetarUICompleta()

// 🔥 fallback (caso exista lógica extra no home)
if(typeof resetarSistema === "function"){
resetarSistema()
}

notificar("Carrinho limpo","warning")

}

// ================================
// Novo pedido
// ================================
function novoPedido(){

// 🔥 NÃO mexe no carrinho
// só limpa interface

resetarUICompleta()

if(typeof resetarSistema === "function"){
resetarSistema()
}

notificar("Novo pedido iniciado")

}



// ================================
// RENDER
// ================================

function atualizarCarrinhoLista(){

const lista=document.getElementById("listaCarrinho")
const totalElemento=document.getElementById("totalCarrinho")
const contador=document.getElementById("contadorCarrinho")

if(!lista) return

lista.innerHTML=""

let total=0
let qtdTotal=0

// 🔥 BOTÕES TOPO
const topo = document.createElement("div")
topo.className="acoes-carrinho"

topo.innerHTML=`
<button onclick="limparTudo()">🗑 Limpar</button>
<button onclick="novoPedido()">➕ Novo</button>
<button onclick="irParaPedido()">✅ Finalizar</button>
`

lista.appendChild(topo)

carrinho.forEach((item,i)=>{

const subtotal=item.preco*item.qtd
total+=subtotal
qtdTotal+=item.qtd

const div=document.createElement("div")
div.className="item-carrinho"

div.innerHTML=`
<div class="info">
<strong>${item.nome}</strong>
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
// FINALIZAR
// ================================

function irParaPedido(){

if(carrinho.length===0){
notificar("Carrinho vazio","danger")
return
}

localStorage.setItem("pedido",JSON.stringify(carrinho))
window.location.href="html/pedido.html"

}



// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",()=>{
verificarExpiracao()
atualizarCarrinhoLista()
})

// ================================
// 🔥 RESET FORÇADO DE UI (ANTI-BUG)
// ================================

function resetarUICompleta(){

// 🔥 limpar pizzas (mais pedidas)
document.querySelectorAll("#lista-pizzas .pizza-card").forEach(c=>{
c.classList.remove("selecionado")
const btn = c.querySelector("button")
if(btn) btn.innerText = "Selecionar"
})

// 🔥 limpar bebidas
document.querySelectorAll(".bebida-card").forEach(c=>{
c.classList.remove("selecionado")
})

document.querySelectorAll(".botao-bebida").forEach(btn=>{
btn.classList.remove("bebidaSelecionada")
btn.innerText = "Selecionar"
})

// 🔥 limpar estado global HOME
if(typeof pedidoAtual !== "undefined"){
pedidoAtual = { pizza:null, bebida:null }
}

// 🔥 limpar variável local bebida
if(typeof bebidaSelecionada !== "undefined"){
bebidaSelecionada = null
}

// 🔥 liberar sistema (combos + botões)
if(typeof liberarSistema === "function"){
liberarSistema()
}

}



// ================================
// GLOBAL
// ================================

window.adicionarCarrinho=adicionarCarrinho
window.removerPorTipo=removerPorTipo
window.notificar=notificar
window.abrirCarrinho=abrirCarrinho
window.fecharCarrinho=fecharCarrinho
window.irParaPedido=irParaPedido
window.limparTudo=limparTudo
window.novoPedido=novoPedido