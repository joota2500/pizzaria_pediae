// ================================
// DADOS DE ENTREGA (🔥 CENTRALIZADO)
// ================================

const BAIRROS_ENTREGA = [

{nome:"Mondego", taxa:5},
{nome:"Conjunto São Francisco", taxa:5},
{nome:"Vila Nova", taxa:5},

{nome:"Centro", taxa:5},
{nome:"Putiu", taxa:6},
{nome:"Conjunto Esperança", taxa:8},
{nome:"Alto Alegre", taxa:8},
{nome:"Conjunto Maria José Viana", taxa:7},
{nome:"Sambarrão", taxa:6},

{nome:"Manga", taxa:5},
{nome:"Mucunã", taxa:6},
{nome:"Alto da Cruz", taxa:5},
{nome:"Raposa", taxa:5},
{nome:"Oiticica", taxa:7},

{nome:"Proubi", taxa:7},
{nome:"Coió de Cima", taxa:6},
{nome:"Coió de Baixo", taxa:6},
{nome:"Coió do Meio", taxa:6},

{nome:"Larges", taxa:4},
{nome:"Areias", taxa:5},
{nome:"Candeia Boa Vista", taxa:8},
{nome:"Beira Rio", taxa:6},
{nome:"Jordão", taxa:8}

]



// ================================
// NORMALIZAR
// ================================

function normalizarBairro(nome){
return nome
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"")
.replaceAll(" ","")
}



// ================================
// CALCULAR TAXA
// ================================

function calcularEntrega(bairro){

if(!bairro) return 0

const chave = normalizarBairro(bairro)

const encontrado = BAIRROS_ENTREGA.find(b =>
normalizarBairro(b.nome) === chave
)

return encontrado ? encontrado.taxa : 0

}



// ================================
// FORMATAR
// ================================

function formatarDinheiro(valor){
return Number(valor).toLocaleString("pt-BR",{
style:"currency",
currency:"BRL"
})
}



// ================================
// MOSTRAR TAXA
// ================================

function mostrarTaxaEntrega(bairro){

  const elTaxa = document.getElementById("taxaEntrega")

  if(elTaxa){
    elTaxa.innerText = "Entrega: R$ " + calcularEntrega(bairro)
  }

}



// ================================
// TOTAL
// ================================

function atualizarTotalEntrega(){

const bairroSelect = document.getElementById("bairro")
const totalElemento = document.getElementById("totalResumo")

if(!bairroSelect || !totalElemento) return

const bairro = bairroSelect.value
const taxa = calcularEntrega(bairro)

let subtotal = 0

if(typeof pedido !== "undefined"){

pedido.forEach(item=>{
const qtd = item.qtd || 1
subtotal += Number(item.preco) * qtd
})

}

const total = subtotal + taxa

totalElemento.innerText = "Total: " + formatarDinheiro(total)

}



// ================================
// PREENCHER SELECT
// ================================

function carregarBairros(){

const select = document.getElementById("bairro")

if(!select) return

select.innerHTML = `<option value="">Selecione seu bairro</option>`

BAIRROS_ENTREGA.forEach(bairro=>{

const option = document.createElement("option")

option.value = bairro.nome
option.innerText = bairro.nome

select.appendChild(option)

})

}



// ================================
// EVENTO
// ================================

document.addEventListener("DOMContentLoaded",()=>{

carregarBairros()

const select = document.getElementById("bairro")

if(select){

select.addEventListener("change",()=>{

const bairro = select.value

mostrarTaxaEntrega(bairro)
atualizarTotalEntrega()

})

}

})