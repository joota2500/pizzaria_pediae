document.addEventListener("DOMContentLoaded",()=>{

const btnTopo = document.createElement("div")
btnTopo.innerHTML = "⬆"
btnTopo.className = "botao-topo"
btnTopo.style.display = "none"

document.body.appendChild(btnTopo)

btnTopo.onclick=()=>window.scrollTo({top:0,behavior:"smooth"})

window.addEventListener("scroll",()=>{
btnTopo.style.display = window.scrollY > 500 ? "flex" : "none"
})

})

function animarCarrinho(){
const carrinho = document.querySelector(".carrinho-flutuante")
if(!carrinho) return

carrinho.style.transform="scale(1.2)"

setTimeout(()=>{
carrinho.style.transform="scale(1)"
},200)
}

window.animarCarrinho = animarCarrinho