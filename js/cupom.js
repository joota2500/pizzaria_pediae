// ================================
// SISTEMA DE CUPONS PROFISSIONAL
// ================================

let cupomAplicado = null



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
// CALCULAR SUBTOTAL DO PEDIDO
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



// verificar cupom

const desconto = CONFIG.cupons[codigo]

if(!desconto){

toastCupom("Cupom inválido","danger")

return

}



// salvar cupom

cupomAplicado = {

codigo: codigo,

valor: desconto

}



toastCupom(`Cupom ${codigo} aplicado ✔`)

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
// ATUALIZAR TOTAL COM CUPOM
// ================================

function atualizarTotalComCupom(){

if(typeof pedido === "undefined") return



let subtotal = calcularSubtotal()



// pegar frete atual

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
// ATUALIZAR INTERFACE
// ================================

const totalElemento = document.getElementById("totalResumo")

if(totalElemento){

if(typeof moeda === "function"){

totalElemento.innerText = "Total: " + moeda(total)

}else{

totalElemento.innerText = "Total: R$ " + total

}

}



// mostrar desconto

const cupomResumo = document.getElementById("cupomResumo")

if(cupomResumo){

if(cupomAplicado){

cupomResumo.innerHTML =
`Cupom ${cupomAplicado.codigo} aplicado`

}else{

cupomResumo.innerHTML = ""

}

}

}