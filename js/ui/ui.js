// ================================
// UI - CONTROLE DE INTERFACE
// ================================

document.addEventListener("DOMContentLoaded",()=>{

// ================================
// BOTÃO VOLTAR AO TOPO
// ================================

const btnTopo = document.createElement("div")

btnTopo.innerHTML = "⬆"
btnTopo.className = "botao-topo"
btnTopo.style.display = "none"

document.body.appendChild(btnTopo)

btnTopo.addEventListener("click",()=>{

window.scrollTo({
top:0,
behavior:"smooth"
})

})

window.addEventListener("scroll",()=>{

if(window.scrollY > 500){

btnTopo.style.display = "flex"

}else{

btnTopo.style.display = "none"

}

})



// ================================
// ANIMAÇÃO SUAVE NOS CARDS
// ================================

document.addEventListener("mouseover",(e)=>{

const card = e.target.closest(".pizza-card")

if(!card) return

card.style.transition = "transform 0.2s ease"
card.style.transform = "translateY(-6px)"

})

document.addEventListener("mouseout",(e)=>{

const card = e.target.closest(".pizza-card")

if(!card) return

card.style.transform = "translateY(0)"

})

})



// ================================
// ANIMAÇÃO DO CARRINHO
// ================================

function animarCarrinho(){

const carrinho = document.querySelector(".carrinho-flutuante")

if(!carrinho) return

carrinho.style.transition = "transform 0.2s"

carrinho.style.transform = "scale(1.2)"

setTimeout(()=>{

carrinho.style.transform = "scale(1)"

},200)

}



// ================================
// FECHAR CARRINHO CLICANDO FORA
// ================================

document.addEventListener("click",(e)=>{

const painel = document.getElementById("painelPedido")

if(!painel) return

const clicouDentroPainel = painel.contains(e.target)
const clicouCarrinho = e.target.closest(".carrinho-flutuante")

if(!clicouDentroPainel && !clicouCarrinho){

painel.classList.remove("ativo")

}

})



// ================================
// FUNÇÕES GLOBAIS
// ================================

window.animarCarrinho = animarCarrinho