// ================================
// ESTADO GLOBAL
// ================================

let adicionaisSelecionados = []

// ================================
// DADOS
// ================================

const adicionais = [
{nome:"Queijo coalho", preco:2},
{nome:"Calabresa", preco:2},
{nome:"Carne de sol", preco:5},
{nome:"Frango", preco:3},
{nome:"Catupiry", preco:2},
{nome:"Cheddar", preco:2},
{nome:"Milho", preco:1},
{nome:"Bacon", preco:3},
{nome:"Ovo", preco:1},
{nome:"Muçarela", preco:2},
{nome:"Cebola", preco:1},
{nome:"Tomate", preco:1}
]


function formatarMoeda(valor){
  return Number(valor).toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL"
  })
}

// ================================
// ABRIR MODAL
// ================================

function abrirAdicionais(){

let pedido = window.pedidoAtual || JSON.parse(localStorage.getItem("pedidoAtual"))

if(!pedido){
console.warn("Pedido não encontrado")
return
}

window.pedidoAtual = pedido

adicionaisSelecionados = []

document.getElementById("modalAdicionais")?.classList.add("ativo")

renderAdicionais()
}

let indexAtual = 0
// ================================
// RENDER SELETOR
// ================================

function renderSeletorPizzas(){

const container = document.getElementById("seletorPizzas")
if(!container) return

container.innerHTML = ""

let pedido = window.pedidoAtual
if(!pedido || !pedido.itens) return

pedido.itens.forEach((item,i)=>{

if(item.tipo && !item.tipo.includes("pizza")) return

const div = document.createElement("div")

div.className = "pizza-tab " + (i === indexAtual ? "ativa" : "")

// 🔥 badge aqui dentro (CORRETO)
const qtdExtras = item.adicionais ? item.adicionais.length : 0

div.innerHTML = `
${item.nome || "Pizza"}
${qtdExtras > 0 ? `<span class="badge-adicional">${qtdExtras}</span>` : ""}
`

div.onclick = () => trocarPizza(i)

container.appendChild(div)

})

}

// ================================
// TROCAR PIZZA
// ================================

function trocarPizza(index){

  indexAtual = index

  // 🔥 carrega adicionais da pizza atual
  const pizza = window.pedidoAtual.itens[indexAtual]

  adicionaisSelecionados = pizza.adicionais
    ? [...pizza.adicionais]
    : []

  renderSeletorPizzas()
  renderAdicionais()
  renderResumoPizza()
  atualizarUIAdicionais()
  atualizarTotalGeral()

}
// ================================
//  PIZZA atual
// ================================

function renderResumoPizza(){

const el = document.getElementById("resumoPizza")

if(!el) return

let pedido = window.pedidoAtual

if(!pedido || !pedido.itens) return

let pizza = pedido.itens[indexAtual]
const extras = pizza.adicionais
  ? pizza.adicionais.reduce((t,a)=>t+a.preco,0)
  : 0

const total = (pizza.preco || 0) + extras
if(!pizza) return

el.innerHTML = `
<div class="item-resumo">
  <div class="linha-topo">
    <div class="item-info">
      <div class="item-nome">${pizza.nome}</div>
      <div class="item-desc">${pizza.ingredientes || ""}</div>
      <div class="item-qtd">Qtd: ${pizza.qtd || 1}</div>
    </div>
    <div class="item-preco">
      ${formatarMoeda(total)}
    </div>
  </div>
</div>
`

}

// ================================
// mensagem de adicionais maximo
// ================================

function mostrarToast(msg){

  const toast = document.createElement("div")
  toast.className = "toast-msg"
  toast.innerHTML = `⚠️ ${msg}`

  document.body.appendChild(toast)

  setTimeout(()=>{
    toast.classList.add("show")
  },100)

  setTimeout(()=>{
    toast.remove()
  },2000)

}

// ================================
// asicionais
// ================================


function adicionarAdicional(i){

  if(adicionaisSelecionados.length >= 3){
    mostrarToast("Máximo de 3 adicionais") // ✅ AGORA SIM
    return
  }

  adicionaisSelecionados.push(adicionais[i])

  const pizza = window.pedidoAtual.itens[indexAtual]
  pizza.adicionais = [...adicionaisSelecionados]

  atualizarUIAdicionais()
  renderSeletorPizzas()
  renderResumoPizza()
  atualizarTotalGeral()

}

// ================================
// CONTROLE
// ================================

function removerAdicional(i){

  const nome = adicionais[i].nome

  const index = adicionaisSelecionados.findIndex(a => a.nome === nome)

  if(index !== -1){
    adicionaisSelecionados.splice(index,1)
  }

  // 🔥 salva na pizza atual
  const pizza = window.pedidoAtual.itens[indexAtual]
  pizza.adicionais = [...adicionaisSelecionados]

  atualizarUIAdicionais()
  renderResumoPizza()
  atualizarTotalGeral()
}

// ================================
// Atualiza total geral
// ================================


function atualizarTotalGeral(){

let pedido = window.pedidoAtual
if(!pedido || !pedido.itens) return

let total = 0

pedido.itens.forEach(item=>{

let extras = item.adicionais
  ? item.adicionais.reduce((t,a)=>t+a.preco,0)
  : 0

total += (item.preco || 0) + extras

})

const el = document.getElementById("totalGeral")
if(el){
  el.innerText = formatarMoeda(total)
}

}

// ================================
// UI
// ================================

function atualizarUIAdicionais(){

adicionais.forEach((item,i)=>{

const qtd = adicionaisSelecionados.filter(a=>a.nome===item.nome).length

const el = document.getElementById(`qtd-${i}`)
if(el) el.innerText = qtd

})

const resumo = document.getElementById("resumoAdicional")

if(!resumo) return

if(adicionaisSelecionados.length === 0){
resumo.innerText="Nenhum adicional selecionado"
return
}

resumo.innerHTML = adicionaisSelecionados.map(a => `
  <div class="tag-adicional">
    ${a.nome}
  </div>
`).join("")
}

// ================================
// FINALIZAR (🔥 CORRIGIDO)
// ================================

function confirmarAdicionais(){

let totalExtras = 0

adicionaisSelecionados.forEach(a=>{
  totalExtras += a.preco
})

let pedido = JSON.parse(localStorage.getItem("pedidoAtual"))

if(!pedido || !pedido.itens) return


// ================================
// 🔥 PEGA A PIZZA ATUAL
// ================================

let pizza = pedido.itens[indexAtual]

if(!pizza) return

pizza.adicionais = [...adicionaisSelecionados]

pizza.precoFinal =
  (pizza.preco || 0) + totalExtras


// ================================
// SALVAR
// ================================

localStorage.setItem("pedidoAtual", JSON.stringify(pedido))

window.location.href = "confirmacao.html"
}

// ================================
// 🚀 MODO PÁGINA (NOVO)
// ================================

document.addEventListener("DOMContentLoaded", () => {

let pedido = JSON.parse(localStorage.getItem("pedidoAtual"))

if(!pedido){
  alert("Pedido não encontrado")
  window.location.href = "../index.html"
  return
}

window.pedidoAtual = pedido
adicionaisSelecionados = []
indexAtual = 0

const pizzaInicial = window.pedidoAtual.itens[0]

adicionaisSelecionados = pizzaInicial.adicionais
  ? [...pizzaInicial.adicionais]
  : []

// 🔥 render correto
renderSeletorPizzas()
renderResumoPizza()
renderAdicionais()

})

function renderAdicionais(){

const lista = document.getElementById("listaAdicionais")
if(!lista) return

lista.innerHTML = ""

adicionais.forEach((item,i)=>{

const qtdAtual = adicionaisSelecionados.filter(a=>a.nome === item.nome).length

const div = document.createElement("div")
div.className="item-adicional"

div.innerHTML = `
<span>${item.nome} (+${formatarMoeda(item.preco)})</span>

<div class="contador">
<button onclick="removerAdicional(${i})">−</button>
<span id="qtd-${i}">${qtdAtual}</span>
<button onclick="adicionarAdicional(${i})">+</button>
</div>
`

lista.appendChild(div)

})

}


function toggleAdicionais(){

  const lista = document.getElementById("listaAdicionais")
  const btn = document.querySelector(".btn-expandir")

  if(!lista) return

  const aberto = lista.classList.contains("ativo")

  lista.classList.toggle("ativo")

  if(btn){
    btn.innerText = aberto
      ? "Ver adicionais ▼"
      : "Ocultar adicionais ▲"
  }

}

window.toggleAdicionais = toggleAdicionais
// ================================
// GLOBAL
// ================================

window.abrirAdicionais = abrirAdicionais
window.adicionarAdicional = adicionarAdicional
window.removerAdicional = removerAdicional
window.confirmarAdicionais = confirmarAdicionais
window.fecharModal = fecharModal
window.pularAdicionais = pularAdicionais

function fecharModal(){}
function pularAdicionais(){}