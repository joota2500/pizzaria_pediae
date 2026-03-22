/*
========================================
📄 ARQUIVO: combos.js

📌 FUNÇÃO:
Renderiza combos e integra com carrinho.
Suporta múltiplos combos e sincroniza com UI.

🔗 DEPENDE DE:
- carrinho.js
- home.js (resetUI)
- utils

📍 USADO EM:
- index.html
========================================
*/


// ================================
// DADOS DOS COMBOS
// ================================

const combos = [
{nome:"Combo Calabresa",desc:"Pizza Calabresa (molho, mussarela, calabresa e cebola) + Coca-Cola 1L gelada",preco:40,img:"img/combos/comboCalabresa.jpg"},
{nome:"Combo Portuguesa",desc:"Pizza Portuguesa (presunto, ovos, cebola e azeitona) + Guaraná 1L",preco:42,img:"img/combos/comboPortuguesa.jpg"},
{nome:"Combo Frango Supremo",desc:"Pizza Frango com Catupiry + Coca-Cola 1L",preco:43,img:"img/combos/comboCalabresa.jpg"},
{nome:"Combo 4 Queijos",desc:"Pizza 4 Queijos + Pepsi 1L",preco:45,img:"img/combos/comboPortuguesa.jpg"},
{nome:"Combo Nordestino",desc:"Pizza Carne de Sol + Guaraná 1L",preco:48,img:"img/combos/comboCalabresa.jpg"},
{nome:"Combo Família",desc:"Pizza Grande (2 sabores) + Coca-Cola 2L",preco:70,img:"img/combos/comboPortuguesa.jpg"},
{nome:"Combo Casal",desc:"Pizza Média (2 sabores) + Coca-Cola 1L + borda recheada",preco:55,img:"img/combos/comboCalabresa.jpg"},
{nome:"Combo Econômico",desc:"Pizza Mussarela + refrigerante 600ml",preco:32,img:"img/combos/comboPortuguesa.jpg"},
{nome:"Combo Doce",desc:"Pizza Chocolate ou Banana + Guaraná 1L",preco:38,img:"img/combos/comboCalabresa.jpg"},
{nome:"Combo Premium",desc:"Pizza Camarão ou Bacon + Coca-Cola 2L",preco:75,img:"img/combos/comboPortuguesa.jpg"}
]


// ================================
// VARIÁVEIS
// ================================

let aberto = false
let listaCombos



// ================================
// CRIAR CARD
// ================================

function criarCardCombo(c){

const selecionado = carrinho.some(item =>
item.nome === c.nome && item.tipo === "combo"
)

const card = document.createElement("article")
card.className = "combo-card"

card.innerHTML = `
<img src="${c.img}" alt="${c.nome}">
<h3>${c.nome}</h3>
<p class="descricao">${c.desc}</p>
<p class="preco">${formatarMoeda(c.preco)}</p>
<button class="btn btn-warning">
${selecionado ? "✔ Selecionado" : "Selecionar"}
</button>
`

const botao = card.querySelector("button")

if(selecionado){
card.classList.add("selecionado")
}


// ================================
// CLICK (🔥 MULTI COMBO)
// ================================

botao.onclick = ()=>{

const jaExiste = carrinho.find(item =>
item.nome === c.nome && item.tipo === "combo"
)


// ❌ REMOVER APENAS ESSE COMBO
if(jaExiste){

carrinho = carrinho.filter(item =>
!(item.nome === c.nome && item.tipo === "combo")
)

resetUI()
atualizarCarrinhoLista()

notificar("Combo removido","warning")
return
}


// ❓ PERGUNTA (SE JÁ TEM ALGUM COMBO)
const jaTemCombo = carrinho.some(item => item.tipo === "combo")

if(jaTemCombo){

modalConfirmar({
titulo:"🍕 Mais um combo?",
texto:"Esse tá bom… mas sempre cabe mais um 😏",
onConfirm:()=>{

adicionarCarrinho({
nome:c.nome,
preco:c.preco,
ingredientes:c.desc,
tipo:"combo",
img:c.img
})

resetUI()

notificar("Combo adicionado","success")

}
})

return
}


// ➕ ADICIONAR NORMAL
adicionarCarrinho({
nome:c.nome,
preco:c.preco,
ingredientes:c.desc,
tipo:"combo",
img:c.img
})

resetUI()

notificar("Combo selecionado","success")

}

return card
}



// ================================
// RENDER
// ================================

function renderCombos(qtd){

if(!listaCombos) return

listaCombos.innerHTML=""

combos.slice(0,qtd).forEach(c=>{
listaCombos.appendChild(criarCardCombo(c))
})

}



// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",()=>{

listaCombos = document.getElementById("lista-combos")
const btn = document.getElementById("verCombos")

if(!listaCombos) return

renderCombos(2)

if(btn){

btn.onclick = ()=>{

aberto = !aberto

if(aberto){
renderCombos(combos.length)
btn.innerText = "Mostrar menos"
}else{
renderCombos(2)
btn.innerText = "Ver todos combos"
}

}

}

})



// ================================
// GLOBAL
// ================================

window.renderCombos = renderCombos