// ================================
// LISTA DE BEBIDAS
// ================================

const bebidas=[

{nome:"Coca Cola Lata",preco:6},
{nome:"Coca Cola 1L",preco:8},
{nome:"Coca Cola 2L",preco:12},
{nome:"Refrigerante Laranja",preco:7},
{nome:"Guaraná Lata",preco:6},
{nome:"Guaraná 1L",preco:8},
{nome:"Cajuína",preco:6},

{nome:"Teste01",preco:5},
{nome:"Teste02",preco:5},
{nome:"Teste03",preco:5},
{nome:"Teste04",preco:5},
{nome:"Teste05",preco:5},
{nome:"Teste06",preco:5},
{nome:"Teste07",preco:5},
{nome:"Teste08",preco:5},
{nome:"Teste09",preco:5},
{nome:"Teste10",preco:5},

{nome:"Teste11",preco:5},
{nome:"Teste12",preco:5},
{nome:"Teste13",preco:5},
{nome:"Teste14",preco:5},
{nome:"Teste15",preco:5},
{nome:"Teste16",preco:5},
{nome:"Teste17",preco:5},
{nome:"Teste18",preco:5},
{nome:"Teste19",preco:5},
{nome:"Teste20",preco:5}

]


let bebidasAberto=false



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
// RENDERIZAR BEBIDAS
// ================================

function renderBebidas(qtd){

const listaB = document.getElementById("lista-bebidas")

if(!listaB) return

listaB.innerHTML=""

bebidas.slice(0,qtd).forEach(b=>{

let nomeImagem = limparNomeImagem(b.nome)

const card = document.createElement("div")
card.className="pizza-card"
card.dataset.categoria="bebida"
card.dataset.nome=b.nome.toLowerCase()

card.innerHTML=`

<img src="img/bebidas/imgBebida${nomeImagem}.jpg">

<h3>${b.nome}</h3>

<p class="ingredientes">${formatarMoeda(b.preco)}</p>

<button class="botao-bebida"
onclick="selecionarBebida(this,'${b.nome}',${b.preco})">
Adicionar
</button>

`

listaB.appendChild(card)

})

}



// ================================
// MOSTRAR INICIAL
// ================================

document.addEventListener("DOMContentLoaded",()=>{

renderBebidas(3)

})



// ================================
// EXPANDIR LISTA
// ================================

document.addEventListener("DOMContentLoaded",()=>{

const btn = document.getElementById("mostrarBebidas")

if(!btn) return

btn.onclick=()=>{

bebidasAberto=!bebidasAberto

if(bebidasAberto){

renderBebidas(bebidas.length)
btn.innerText="Fechar bebidas"

}else{

renderBebidas(3)
btn.innerText="Ver todas bebidas"

}

}

})



// ================================
// INTERAÇÃO VISUAL
// ================================

document.addEventListener("click",function(e){

const botao = e.target.closest(".botao-bebida")

if(!botao) return


// remover seleção anterior
document.querySelectorAll(".botao-bebida").forEach(btn=>{

btn.classList.remove("bebidaSelecionada")
btn.innerText="Adicionar"

})


// aplicar seleção
botao.classList.add("bebidaSelecionada")
botao.innerText="Selecionado"


// animação
const card = botao.closest(".pizza-card")

if(card){

card.style.transform="scale(1.05)"

setTimeout(()=>{
card.style.transform=""
},200)

}

})