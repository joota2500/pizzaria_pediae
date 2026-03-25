/*
========================================
📄 ARQUIVO: carrinho.js

📌 FUNÇÃO:
Gerencia o carrinho de pedidos.
Controla adição, remoção, renderização,
limpeza, finalização e sincronização TOTAL com UI.

🔗 DEPENDE DE:
- home.js
- bebidas.js
- combos.js

📍 USADO EM:
- index.html

🧠 OBS:
Suporte completo a multi seleção (pizza, combo, bebida)
========================================
*/


// ================================
// CARRINHO
// ================================

let carrinho = []
const LIMITE_ITENS = 30



// ================================
// UTIL
// ================================

function formatarMoeda(valor){
return Number(valor).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})
}



// ================================
// TOAST
// ================================

function notificar(msg,tipo="success"){
if(!window.bootstrap) return

const toast = document.createElement("div")
toast.className = `toast text-bg-${tipo} position-fixed top-0 end-0 m-3`
toast.innerHTML = `<div class="p-2">${msg}</div>`

document.body.appendChild(toast)
setTimeout(()=>toast.remove(),3000)
}



// ================================
// BOTÕES PIZZA (AGORA LIVRE)
// ================================

function atualizarBotoesPizza(){

const btnPizza1 = document.getElementById("btnPizza1")
const btnPizza2 = document.getElementById("btnPizza2")

if(!btnPizza1 || !btnPizza2) return

// 🔥 REGRA CORRETA
const temBloqueio = carrinho.some(item =>
item.tipo === "pizza_simples" || item.tipo === "combo"
)
 
if(temBloqueio){

btnPizza1.disabled = true
btnPizza2.disabled = true

btnPizza1.style.opacity = "0.5"
btnPizza2.style.opacity = "0.5"

btnPizza1.innerText = "Indisponível"
btnPizza2.innerText = "Indisponível"

}else{

btnPizza1.disabled = false
btnPizza2.disabled = false

btnPizza1.style.opacity = "1"
btnPizza2.style.opacity = "1"

btnPizza1.innerText = "Escolher"
btnPizza2.innerText = "Escolher"

}

}


// ================================
// ABRIR / FECHAR
// ================================

function abrirCarrinho(){
const painel = document.getElementById("painelPedido")
if(painel){
painel.classList.add("ativo")
document.body.style.overflow="hidden"
}
}

function fecharCarrinho(){
const painel = document.getElementById("painelPedido")
if(painel){
painel.classList.remove("ativo")
document.body.style.overflow="auto"
}
}



// ================================
// ADICIONAR (SEM BLOQUEIO 🔥)
// ================================

function adicionarCarrinho(item,botao){

if(!item || typeof item.preco !== "number") return

if(carrinho.length >= LIMITE_ITENS){
notificar("Limite atingido","danger")
return
}

// animação
if(botao && typeof animarProdutoCarrinho === "function"){
animarProdutoCarrinho(botao)
}

// 🔥 lógica inteligente (evita duplicação exata)
const existente = carrinho.find(p=>
p.nome === item.nome &&
(p.tamanho || "") === (item.tamanho || "") &&
JSON.stringify(p.adicionais || []) === JSON.stringify(item.adicionais || [])
)

if(existente){
existente.qtd++
}else{
carrinho.push({
...item,
qtd:1,
ingredientes: item.ingredientes || "",
adicionais: item.adicionais || []
})
}

atualizarCarrinhoLista()

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

// topo
const topo = document.createElement("div")
topo.className="acoes-carrinho"

topo.innerHTML=`
<button onclick="limparTudo()">🗑 Limpar</button>
<button onclick="novoPedido()">➕ Novo</button>
<button onclick="irParaPedido()">✅ Finalizar</button>
`

lista.appendChild(topo)

// itens
carrinho.forEach((item,i)=>{

const subtotal=item.preco*item.qtd
total+=subtotal
qtdTotal+=item.qtd

const adicionaisHTML = item.adicionais?.length
? `<small>+ ${item.adicionais.map(a=>a.nome).join(", ")}</small>`
: ""

const ingredientesHTML = item.ingredientes
? `<small style="color:#666;">${item.ingredientes}</small>`
: ""

const div=document.createElement("div")
div.className="item-carrinho"

div.innerHTML=`
<div>
<strong>${item.nome}</strong><br>
${ingredientesHTML}
${adicionaisHTML}
</div>

<div>
<button onclick="diminuirQtd(${i})">−</button>
<span>${item.qtd}</span>
<button onclick="aumentarQtd(${i})">+</button>
</div>

<div>${formatarMoeda(subtotal)}</div>
`

lista.appendChild(div)

})

if(contador) contador.innerText=qtdTotal
if(totalElemento) totalElemento.innerText="Total: "+formatarMoeda(total)

// atualiza botões
atualizarBotoesPizza()

}



// ================================
// CONTROLES
// ================================

function aumentarQtd(i){
carrinho[i].qtd++
atualizarCarrinhoLista()
}

function diminuirQtd(i){
if(carrinho[i].qtd > 1){
carrinho[i].qtd--
}else{
carrinho.splice(i,1)
}
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

localStorage.setItem("pedidoAtual", JSON.stringify({
itens: carrinho
}))

carrinho = []
window.location.href="html/confirmacao.html"

}



// ================================
// 🔥 LIMPAR (AGORA 100% FUNCIONAL)
// ================================

function limparTudo(){

carrinho = []

atualizarCarrinhoLista()


// ================================
// 🔥 RE-RENDER TOTAL (SOLUÇÃO REAL)
// ================================

// pizzas
if(typeof document !== "undefined"){
document.querySelectorAll(".pizza-card").forEach(card=>{
card.classList.remove("selecionado")
const btn = card.querySelector("button")
if(btn) btn.innerText = "Selecionar"
})
}

// bebidas
if(typeof renderBebidas === "function"){
renderBebidas(window.bebidasAberto ? bebidas.length : 4)
}

// combos
if(typeof renderCombos === "function"){
renderCombos(window.aberto ? combos.length : 2)
}

notificar("Carrinho limpo","warning")

}



// ================================
// NOVO PEDIDO
// ================================

function novoPedido(){

// 🔥 apenas fecha o carrinho
fecharCarrinho()

// 💬 mensagem bonita
toastNovoPedido()

}

function toastNovoPedido(){

const toast = document.getElementById("toastNovoPedido")
if(!toast) return

toast.classList.add("show")

// reinicia animação da barra
const barra = toast.querySelector(".barra")
barra.style.animation = "none"
barra.offsetHeight // força reflow
barra.style.animation = null

setTimeout(()=>{
toast.classList.remove("show")
},3000)

}



// ================================
// FECHAR AO CLICAR FORA
// ================================

document.addEventListener("click", (e) => {

const painel = document.getElementById("painelPedido")
if(!painel) return

const clicouDentro = painel.contains(e.target)
const clicouBotao = e.target.closest(".carrinho-flutuante")

if(!clicouDentro && !clicouBotao){
painel.classList.remove("ativo")
document.body.style.overflow="auto"
}

})



// ================================
// GLOBAL
// ================================

window.adicionarCarrinho=adicionarCarrinho
window.notificar=notificar
window.abrirCarrinho=abrirCarrinho
window.fecharCarrinho=fecharCarrinho
window.irParaPedido=irParaPedido
window.limparTudo=limparTudo
window.novoPedido=novoPedido
window.atualizarBotoesPizza = atualizarBotoesPizza