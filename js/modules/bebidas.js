/*
========================================
📄 ARQUIVO: bebidas.js

📌 FUNÇÃO:
Renderiza bebidas com seleção múltipla (multi-select),
mantém estado visual sincronizado com o carrinho.

🔗 DEPENDE DE:
- carrinho.js
- utils

📍 USADO EM:
- index.html

🧠 OBS:
Agora mantém seleção mesmo ao re-renderizar (ver mais)
e sincroniza com o carrinho corretamente.
========================================
*/


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
// RENDER (🔥 CORRIGIDO)
// ================================

function renderBebidas(qtd){

const listaB = document.getElementById("lista-bebidas")
if(!listaB) return

listaB.innerHTML=""

bebidas.slice(0,qtd).forEach(b=>{

let nomeImagem = limparNomeImagem(b.nome)

// 🔥 VERIFICA NO CARRINHO
const selecionada = carrinho.some(item =>
item.nome === b.nome && item.tipo === "bebida"
)

const card = document.createElement("article")
card.className="pizza-card bebida-card"

card.innerHTML=`
<img src="img/bebidas/imgBebida${nomeImagem}.jpg"
onerror="this.src='img/bebidas/imgBebidaCocaColaLata.jpg'">
<h3>${b.nome}</h3>
<p class="ingredientes">${formatarMoeda(b.preco)}</p>
<button class="botao-bebida">
${selecionada ? "✔ Selecionado" : "Selecionar"}
</button>
`

const botao = card.querySelector("button")


// ================================
// 🔥 APLICA ESTADO VISUAL
// ================================

if(selecionada){
card.classList.add("selecionado")
botao.classList.add("bebidaSelecionada")
}


// ================================
// CLICK MULTI SELECT
// ================================

botao.onclick = ()=>{

const jaExiste = carrinho.find(item =>
item.nome === b.nome && item.tipo === "bebida"
)


// ❌ REMOVER
if(jaExiste){

carrinho = carrinho.filter(item =>
!(item.nome === b.nome && item.tipo === "bebida")
)

// 🔥 RE-RENDER (ESSENCIAL)
renderBebidas(bebidasAberto ? bebidas.length : 4)

atualizarCarrinhoLista()
notificar("Bebida removida","warning")

return
}


// ➕ ADICIONAR
adicionarCarrinho({
tipo:"bebida",
nome:b.nome,
preco:b.preco
}, botao)


// 🔥 RE-RENDER (GARANTE SINCRONIA)
renderBebidas(bebidasAberto ? bebidas.length : 4)

}

listaB.appendChild(card)

})

}



// ================================
// INIT
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



// ================================
// 🔥 FORÇAR ATUALIZAÇÃO GLOBAL
// ================================

window.renderBebidas = renderBebidas