// ================================
// INIT SISTEMA (OTIMIZADO)
// ================================

document.addEventListener("DOMContentLoaded",()=>{

console.log("Sistema iniciado")

try{
inicializarCardapio()
inicializarCarrinho()
verificarHorario()
iniciarAnimacoes()
}catch(e){
console.warn("Erro na inicialização:",e)
}

})

// ================================
// CARDÁPIO
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
// CARRINHO
// ================================

function inicializarCarrinho(){

if(typeof atualizarCarrinhoLista === "function"){
atualizarCarrinhoLista()
}

}

// ================================
// HORÁRIO
// ================================

function verificarHorario(){

const status = document.getElementById("statusPizzaria")
if(!status) return

const hora = new Date().getHours()

const aberto = hora >= 18 && hora < 22

status.innerText = aberto
? "🟢 Aberto agora • Entrega média 30–45 min"
: "🔴 Fechado • Abrimos às 18:00"

}

// ================================
// ANIMAÇÕES
// ================================

function iniciarAnimacoes(){

if(typeof animarScroll === "function"){
animarScroll()
}

}