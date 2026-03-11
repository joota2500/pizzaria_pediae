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

if(!status) return


if(pizzariaAberta()){

status.innerText =
"🟢 Aberto agora • Entrega média " + CONFIG.tempoEntrega

}else{

status.innerText =
"🔴 Fechado • abre às " + CONFIG.horario.abre

}

}



// -------------------------------
// INICIAR VERIFICAÇÃO
// -------------------------------

document.addEventListener("DOMContentLoaded",()=>{

atualizarStatusPizzaria()

// atualizar a cada minuto
setInterval(atualizarStatusPizzaria,60000)

})