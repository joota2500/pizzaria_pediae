// ==========================
// CARREGAR PEDIDO
// ==========================

const pedido = JSON.parse(localStorage.getItem("pedido")) || []

if(pedido.length === 0){
alert("Nenhum pedido encontrado")
window.location.href="index.html"
}



// ==========================
// FORMATAR MOEDA
// ==========================

function moeda(v){
return Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})
}



// ==========================
// CALCULAR SUBTOTAL
// ==========================

let subtotal = 0
let taxaEntrega = 0

pedido.forEach(item=>{
const qtd = Number(item.qtd || 1)
subtotal += Number(item.preco) * qtd
})

document.getElementById("subtotalResumo").innerText="Subtotal: "+moeda(subtotal)



// ==========================
// ATUALIZAR TOTAL
// ==========================

function atualizarTotal(){

let desconto = 0

if(typeof cupomAplicado !== "undefined" && cupomAplicado){

if(cupomAplicado.valor < 100){

desconto = subtotal * (cupomAplicado.valor/100)

}

}

const total = subtotal - desconto + taxaEntrega

document.getElementById("totalResumo").innerText="Total: "+moeda(total)

}

atualizarTotal()



// ==========================
// BAIRROS
// ==========================

const selectBairro=document.getElementById("bairro")

Object.keys(CONFIG.bairros).forEach(b=>{

const opt=document.createElement("option")
opt.value=b
opt.innerText=CONFIG.bairros[b]

selectBairro.appendChild(opt)

})



selectBairro.addEventListener("change",()=>{

const bairro=selectBairro.value

taxaEntrega = bairro ? Number(calcularEntrega(bairro)) : 0

document.getElementById("taxaEntrega").innerText="Entrega: "+moeda(taxaEntrega)

atualizarTotal()

})



// ==========================
// TROCO
// ==========================

document.getElementById("pagamento").addEventListener("change",()=>{

const forma=document.getElementById("pagamento").value

document.getElementById("areaTroco").style.display =
forma==="dinheiro" ? "block" : "none"

})



// ==========================
// VALIDAR CAMPOS
// ==========================

function validarCampos(){

const campos=[
"nome",
"telefone",
"endereco",
"bairro",
"pagamento"
]

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



// ==========================
// CONFIRMAR ENVIO
// ==========================

function confirmarEnvio(){

if(!validarCampos()) return

const modal=new bootstrap.Modal(document.getElementById("modalConfirmar"))
modal.show()

}



// ==========================
// ENVIAR PEDIDO
// ==========================

function enviarPedido(){

const feedback=document.getElementById("feedbackPedido")

const modal=new bootstrap.Modal(
document.getElementById("modalFeedbackPedido")
)

modal.show()



feedback.innerHTML=`
<div class="spinner-border text-danger mb-3"
style="width:3rem;height:3rem"></div>

<h5 class="fw-bold">Enviando pedido...</h5>
<p class="text-muted">Aguarde um instante</p>
`



// ==========================
// DADOS CLIENTE
// ==========================

const nome=document.getElementById("nome").value
let tel=document.getElementById("telefone").value.replace(/\D/g,"")

const endereco=document.getElementById("endereco").value
const bairro=document.getElementById("bairro").value

const pagamento=document.getElementById("pagamento").value
const troco=document.getElementById("troco").value

const obs=document.getElementById("obsFinal").value



// ==========================
// ITENS DO PEDIDO
// ==========================

let itens=""

pedido.forEach(i=>{

let linha=`🍕 ${i.nome}`

if(i.nome2) linha+=` / ${i.nome2}`

if(i.tamanho) linha+=` (${i.tamanho})`

linha+=`\nQtd: ${i.qtd}`

linha+=`\nSubtotal: ${moeda(i.preco*i.qtd)}\n\n`

itens+=linha

})



// ==========================
// CUPOM
// ==========================

let desconto = 0
let cupomTexto = ""

if(typeof cupomAplicado !== "undefined" && cupomAplicado){

if(cupomAplicado.codigo === "FRETEGRATIS"){

cupomTexto = `
🎟 Cupom: FRETEGRATIS
🚚 Frete grátis aplicado
`

}

else if(cupomAplicado.valor < 100){

desconto = subtotal * (cupomAplicado.valor/100)

cupomTexto = `
🎟 Cupom: ${cupomAplicado.codigo}
💸 Desconto: ${moeda(desconto)}
`

}

}



// ==========================
// TOTAL FINAL
// ==========================

const total = subtotal - desconto + taxaEntrega



// ==========================
// MENSAGEM WHATSAPP
// ==========================

let msg=`🍕 *NOVO PEDIDO*

👤 Cliente: ${nome}

📞 Telefone: ${tel}

📍 Endereço:
${endereco}
Bairro: ${CONFIG.bairros[bairro]}

🧾 Pedido:
${itens}

${cupomTexto}

💳 Pagamento: ${pagamento}

💰 Troco: ${troco||"Não precisa"}

📝 Observação:
${obs}

🚚 Entrega: ${moeda(taxaEntrega)}

💰 Total: ${moeda(total)}
`



// ==========================
// FEEDBACK VISUAL
// ==========================

setTimeout(()=>{

feedback.innerHTML=`
<div class="fs-1 mb-3">🍕</div>

<h5 class="fw-bold">Pedido enviado!</h5>

<p class="text-muted mb-2">
Tempo médio de entrega: <strong>30 a 50 minutos</strong>
</p>

<p class="text-muted">
A pizzaria irá confirmar seu pedido no WhatsApp.
</p>

<p class="small text-muted mt-2">
Abrindo WhatsApp...
</p>
`

},2000)



// ==========================
// ABRIR WHATSAPP
// ==========================

setTimeout(()=>{

const url=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`

window.location.href=url

// limpar carrinho

localStorage.removeItem("carrinho")
localStorage.removeItem("pedido")

},5000)

}