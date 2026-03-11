// ================================
// SISTEMA DE CUPONS
// ================================

let cupomAplicado = null



// -------------------------------
// APLICAR CUPOM
// -------------------------------

function aplicarCupom(){

const campo = document.getElementById("cupom")

if(!campo) return

const codigo = campo.value.trim().toUpperCase()


// impedir duplicação

if(cupomAplicado){

alert("Já existe um cupom aplicado")
return

}


// verificar cupom no CONFIG

const desconto = CONFIG.cupons[codigo]

if(!desconto){

alert("Cupom inválido")
return

}


// salvar cupom

cupomAplicado = {
codigo: codigo,
valor: desconto
}

alert("Cupom aplicado: " + codigo)

atualizarTotalComCupom()

}



// -------------------------------
// REMOVER CUPOM
// -------------------------------

function removerCupom(){

cupomAplicado = null

alert("Cupom removido")

atualizarTotalComCupom()

}



// -------------------------------
// ATUALIZAR TOTAL COM CUPOM
// -------------------------------

function atualizarTotalComCupom(){

if(typeof pedido === "undefined") return


// pegar total base

let total = pedido.total || 0


// aplicar cupom

if(cupomAplicado){

// cupom de porcentagem

if(cupomAplicado.valor < 100){

total = total * (1 - cupomAplicado.valor/100)

}


// cupom frete grátis

if(cupomAplicado.codigo === "FRETEGRATIS"){

const taxaElemento = document.getElementById("taxaEntrega")

if(taxaElemento){

taxaElemento.innerText = "Entrega: R$ 0"

}

}

}


// limitar casas decimais

total = parseFloat(total.toFixed(2))


// atualizar interface

const totalElemento = document.getElementById("totalResumo")

if(totalElemento){

if(typeof formatarMoeda === "function"){

totalElemento.innerText = "Total: " + formatarMoeda(total)

}else{

totalElemento.innerText = "Total: R$ " + total

}

}

}