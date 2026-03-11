// ================================
// INICIALIZAÇÃO DO SISTEMA
// ================================

document.addEventListener("DOMContentLoaded",()=>{

console.log("Sistema iniciado")

inicializarCardapio()
inicializarCarrinho()
verificarHorario()
iniciarAnimacoes()

})


// ================================
// CARREGAR CARDÁPIO
// ================================

function inicializarCardapio(){

if(typeof renderPizzas === "function"){
renderPizzas(3)
}

if(typeof renderBebidas === "function"){
renderBebidas(3)
}

}


// ================================
// ATUALIZAR CARRINHO
// ================================

function inicializarCarrinho(){

if(typeof atualizarCarrinhoLista === "function"){
atualizarCarrinhoLista()
}

}


// ================================
// VERIFICAR HORÁRIO DA PIZZARIA
// ================================

function verificarHorario(){

const status = document.getElementById("statusPizzaria")

if(!status) return

const agora = new Date()
const hora = agora.getHours()

const horaAbertura = 18
const horaFechamento = 22

if(hora >= horaAbertura && hora < horaFechamento){

status.innerText =
"🟢 Aberto agora • Entrega média 30–45 min"

}else{

status.innerText =
"🔴 Fechado no momento • Abrimos às 18:00"

}

}


// ================================
// INICIAR ANIMAÇÕES
// ================================

function iniciarAnimacoes(){

if(typeof animarScroll === "function"){
animarScroll()
}

}