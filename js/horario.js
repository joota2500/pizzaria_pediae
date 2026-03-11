// ================================
// SISTEMA DE HORÁRIO DA PIZZARIA
// ================================



// -------------------------------
// CONVERTER HORA "18:30" PARA MINUTOS
// -------------------------------

function horaParaMinutos(hora){

const partes = hora.split(":")

const h = parseInt(partes[0])
const m = parseInt(partes[1])

return h * 60 + m

}



// -------------------------------
// PEGAR HORÁRIOS DO CONFIG
// -------------------------------

const ABERTURA = horaParaMinutos(CONFIG.horario.abre)
const FECHAMENTO = horaParaMinutos(CONFIG.horario.fecha)



// -------------------------------
// VERIFICAR SE ESTÁ ABERTO
// -------------------------------

function pizzariaAberta(){

const agora = new Date()

const minutosAgora =
agora.getHours() * 60 + agora.getMinutes()

return minutosAgora >= ABERTURA &&
minutosAgora < FECHAMENTO

}



// -------------------------------
// ATUALIZAR STATUS VISUAL
// -------------------------------

function atualizarStatusPizzaria(){

const status = document.querySelector(".status-pizzaria")

const botaoPedido = document.getElementById("btnEnviar")

if(!status) return



// ================================
// PIZZARIA ABERTA
// ================================

if(pizzariaAberta()){

status.innerHTML = `
<div class="d-flex justify-content-center">

<div class="alert alert-success d-inline-flex align-items-center gap-2 shadow-sm px-3 py-1 mb-2"
style="max-width:360px;font-size:14px;border-radius:8px">

<span style="font-size:14px">🟢</span>

<strong>Aberto agora</strong>

<span class="small text-muted">
• ${CONFIG.tempoEntrega}
</span>

</div>

</div>
`


// habilitar botão

if(botaoPedido){

botaoPedido.disabled = false

botaoPedido.innerHTML = `
<span id="textoBotao">FINALIZAR PEDIDO</span>
<span id="loader" class="spinner-border spinner-border-sm" style="display:none"></span>
`

}

}



// ================================
// PIZZARIA FECHADA
// ================================

else{

status.innerHTML = `
<div class="d-flex justify-content-center">

<div class="alert alert-danger d-inline-flex align-items-center gap-2 shadow-sm px-3 py-1 mb-2"
style="max-width:360px;font-size:14px;border-radius:8px">

<span style="font-size:14px">🔴</span>

<strong>Pizzaria fechada</strong>

<span class="small">
• abre às ${CONFIG.horario.abre}
</span>

</div>

</div>
`


// bloquear botão

if(botaoPedido){

botaoPedido.disabled = true

botaoPedido.innerHTML = `
PEDIDOS INDISPONÍVEIS
`

}

}

}



// -------------------------------
// BLOQUEAR ENVIO SE FECHADO
// -------------------------------

function verificarAntesDeEnviar(){

if(!pizzariaAberta()){

if(typeof toastCupom === "function"){

toastCupom("A pizzaria está fechada no momento","warning")

}else{

alert("A pizzaria está fechada no momento")

}

return false

}

return true

}



// -------------------------------
// INICIAR VERIFICAÇÃO
// -------------------------------

document.addEventListener("DOMContentLoaded",()=>{

atualizarStatusPizzaria()

// atualizar a cada minuto
setInterval(atualizarStatusPizzaria,60000)

})