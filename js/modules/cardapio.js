// ================================
// DADOS DAS PIZZAS
// ================================ 

const pizzas = [
{nome:"Calabresa",ing:"Molho, mussarela, calabresa e cebola",preco:30,categoria:"salgada"},
{nome:"Portuguesa",ing:"Presunto, ovos, cebola, azeitona",preco:32,categoria:"salgada"},
{nome:"4 Queijos",ing:"Mussarela, provolone, parmesão e gorgonzola",preco:35,categoria:"salgada"},
{nome:"Marguerita",ing:"Molho de tomate, mussarela e manjericão",preco:30,categoria:"salgada"},
{nome:"Frango com Catupiry",ing:"Frango desfiado e catupiry",preco:33,categoria:"salgada"},
{nome:"Camarão",ing:"Camarão, molho e queijo",preco:40,categoria:"especial"},
{nome:"Chocolate",ing:"Chocolate ao leite",preco:28,categoria:"doce"},
{nome:"Carne do Sol",ing:"Carne do sol, cebola e queijo",preco:38,categoria:"especial"},
{nome:"Mussarela",ing:"Molho e mussarela",preco:29,categoria:"salgada"},
{nome:"Nordestino",ing:"Carne do sol, queijo coalho e cebola",preco:34,categoria:"especial"},
{nome:"Banana com Canela",ing:"Banana, açúcar e canela",preco:27,categoria:"doce"},
{nome:"Morango com Chocolate",ing:"Morango e chocolate",preco:29,categoria:"doce"},
{nome:"Pepperoni",ing:"Pepperoni e queijo",preco:35,categoria:"salgada"},
{nome:"Toscana",ing:"Linguiça toscana e queijo",preco:33,categoria:"salgada"},
{nome:"Bacon com Cheddar",ing:"Bacon crocante e cheddar",preco:36,categoria:"especial"},
{nome:"Vegetariana",ing:"Milho, ervilha, tomate e cebola",preco:32,categoria:"salgada"},
{nome:"Atum",ing:"Atum e queijo",preco:34,categoria:"salgada"},
{nome:"Milho com Catupiry",ing:"Milho e catupiry",preco:31,categoria:"salgada"},
{nome:"Palmito com Mussarela",ing:"Palmito e queijo",preco:32,categoria:"salgada"},
{nome:"Doce de Leite com Coco",ing:"Doce de leite e coco",preco:28,categoria:"doce"}
]



// ================================
// CONTROLE
// ================================

let aberto1 = false
let aberto2 = false



// ================================
// UTIL
// ================================

function limparNomeImagem(nome){
return nome
.toLowerCase()
.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
.replaceAll(" ","")
}



// ================================
// CRIAR CARD
// ================================

function criarCardPizza(p, tipo = null){

let nomeImagem = limparNomeImagem(p.nome)

const card = document.createElement("div")
card.className = "pizza-card"

// 🔥 CORREÇÃO (SEM lowercase)
card.dataset.id = limparNomeImagem(p.nome)

card.innerHTML = `
<img src="../img/pizzas/imgPizza${nomeImagem}.jpg">

<h3>${p.nome}</h3>

<p class="ingredientes">${p.ing}</p>

<p class="preco">A partir de ${formatarMoeda(p.preco)}</p>

<div class="tamanhos">
<button data-t="P">P</button>
<button data-t="M">M</button>
<button data-t="G">G</button>
</div>
`


// ================================
// EVENTOS
// ================================

card.querySelectorAll(".tamanhos button").forEach(btn=>{

btn.onclick = ()=>{

let tamanho = btn.dataset.t
let precoFinal = p.preco

if(tamanho === "M") precoFinal += 5
if(tamanho === "G") precoFinal += 10

// 🔥 SUPORTE UNIVERSAL (NÃO QUEBRA NADA)
if(typeof selecionarPizzaLocal === "function"){

// tenta padrão novo (pizza1)
try{
selecionarPizzaLocal(btn, p.nome, tamanho, precoFinal, p.ing)
}catch(e){

// fallback padrão antigo (pizza2/index)
try{
selecionarPizzaLocal(tipo, btn, p.nome, tamanho, precoFinal, p.ing)
}catch(err){
console.error("Erro ao selecionar pizza:", err)
}

}

}

}

})

return card

}



// ================================
// RENDER
// ================================

function renderPizzas(qtd, idLista = "lista-pizzas", tipo = null){

const lista = document.getElementById(idLista)
if(!lista) return

lista.innerHTML = ""

pizzas.slice(0,qtd).forEach(p=>{
lista.appendChild(criarCardPizza(p, tipo))
})

// 🔥 mantém seleção correta
if(typeof renderVisual === "function"){
renderVisual()
}

}



// ================================
// TOGGLE CARDÁPIO
// ================================

function toggleCardapio(idLista, tipo){

if(idLista === "lista-pizzas-1"){
aberto1 = !aberto1
renderPizzas(aberto1 ? pizzas.length : 4, idLista, tipo)
}

if(idLista === "lista-pizzas-2"){
aberto2 = !aberto2
renderPizzas(aberto2 ? pizzas.length : 4, idLista, tipo)
}

}



// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded",()=>{

const listaPadrao = document.getElementById("lista-pizzas")
if(listaPadrao){
renderPizzas(3)
}

const lista1 = document.getElementById("lista-pizzas-1")
const lista2 = document.getElementById("lista-pizzas-2")

if(lista1 && lista2){
renderPizzas(4,"lista-pizzas-1",1)
renderPizzas(4,"lista-pizzas-2",2)
}

})