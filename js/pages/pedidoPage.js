// ==========================
// CARREGAR PEDIDO
// ==========================

const pedido = JSON.parse(localStorage.getItem("pedido")) || []

if(pedido.length === 0){
alert("Nenhum pedido encontrado")
window.location.href="../index.html"
}



// ==========================
// FORMATAR MOEDA
// ==========================

function moeda(v){
return Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})
}



// ==========================
// AUTO PREENCHER CLIENTE 🔥
// ==========================

const clienteSalvo = JSON.parse(localStorage.getItem("cliente"))

if(clienteSalvo){
document.getElementById("nome").value = clienteSalvo.nome || ""
document.getElementById("telefone").value = clienteSalvo.telefone || ""
}



// ==========================
// MÁSCARA TELEFONE 🔥
// ==========================

const telefoneInput = document.getElementById("telefone")

telefoneInput.addEventListener("input",()=>{

let v = telefoneInput.value.replace(/\D/g,"")

if(v.length > 11) v = v.slice(0,11)

v = v.replace(/^(\d{2})(\d)/g,"($1) $2")
v = v.replace(/(\d{5})(\d)/,"$1-$2")

telefoneInput.value = v

})



// ==========================
// TIPO ENTREGA
// ==========================

let tipoEntrega = null

document.querySelectorAll('input[name="tipoEntrega"]').forEach(r=>{

r.addEventListener("change",()=>{

tipoEntrega = r.value

document.getElementById("formEntrega")
.classList.toggle("hidden", tipoEntrega !== "casa")

document.getElementById("retiradaBox")
.classList.toggle("hidden", tipoEntrega !== "retirada")

taxaEntrega = 0
document.getElementById("taxaEntrega").innerText="Entrega: R$ 0,00"

atualizarTotal()

})

})



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

document.getElementById("areaTroco")
.classList.toggle("hidden", forma !== "dinheiro")

})



// ==========================
// VALIDAR CAMPOS
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
// BOTÃO LOADING 🔥
// ==========================

function ativarLoading(){

document.getElementById("textoBotao").innerText="Enviando..."
document.getElementById("loader").style.display="inline-block"

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

ativarLoading()

const feedback=document.getElementById("feedbackPedido")

const modal=new bootstrap.Modal(
document.getElementById("modalFeedbackPedido")
)

modal.show()



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



// 🔥 SALVAR CLIENTE
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
linha+=`\nSubtotal: ${moeda(i.preco*i.qtd)}\n\n`

itens+=linha

})



// ==========================
// TOTAL
// ==========================

let desconto = 0

if(typeof cupomAplicado !== "undefined" && cupomAplicado){

if(cupomAplicado.valor < 100){
desconto = subtotal * (cupomAplicado.valor/100)
}

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
Bairro: ${CONFIG.bairros[bairro]}

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
"📡 Conectando com a pizzaria...",
"🧾 Organizando tudo...",
"❤️ Obrigado!",
"📲 Abrindo WhatsApp..."
]

let i=0

function animar(){
feedback.innerHTML=`
<div class="spinner-border text-danger mb-3"></div>
<h5>${mensagens[i]}</h5>
`

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

const url=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`

window.location.href=url

localStorage.removeItem("pedido")

},4500)

}