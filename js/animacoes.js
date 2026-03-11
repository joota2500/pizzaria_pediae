// ================================
// ANIMAÇÕES DO SITE
// ================================


// -------------------------------
// ANIMAÇÃO AO SCROLL
// -------------------------------

function animarScroll(){

const elementos = document.querySelectorAll(".animar")

const alturaTela = window.innerHeight

elementos.forEach(el => {

const posicao = el.getBoundingClientRect().top

if(posicao < alturaTela - 80){

el.classList.add("animado")

}

})

}

window.addEventListener("scroll", animarScroll, { passive:true })


// -------------------------------
// PREPARAR ELEMENTOS
// -------------------------------

document.addEventListener("DOMContentLoaded",()=>{

const elementos = document.querySelectorAll("section, article")

elementos.forEach(el=>{

el.classList.add("animar")

})

animarScroll()

})



// -------------------------------
// ANIMAÇÃO DE CLIQUE EM BOTÕES
// -------------------------------

document.addEventListener("click",function(e){

const botao = e.target.closest(
".botao, .botao-enviar, .botao-bebida, .botao-expandir"
)

if(!botao) return

botao.style.transform = "scale(0.94)"

setTimeout(()=>{

botao.style.transform = ""

},120)

})