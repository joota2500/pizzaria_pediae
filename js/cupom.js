// ================================
// SISTEMA DE CUPONS PROFISSIONAL
// ================================

let cupomAplicado = null



// ================================
// REGRAS DOS CUPONS
// ================================

const REGRAS_CUPOM = {

PIZZA10:{
desconto:10,
minimo:70
},

PIZZA20:{
desconto:20,
minimo:90
},

FRETEGRATIS:{
desconto:100,
minimo:70,
diasPermitidos:[1,2,3] // segunda terça quarta
}

}



// ================================
// TOAST BOOTSTRAP
// ================================

function toastCupom(msg,tipo="success"){

if(!window.bootstrap) return

const toast = document.createElement("div")

toast.className =
`toast align-items-center text-bg-${tipo} border-0 position-fixed bottom-0 end-0 m-3`

toast.innerHTML = `
<div class="d-flex">
<div class="toast-body">
${msg}
</div>
<button type="button"
class="btn-close btn-close-white me-2 m-auto"
data-bs-dismiss="toast">
</button>
</div>
`

document.body.appendChild(toast)

const t = new bootstrap.Toast(toast)

t.show()

setTimeout(()=>toast.remove(),4000)

}



// ================================
// CALCULAR SUBTOTAL
// ================================

function calcularSubtotal(){

if(typeof pedido === "undefined") return 0

let subtotal = 0

pedido.forEach(item=>{

const qtd = item.qtd || 1

subtotal += Number(item.preco) * Number(qtd)

})

return subtotal

}



// ================================
// APLICAR CUPOM
// ================================

function aplicarCupom(){

const campo = document.getElementById("cupom")

if(!campo) return

const codigo = campo.value.trim().toUpperCase()



// impedir duplicação

if(cupomAplicado){

toastCupom("Já existe um cupom aplicado","warning")
return

}



const regra = REGRAS_CUPOM[codigo]

if(!regra){

toastCupom("Cupom inválido","danger")
return

}



const subtotal = calcularSubtotal()



// ================================
// VERIFICAR VALOR MÍNIMO
// ================================

if(subtotal < regra.minimo){

toastCupom(
`Cupom válido apenas para pedidos acima de ${moeda(regra.minimo)}`,
"warning"
)

return

}



// ================================
// VERIFICAR DIA DA SEMANA
// ================================

if(regra.diasPermitidos){

const hoje = new Date().getDay()

if(!regra.diasPermitidos.includes(hoje)){

toastCupom(
"Cupom de frete grátis disponível apenas segunda, terça e quarta",
"warning"
)

return

}

}



// ================================
// SALVAR CUPOM
// ================================

cupomAplicado = {

codigo: codigo,

valor: regra.desconto

}



// mensagem específica

if(codigo === "FRETEGRATIS"){

toastCupom("Cupom de frete grátis aplicado 🚚")

}else{

toastCupom(`Cupom ${codigo} aplicado ✔`)

}



atualizarTotalComCupom()

}



// ================================
// REMOVER CUPOM
// ================================

function removerCupom(){

cupomAplicado = null

toastCupom("Cupom removido","info")

atualizarTotalComCupom()

}



// ================================
// ATUALIZAR TOTAL
// ================================

function atualizarTotalComCupom(){

if(typeof pedido === "undefined") return



let subtotal = calcularSubtotal()



// ================================
// FRETE
// ================================

let taxa = 0

const bairro = document.getElementById("bairro")

if(bairro){

taxa = calcularEntrega(bairro.value)

}



// ================================
// FRETE GRÁTIS
// ================================

if(cupomAplicado && cupomAplicado.codigo === "FRETEGRATIS"){

taxa = 0

const taxaElemento = document.getElementById("taxaEntrega")

if(taxaElemento){

taxaElemento.innerText = "Entrega: R$ 0,00"

}

}



// ================================
// DESCONTO
// ================================

let desconto = 0

if(cupomAplicado && cupomAplicado.valor < 100){

desconto = subtotal * (cupomAplicado.valor/100)

}



// ================================
// TOTAL FINAL
// ================================

let total = subtotal - desconto + taxa

total = parseFloat(total.toFixed(2))



// ================================
// ATUALIZAR TOTAL
// ================================

const totalElemento = document.getElementById("totalResumo")

if(totalElemento){

totalElemento.innerText = "Total: " + moeda(total)

}



// ================================
// MOSTRAR DESCONTO
// ================================

const cupomResumo = document.getElementById("cupomResumo")

if(cupomResumo){

if(cupomAplicado){

if(desconto > 0){

cupomResumo.innerHTML = `
<span class="text-success fw-semibold">
Cupom ${cupomAplicado.codigo}: - ${moeda(desconto)}
</span>
`

}

else if(cupomAplicado.codigo === "FRETEGRATIS"){

cupomResumo.innerHTML = `
<span class="text-success fw-semibold">
Cupom FRETEGRATIS aplicado 🚚
</span>
`

}

}else{

cupomResumo.innerHTML = ""

}

}

}