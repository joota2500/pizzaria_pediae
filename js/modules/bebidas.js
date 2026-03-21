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
// LIMPAR NOME IMAGEM
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
// RENDER
// ================================

function renderBebidas(qtd){

const listaB = document.getElementById("lista-bebidas")
if(!listaB) return

listaB.innerHTML=""

bebidas.slice(0,qtd).forEach(b=>{

let nomeImagem = limparNomeImagem(b.nome)

const card = document.createElement("article")
card.className="pizza-card bebida-card"

card.innerHTML=`
<img src="img/bebidas/imgBebida${nomeImagem}.jpg"
onerror="this.src='img/bebidas/imgBebidaCocaColaLata.jpg'">
<h3>${b.nome}</h3>
<p class="ingredientes">${formatarMoeda(b.preco)}</p>
<button class="botao-bebida">Selecionar</button>
`

const botao = card.querySelector("button")


// ================================
// CLICK
// ================================

botao.onclick = ()=>{

// 🔁 DESMARCAR (baseado no HOME)
if(
typeof pedidoAtual !== "undefined" &&
pedidoAtual.bebida &&
pedidoAtual.bebida.nome === b.nome
){

card.classList.remove("selecionado")
botao.classList.remove("bebidaSelecionada")
botao.innerText="Selecionar"

notificar("Bebida removida","warning")

if(typeof selecionarBebidaGlobal === "function"){
selecionarBebidaGlobal(null)
}

return
}


// ================================
// 🔥 LIMPAR TODAS
// ================================

document.querySelectorAll(".bebida-card").forEach(c=>{
c.classList.remove("selecionado")
})

document.querySelectorAll(".botao-bebida").forEach(btn=>{
btn.classList.remove("bebidaSelecionada")
btn.innerText="Selecionar"
})


// ================================
// 🔥 SELECIONAR
// ================================

card.classList.add("selecionado")
botao.classList.add("bebidaSelecionada")
botao.innerText="✔ Selecionado"


// ================================
// 🔥 AVISA HOME
// ================================

if(typeof selecionarBebidaGlobal === "function"){
selecionarBebidaGlobal(b)
}


// animação leve
card.style.transform="scale(1.05)"

setTimeout(()=>{
card.style.transform=""
},200)

}

listaB.appendChild(card)

})

}



// ================================
// INICIAL
// ================================

document.addEventListener("DOMContentLoaded",()=>{
renderBebidas(4)
})



// ================================
// BOTÃO VER MAIS
// ================================

document.addEventListener("DOMContentLoaded",()=>{

const btn = document.getElementById("mostrarBebidas")
if(!btn) return

btn.onclick=()=>{

bebidasAberto=!bebidasAberto

if(bebidasAberto){
renderBebidas(bebidas.length)
btn.innerText="Mostrar menos"
}else{
renderBebidas(4)
btn.innerText="Ver mais bebidas"
}

}

})