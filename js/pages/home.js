/*
========================================
📄 ARQUIVO: home.js

📌 FUNÇÃO:
Controla a página inicial (index).
Renderiza pizzas mais pedidas e sincroniza
com o carrinho.

🔗 DEPENDE DE:
- carrinho.js
- bebidas.js 
- combos.js

📍 USADO EM:
- index.html
========================================
*/


// ================================
// 🔥 STATUS
// ================================

function verificarStatus(){

const status = document.getElementById("statusPizzaria")
if(!status) return

const hora = new Date().getHours()
const aberto = hora >= 17 && hora <= 23

status.innerHTML = aberto ? "🟢 Aberto agora" : "🔴 Fechado"

status.style.background = aberto ? "#d4edda" : "#f8d7da"
status.style.color = aberto ? "#155724" : "#721c24"

}



// ================================
// 🔥 MODAL
// ================================

function modalConfirmar({titulo, texto, onConfirm}){

const modal = document.getElementById("modalConfirmacao")
if(!modal) return

document.getElementById("modalTitulo").innerText = titulo
document.getElementById("modalTexto").innerText = texto

modal.classList.add("ativo")

document.getElementById("btnConfirmar").onclick = ()=>{
modal.classList.remove("ativo")
onConfirm && onConfirm()
}

document.getElementById("btnCancelar").onclick = ()=>{
modal.classList.remove("ativo")
}

}

window.modalConfirmar = modalConfirmar



// ================================
// 🍕 RENDER PIZZAS
// ================================

function renderPizzas(){

const lista = document.getElementById("lista-pizzas")
if(!lista) return

const pizzas = [
{nome:"Calabresa ( G )",img:"img/pizzas/imgPizzaMaisPedidas1.jpg",desc:"Molho, mussarela e calabresa",preco:30},
{nome:"Portuguesa ( G )",img:"img/pizzas/imgPizzaMaisPedidas2.jpg",desc:"Presunto, ovo e cebola",preco:35},
{nome:"4 Queijos ( G )",img:"img/pizzas/imgPizzaMaisPedidas3.jpg",desc:"Mix de queijos",preco:38}
]

lista.innerHTML=""

pizzas.forEach(pizza=>{

const selecionada = carrinho.some(item =>
item.nome === pizza.nome && item.tipo === "pizza_simples"
)

const card = document.createElement("article")
card.className="pizza-card"

card.innerHTML=`
<img src="${pizza.img}">
<h3>${pizza.nome}</h3>
<p class="ingredientes">${pizza.desc}</p>
<p class="preco">R$ ${pizza.preco}</p>
<button class="btn btn-warning">
${selecionada ? "✔ Selecionado" : "Selecionar"}
</button>
`

const botao = card.querySelector("button")

if(selecionada){
card.classList.add("selecionado")
}


// ================================
// CLICK
// ================================

botao.onclick = ()=>{

const jaExiste = carrinho.find(item =>
item.nome === pizza.nome && item.tipo === "pizza_simples"
)


// ❌ remover
if(jaExiste){

carrinho = carrinho.filter(item =>
!(item.nome === pizza.nome && item.tipo === "pizza_simples")
)

resetUI()
atualizarCarrinhoLista()

notificar("Pizza removida","warning")
return
}


// ❓ modal
const jaTemPizza = carrinho.some(item => item.tipo === "pizza_simples")

if(jaTemPizza){

modalConfirmar({
titulo:"🍕 Mais uma pizza?",
texto:"Quem pede uma… sempre quer mais 😏",
onConfirm:()=>{

adicionarCarrinho({
tipo:"pizza_simples",
nome:pizza.nome,
ingredientes:pizza.desc,
tamanho:"M",
preco:pizza.preco
})

resetUI()
sugerirBebida()

}
})

return
}


// ➕ adicionar normal
adicionarCarrinho({
tipo:"pizza_simples",
nome:pizza.nome,
ingredientes:pizza.desc,
tamanho:"M",
preco:pizza.preco
})

resetUI()
sugerirBebida()

}

lista.appendChild(card)

})

}



// ================================
// 💡 SUGESTÃO BEBIDA
// ================================

function sugerirBebida(){

const temBebida = carrinho.some(item => item.tipo === "bebida")
if(temBebida) return

const box = document.createElement("div")
box.className = "sugestao-bebida"

box.innerHTML = `
<div class="sugestao-content">
<p>🥤 Quem pediu essa pizza também gosta de uma bebida 😋</p>
<button id="btnVerBebidas">Ver bebidas</button>
<button id="btnAgoraNao">Agora não</button>
</div>
`

document.body.appendChild(box)

document.getElementById("btnVerBebidas").onclick = ()=>{
document.getElementById("bebidas")?.scrollIntoView({behavior:"smooth"})
box.remove()
}

document.getElementById("btnAgoraNao").onclick = ()=> box.remove()

}



// ================================
// 🔥 RESET GLOBAL
// ================================

function resetUI(){

renderPizzas()

if(typeof renderBebidas === "function"){
renderBebidas(window.bebidasAberto ? bebidas.length : 4)
}

if(typeof renderCombos === "function"){
// 🔥 combos NÃO são resetados aqui
// cada combo controla seu próprio estado
}

if(typeof atualizarBotoesPizza === "function"){
atualizarBotoesPizza()
}

}

window.resetUI = resetUI



// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",()=>{

verificarStatus()
renderPizzas()

// ================================
// 🔥 BOTÕES PIZZA (ADIÇÃO SEGURA)
// ================================

const btnPizza1 = document.getElementById("btnPizza1")
const btnPizza2 = document.getElementById("btnPizza2")

if(btnPizza1){
btnPizza1.addEventListener("click", ()=>{
if(btnPizza1.disabled) return
window.location.href = "./html/pizza-1-sabor.html"
})
}

if(btnPizza2){
btnPizza2.addEventListener("click", ()=>{
if(btnPizza2.disabled) return
window.location.href = "./html/pizza-2-sabores.html"
})
}
// ================================
// 🔥 CONTROLE DE RETORNO (COMBOS)
// ================================

const modo = localStorage.getItem("modoRetorno")

if(modo){

// limpa depois de usar
localStorage.removeItem("modoRetorno")

// ================================
// 🟢 ADICIONAR MAIS
// ================================

if(modo === "adicionar"){

// 🔥 NÃO abrir carrinho
if(typeof fecharCarrinho === "function"){
fecharCarrinho()
}

// 🔥 NÃO forçar abrir combos
// mantém estado atual do botão

// scroll suave
setTimeout(()=>{
document.getElementById("combos")?.scrollIntoView({
behavior:"smooth"
})
},300)

// toast bonito (se existir)
if(typeof mostrarToastNovoPedido === "function"){
mostrarToastNovoPedido()
}else{
notificar?.("✨ Já pode adicionar seu novo pedido 😋")
}

}


// ================================
// 🟡 EDITAR PEDIDO
// ================================

if(modo === "editar"){

if(typeof fecharCarrinho === "function"){
fecharCarrinho()
}

// só rola, não abre combos automaticamente
setTimeout(()=>{
document.getElementById("combos")?.scrollIntoView({
behavior:"smooth"
})
},300)

}

}
})