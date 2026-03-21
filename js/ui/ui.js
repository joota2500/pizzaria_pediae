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
btnTopo.style.display = window.scrollY > 500 ? "flex" : "none"
})



// ================================
// HOVER CARDS
// ================================

document.addEventListener("mouseover",(e)=>{
const card = e.target.closest(".pizza-card")
if(!card) return
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

carrinho.style.transform = "scale(1.2)"

setTimeout(()=>{
carrinho.style.transform = "scale(1)"
},200)

}



// ================================
// GLOBAL
// ================================

window.animarCarrinho = animarCarrinho