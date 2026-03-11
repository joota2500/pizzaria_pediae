// ================================
// SISTEMA DE CARRINHO PROFISSIONAL
// ================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

const LIMITE_ITENS = 30
const EXPIRACAO_CARRINHO = 1000 * 60 * 60 * 1 // 1 horas



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
// EXPIRAÇÃO DO CARRINHO
// ================================

function verificarExpiracao(){

const hora = localStorage.getItem("carrinhoHora")

if(!hora) return

const agora = Date.now()

if(agora - hora > EXPIRACAO_CARRINHO){

localStorage.removeItem("carrinho")
carrinho=[]

}

}



// ================================
// NOTIFICAÇÃO BOOTSTRAP
// ================================

function notificar(msg,tipo="success"){

if(!window.bootstrap) return

const toast = document.createElement("div")

toast.className=
`toast align-items-center text-bg-${tipo} border-0 position-fixed bottom-0 end-0 m-3`

toast.innerHTML=`
<div class="d-flex">
<div class="toast-body">
${msg}
</div>
<button type="button"
class="btn-close btn-close-white me-2 m-auto"
data-bs-dismiss="toast">
</button>
</div>
`

document.body.appendChild(toast)

const t = new bootstrap.Toast(toast)

t.show()

setTimeout(()=>toast.remove(),4000)

}



// ================================
// ADICIONAR ITEM
// ================================

function adicionarCarrinho(item,botao){

if(!item) return
if(typeof item.preco !== "number") return

if(carrinho.length >= LIMITE_ITENS){

notificar("Limite de itens atingido","danger")
return

}



// animação

if(botao && typeof animarProdutoCarrinho === "function"){
animarProdutoCarrinho(botao)
}



// criar item

const novoItem = {

tipo:item.tipo || "pizza",
nome:sanitizar(item.nome || ""),
nome2:sanitizar(item.nome2 || ""),
tamanho:item.tamanho || "",
borda:item.borda || "nenhuma",
preco:item.preco,
qtd:1

}



// verificar duplicação

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



if(typeof abrirCarrinho==="function"){
abrirCarrinho()
}

}



// ================================
// REMOVER ITEM
// ================================

function removerCarrinho(index){

if(!carrinho[index]) return

carrinho.splice(index,1)

salvarCarrinho()
atualizarCarrinhoLista()

}



// ================================
// AUMENTAR QTD
// ================================

function aumentarQtd(index){

if(!carrinho[index]) return

carrinho[index].qtd++

salvarCarrinho()
atualizarCarrinhoLista()

}



// ================================
// DIMINUIR QTD
// ================================

function diminuirQtd(index){

if(!carrinho[index]) return

if(carrinho[index].qtd > 1){

carrinho[index].qtd--

}else{

carrinho.splice(index,1)

}

salvarCarrinho()
atualizarCarrinhoLista()

}



// ================================
// LIMPAR CARRINHO (MANUAL)
// ================================

function limparCarrinho(){

if(!confirm("Deseja limpar todo o carrinho?")) return

carrinho=[]

salvarCarrinho()
atualizarCarrinhoLista()

resetarConfiguracoesPizza()

}



// ================================
// LIMPAR CARRINHO AUTOMÁTICO
// ================================

function limparCarrinhoAutomatico(){

carrinho=[]

localStorage.removeItem("carrinho")
localStorage.removeItem("pedido")

atualizarCarrinhoLista()

resetarConfiguracoesPizza()

}



// ================================
// RESETAR CONFIGURAÇÕES PIZZA
// ================================

function resetarConfiguracoesPizza(){

const meia = document.getElementById("meiaPizza")
if(meia) meia.checked=false

const borda = document.getElementById("bordaPizza")
if(borda) borda.value="nenhuma"

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
let quantidadeTotal=0



carrinho.forEach((item,index)=>{

const subtotal=item.preco*item.qtd

total+=subtotal
quantidadeTotal+=item.qtd



let nomePizza=item.nome

if(item.nome2){

nomePizza=`${item.nome} / ${item.nome2}`

}



let bordaTexto=""

if(item.borda && item.borda!=="nenhuma"){

bordaTexto=`<small class="text-muted">Borda: ${item.borda}</small>`

}



const div=document.createElement("div")

div.className="item-carrinho"

div.innerHTML=`

<div class="info">

<strong>${nomePizza}</strong>

<br>

<small>${item.tamanho || ""}</small>

<br>

${bordaTexto}

<span>${formatarMoeda(item.preco)}</span>

</div>

<div class="controles">

<button onclick="diminuirQtd(${index})">−</button>

<span>${item.qtd}</span>

<button onclick="aumentarQtd(${index})">+</button>

</div>

<div class="subtotal">

${formatarMoeda(subtotal)}

</div>

<button class="remover"
onclick="removerCarrinho(${index})">
❌
</button>

`

lista.appendChild(div)

})



// botão limpar

if(carrinho.length>0){

const btn=document.createElement("button")

btn.className="botao-limpar-carrinho"

btn.innerText="🗑 Limpar carrinho"

btn.onclick=limparCarrinho

lista.appendChild(btn)

}



// contador

if(contador){

contador.innerText=quantidadeTotal

contador.style.transform="scale(1.3)"

setTimeout(()=>{

contador.style.transform="scale(1)"

},200)

}



// total

if(totalElemento){

totalElemento.innerText=
"Total: "+formatarMoeda(total)

}

}



// ================================
// IR PARA PEDIDO
// ================================

function irParaPedido(){

if(carrinho.length===0){

notificar("Seu carrinho está vazio","danger")
return

}



let total=carrinho.reduce((t,i)=>t+(i.preco*i.qtd),0)



if(window.CONFIG && CONFIG.pedido && total < CONFIG.pedido.valorMinimo){

notificar(
`Pedido mínimo ${formatarMoeda(CONFIG.pedido.valorMinimo)}`,
"warning"
)

return

}



localStorage.setItem("pedido",JSON.stringify(carrinho))

window.location.href="pedido.html"

}



// ================================
// CARREGAR
// ================================

document.addEventListener("DOMContentLoaded",()=>{

verificarExpiracao()

atualizarCarrinhoLista()

})



// ================================
// FUNÇÕES GLOBAIS
// ================================

window.adicionarCarrinho=adicionarCarrinho
window.limparCarrinho=limparCarrinho
window.limparCarrinhoAutomatico=limparCarrinhoAutomatico
window.irParaPedido=irParaPedido