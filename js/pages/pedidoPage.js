// ==========================
// INIT (🔥 CORREÇÃO PRINCIPAL)
// ==========================

document.addEventListener("DOMContentLoaded", () => {


// ==========================
// CARREGAR PEDIDO
// ==========================

const data = JSON.parse(localStorage.getItem("pedidoAtual"))

// 🔥 aceita os dois formatos
let pedido = []

if(Array.isArray(data)){
  pedido = data
}else if(data?.itens){
  pedido = data.itens
}
console.log("DADOS FINAL:", pedido)


// ==========================
// FORMATAR
// ==========================

function moeda(v){
return Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})
}


// ==========================
// AUTO CLIENTE
// ==========================

const clienteSalvo = JSON.parse(localStorage.getItem("cliente"))

if(clienteSalvo){
document.getElementById("nome").value = clienteSalvo.nome || ""
document.getElementById("telefone").value = clienteSalvo.telefone || ""
}


// ==========================
// MÁSCARA TELEFONE
// ==========================

const telefoneInput = document.getElementById("telefone")

if(telefoneInput){
telefoneInput.addEventListener("input",()=>{

let v = telefoneInput.value.replace(/\D/g,"")

if(v.length > 11) v = v.slice(0,11)

v = v.replace(/^(\d{2})(\d)/g,"($1) $2")
v = v.replace(/(\d{5})(\d)/,"$1-$2")

telefoneInput.value = v

})
}


// ==========================
// ESTADO
// ==========================

let tipoEntrega = null
let subtotal = 0
let taxaEntrega = 0


// ==========================
// CALCULAR SUBTOTAL
// ==========================

pedido.forEach(item => {
    console.log("ITEM COMPLETO:", item)

const qtd = Number(item.qtd || item.quantidade || 1)
const preco = Number(item.preco || item.precoTotal || item.valor || 0)

subtotal += preco * qtd

})

const elSubtotal = document.getElementById("subtotalResumo")

if(elSubtotal){
  elSubtotal.innerText = "Subtotal: " + moeda(subtotal)
}


// ==========================
// ATUALIZAR TOTAL (🔥 COM CUPOM)
// ==========================

function atualizarTotal(){

let desconto = 0

if(window.cupomAplicado){

if(cupomAplicado.valor < 100){
desconto = subtotal * (cupomAplicado.valor/100)
}

if(cupomAplicado.codigo === "FRETEGRATIS"){
taxaEntrega = 0
const elTaxa = document.getElementById("taxaEntrega")

if(elTaxa){
  elTaxa.innerText = "Entrega: R$ 0,00"
}
}

}

const total = subtotal - desconto + taxaEntrega

const elTotal = document.getElementById("totalResumo")

if(elTotal){
  elTotal.innerText = "Total: " + moeda(total)
}

}

atualizarTotal()

// ==========================
// 🧾 RENDER DO RESUMO (🔥 ESSENCIAL)
// ==========================
const pizzaResumo = document.getElementById("pizzaResumo")

if(pizzaResumo){

pizzaResumo.innerHTML = "" // limpa antes

pedido.forEach(item => {

const nome = item.nome || item.titulo || item.nomeProduto || "Item"
const nome2 = item.nome2 || ""
const qtd = item.qtd || item.quantidade || 1
const preco = item.preco || item.precoTotal || item.valor || 0

pizzaResumo.innerHTML += `
<div class="item-resumo">

  <div class="linha-topo">

    <div class="item-info">
      <div class="item-nome">
        ${nome}${nome2 ? " / " + nome2 : ""}
      </div>

      <div class="item-desc">
        ${item.ingredientes || ""}
      </div>

      <div class="item-qtd">
        Qtd: ${qtd}
      </div>
    </div>

    <div class="item-preco">
      ${moeda(preco * qtd)}
    </div>

  </div>

</div>
`

})

}


// ==========================
// TIPO ENTREGA (🔥 CORRIGIDO)
// ==========================

const radios = document.querySelectorAll('input[name="tipoEntrega"]')

radios.forEach(radio => {

radio.addEventListener("change", () => {

tipoEntrega = radio.value

document.getElementById("formEntrega")
.classList.toggle("hidden", tipoEntrega !== "casa")

document.getElementById("retiradaBox")
.classList.toggle("hidden", tipoEntrega !== "retirada")

taxaEntrega = 0
const elTaxa = document.getElementById("taxaEntrega")

if(elTaxa){
  elTaxa.innerText = "Entrega: R$ 0,00"
}

atualizarTotal()

})

})


// ==========================
// BAIRRO (🔥 INTEGRADO COM entrega.js)
// ==========================

const selectBairro = document.getElementById("bairro")

if(selectBairro){

selectBairro.addEventListener("change",()=>{

const bairro = selectBairro.value

taxaEntrega = bairro ? Number(calcularEntrega(bairro)) : 0

mostrarTaxaEntrega(bairro)
atualizarTotal()

})

}


// ==========================
// TROCO
// ==========================

const pagamento = document.getElementById("pagamento")

if(pagamento){

pagamento.addEventListener("change",()=>{

document.getElementById("areaTroco")
.classList.toggle("hidden", pagamento.value !== "dinheiro")

})

}


// ==========================
// VALIDAÇÃO
// ==========================

function validarCampos(){

if(!tipoEntrega){
alert("Selecione entrega ou retirada")
return false
}

if(tipoEntrega === "casa"){

const campos=["nome","telefone","endereco","bairro","pagamento"]

let valido=true

campos.forEach(id=>{

const campo=document.getElementById(id)

if(!campo.value){
campo.classList.add("is-invalid")
valido=false
}else{
campo.classList.remove("is-invalid")
}

})

return valido

}

if(tipoEntrega === "retirada"){

const nome=document.getElementById("nome").value
const pagamento=document.getElementById("pagamento").value

if(!nome || !pagamento){
alert("Preencha nome e pagamento")
return false
}

}

return true

}


// ==========================
// LOADING
// ==========================

function ativarLoading(){

const botao = document.querySelector(".btn-principal")

if(botao){
  botao.innerText = "Enviando..."
}

}


// ==========================
// CONFIRMAR
// ==========================

window.confirmarEnvio = function(){

if(!validarCampos()) return



}


// ==========================
// ENVIAR
// ==========================

window.enviarPedido = function(){

if(!validarCampos()) return

ativarLoading()

const feedback = document.getElementById("feedbackPedido") || null
if(feedback){
  feedback.classList.remove("hidden")
}


// ==========================
// DADOS CLIENTE
// ==========================

const nome=document.getElementById("nome").value || "Não informado"
let tel=(document.getElementById("telefone").value || "").replace(/\D/g,"")

const endereco=document.getElementById("endereco").value
const bairro=document.getElementById("bairro").value

const pagamento=document.getElementById("pagamento").value
const troco=document.getElementById("troco").value

const obs=document.getElementById("obsFinal").value


// SALVAR CLIENTE
localStorage.setItem("cliente", JSON.stringify({
nome,
telefone: document.getElementById("telefone").value
}))


// ==========================
// ITENS
// ==========================

let itens=""

pedido.forEach(i=>{

let linha=`🍕 ${i.nome}`

if(i.nome2) linha+=` / ${i.nome2}`
if(i.tamanho) linha+=` (${i.tamanho})`

linha+=`\nQtd: ${i.qtd}`
const precoItem = i.preco || i.precoTotal || i.valor || 0
const qtdItem = i.qtd || i.quantidade || 1

linha+=`\nSubtotal: ${moeda(precoItem * qtdItem)}\n\n`

itens+=linha

})


// ==========================
// TOTAL FINAL
// ==========================

let desconto = 0

if(window.cupomAplicado && cupomAplicado.valor < 100){
desconto = subtotal * (cupomAplicado.valor/100)
}

const total = subtotal - desconto + taxaEntrega


// ==========================
// MENSAGEM
// ==========================

let msg=`🍕 *NOVO PEDIDO*

👤 Cliente: ${nome}
📞 Telefone: ${tel || "Não informado"}

`

if(tipoEntrega === "casa"){
msg+=`📍 Entrega:
${endereco}
Bairro: ${bairro}

`
}else{
msg+=`🏪 Retirada no local

`
}

msg+=`🧾 Pedido:
${itens}

💳 Pagamento: ${pagamento}
💰 Troco: ${troco || "Não precisa"}

📝 Observação:
${obs || "Nenhuma"}

🚚 Entrega: ${moeda(taxaEntrega)}
💰 Total: ${moeda(total)}
`


// ==========================
// ANIMAÇÃO
// ==========================

const mensagens = [
"🍕 Preparando seu pedido...",
"📡 Conectando...",
"🧾 Organizando...",
"❤️ Obrigado!",
"📲 Abrindo WhatsApp..."
]

let i=0

function animar(){
if(feedback){
feedback.innerHTML = `
<div class="spinner-border text-warning mb-3"></div>
<h5>${mensagens[i]}</h5>
`
}

i++
if(i<mensagens.length){
setTimeout(animar,900)
}
}

animar()


// ==========================
// WHATSAPP
// ==========================

setTimeout(()=>{
fecharModalPedido()
const url=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`

window.location.href=url

localStorage.removeItem("pedidoAtual")

},4500)

}

})