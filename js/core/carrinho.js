// ================================
// CARRINHO V3 (SEM STORAGE)
// ================================

let carrinho = []

const LIMITE_ITENS = 30



// ================================
// VERIFICAÇÕES
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
atualizarCarrinhoLista()
}



// ================================
// UTIL
// ================================

function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})
}



// ================================
// TOAST
// ================================

function notificar(msg,tipo="success"){

if(!window.bootstrap) return

const toast = document.createElement("div")

toast.className =
`toast text-bg-${tipo} position-fixed top-0 end-0 m-3`

toast.innerHTML = `<div class="p-2">${msg}</div>`

document.body.appendChild(toast)

setTimeout(()=>toast.remove(),3000)

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
p.tamanho===item.tamanho &&
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

// BOTÕES TOPO
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

const adicionaisHTML = (item.adicionais && item.adicionais.length)
? `<small>+ ${item.adicionais.map(a=>a.nome).join(", ")}</small>`
: ""

const div=document.createElement("div")
div.className="item-carrinho"

div.innerHTML=`
<div>
<strong>${item.nome}</strong>
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

}



// ================================
// CONTROLES
// ================================

function removerCarrinho(i){
carrinho.splice(i,1)
atualizarCarrinhoLista()
}

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
// FINALIZAR (🔥 V3)
// ================================

function irParaPedido(){

if(carrinho.length===0){
notificar("Carrinho vazio","danger")
return
}

// 🔥 cria pedido no sistema novo
if(typeof criarPedido === "function"){

const pedido = criarPedido()

carrinho.forEach(item=>{
adicionarItemPedido(item)
})

}

// limpa carrinho
carrinho = []

window.location.href="html/confirmacao.html"

}



// ================================
// LIMPAR
// ================================

function limparTudo(){
carrinho = []
atualizarCarrinhoLista()
}



// ================================
// NOVO PEDIDO
// ================================

function novoPedido(){

carrinho = []
atualizarCarrinhoLista()

if(typeof criarPedido === "function"){
criarPedido()
}

notificar("Novo pedido iniciado")

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