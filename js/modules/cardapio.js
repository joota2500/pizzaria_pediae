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
{nome:"Doce de Leite com Coco",ing:"Doce de leite e coco",preco:28,categoria:"doce"},

{nome:"Teste 01",ing:"Pizza especial da casa",preco:30,categoria:"especial"},
{nome:"Teste 02",ing:"Pizza especial da casa",preco:30,categoria:"especial"},
{nome:"Teste 03",ing:"Pizza especial da casa",preco:30,categoria:"especial"},
{nome:"Teste 04",ing:"Pizza especial da casa",preco:30,categoria:"especial"},
{nome:"Teste 05",ing:"Pizza especial da casa",preco:30,categoria:"especial"},
{nome:"Teste 06",ing:"Pizza especial da casa",preco:30,categoria:"especial"},
{nome:"Teste 07",ing:"Pizza especial da casa",preco:30,categoria:"especial"},
{nome:"Teste 08",ing:"Pizza especial da casa",preco:30,categoria:"especial"},
{nome:"Teste 09",ing:"Pizza especial da casa",preco:30,categoria:"especial"},
{nome:"Teste 10",ing:"Pizza especial da casa",preco:30,categoria:"especial"}

]


// ================================
// VARIÁVEIS
// ================================

let lista
let botaoCardapio
let cardapioAberto = false



// ================================
// LIMPAR NOME DA IMAGEM
// ================================

function limparNomeImagem(nome){

return nome
.replaceAll(" ","")
.replaceAll("ç","c")
.replaceAll("ã","a")
.replaceAll("á","a")
.replaceAll("é","e")
.replaceAll("í","i")
.replaceAll("ó","o")
.replaceAll("ú","u")

}



// ================================
// CRIAR CARD
// ================================

function criarCardPizza(p){

let nomeImagem = limparNomeImagem(p.nome)

const card = document.createElement("div")

card.className = "pizza-card"
card.dataset.categoria = p.categoria
card.dataset.nome = p.nome.toLowerCase()

card.innerHTML = `

<img src="img/pizzas/imgPizza${nomeImagem}.jpg" alt="${p.nome}">

<h3>${p.nome}</h3>

<p class="ingredientes">${p.ing}</p>

<p class="preco">A partir de ${formatarMoeda(p.preco)}</p>

<div class="tamanhos">

<button onclick="selecionarPizza(this,'${p.nome}','P',${p.preco})">P</button>

<button onclick="selecionarPizza(this,'${p.nome}','M',${p.preco+5})">M</button>

<button onclick="selecionarPizza(this,'${p.nome}','G',${p.preco+10})">G</button>

</div>

`

return card

}



// ================================
// RENDER PIZZAS
// ================================

function renderPizzas(qtd){

if(!lista) return

lista.innerHTML = ""

pizzas.slice(0,qtd).forEach(p => {

lista.appendChild(criarCardPizza(p))

})

}



// ================================
// FILTRAR CATEGORIA
// ================================

function filtrarCategoria(cat){

if(!lista) return

lista.innerHTML=""

if(cat==="todas"){

pizzas.forEach(p=>{
lista.appendChild(criarCardPizza(p))
})

return
}

pizzas
.filter(p => p.categoria === cat)
.forEach(p => {

lista.appendChild(criarCardPizza(p))

})

}



// ================================
// INICIAR SISTEMA
// ================================

document.addEventListener("DOMContentLoaded",()=>{

lista = document.getElementById("lista-pizzas")
botaoCardapio = document.getElementById("mostrarCardapio")

if(!lista) return

renderPizzas(3)

if(botaoCardapio){

botaoCardapio.onclick = () => {

cardapioAberto = !cardapioAberto

if(cardapioAberto){

renderPizzas(pizzas.length)
botaoCardapio.innerText = "Fechar cardápio"

}else{

renderPizzas(3)
botaoCardapio.innerText = "Ver cardápio completo"

}

}

}

})