// ================================
// RENDER MAIS PEDIDAS
// ================================

document.addEventListener("DOMContentLoaded",()=>{

const lista = document.getElementById("lista-pizzas")

if(!lista) return

// exemplo base (depois pode vir do data/pizzas.js)
const pizzas = [
{
nome:"Calabresa",
img:"img/pizzas/imgPizzaMaisPedidas1.jpg",
desc:"Molho, mussarela e calabresa",
preco:30
},
{
nome:"Portuguesa",
img:"img/pizzas/imgPizzaMaisPedidas2.jpg",
desc:"Presunto, ovo e cebola",
preco:35
},
{
nome:"4 Queijos",
img:"img/pizzas/imgPizzaMaisPedidas3.jpg",
desc:"Mix de queijos",
preco:38
}
]

lista.innerHTML=""

pizzas.forEach(pizza=>{

const card = document.createElement("article")

card.className="pizza-card"

card.innerHTML=`

<img src="${pizza.img}" alt="${pizza.nome}">

<h3>${pizza.nome}</h3>

<p class="ingredientes">${pizza.desc}</p>

<p class="preco">R$ ${pizza.preco}</p>

<button class="btn btn-warning">
Ver opções
</button>

`

lista.appendChild(card)

})

})