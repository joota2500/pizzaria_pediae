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



// ================================
// ABRIR MODAL
// ================================

function abrirAdicionais(){

if(!window.pedidoAtual) return

adicionaisSelecionados = [] // reset

document.getElementById("modalAdicionais")?.classList.add("ativo")

renderAdicionais()

}



// ================================
// RENDER
// ================================

function renderAdicionais(){

const lista = document.getElementById("listaAdicionais")
if(!lista) return

lista.innerHTML=""

adicionais.forEach((item,i)=>{

const div = document.createElement("div")
div.className="item-adicional"

div.innerHTML = `
<span>${item.nome} (+${formatarMoeda(item.preco)})</span>

<div class="contador">
<button onclick="removerAdicional(${i})">−</button>
<span id="qtd-${i}">0</span>
<button onclick="adicionarAdicional(${i})">+</button>
</div>
`

lista.appendChild(div)

})

}



// ================================
// CONTROLE
// ================================

function adicionarAdicional(i){

if(adicionaisSelecionados.length >= 3){
notificar?.("⚠️ Máximo 3 adicionais","warning")
return
}

adicionaisSelecionados.push(adicionais[i])

atualizarUIAdicionais()
}

function removerAdicional(i){

const nome = adicionais[i].nome

const index = adicionaisSelecionados.findIndex(a=>a.nome===nome)

if(index !== -1){
adicionaisSelecionados.splice(index,1)
}

atualizarUIAdicionais()
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

resumo.innerText = adicionaisSelecionados.map(a=>a.nome).join(", ")

}



// ================================
// FINALIZAR 🔥 (V3 COMPATÍVEL)
// ================================

function confirmarAdicionais(){

let totalExtras = 0

adicionaisSelecionados.forEach(a=>{
totalExtras += a.preco
})

// 🔥 atualiza pedidoAtual (funciona pra pizza 1 e 2)
window.pedidoAtual.adicionais = adicionaisSelecionados
window.pedidoAtual.precoFinal =
(window.pedidoAtual.preco || 0) + totalExtras

localStorage.setItem("pedidoAtual", JSON.stringify(window.pedidoAtual))

window.location.href = "confirmacao.html"

}



// ================================
// AÇÕES
// ================================

function fecharModal(){
document.getElementById("modalAdicionais")?.classList.remove("ativo")
}

function pularAdicionais(){
confirmarAdicionais()
}

function toggleAdicionais(){
document.getElementById("listaAdicionais")?.classList.toggle("ativo")
}



// ================================
// GLOBAL
// ================================

window.abrirAdicionais = abrirAdicionais
window.adicionarAdicional = adicionarAdicional
window.removerAdicional = removerAdicional
window.confirmarAdicionais = confirmarAdicionais
window.fecharModal = fecharModal
window.pularAdicionais = pularAdicionais
window.toggleAdicionais = toggleAdicionais