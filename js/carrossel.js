// ================================
// CARROSSEL DE PROMOÇÕES
// ================================

document.addEventListener("DOMContentLoaded",()=>{

const slides = document.querySelector(".slides")

if(!slides) return

const imagens = slides.querySelectorAll("img")

let index = 0
let intervalo = null


// -------------------------------
// DUPLICAR PRIMEIRA IMAGEM
// -------------------------------

const primeiraImagem = imagens[0].cloneNode(true)
slides.appendChild(primeiraImagem)

const total = slides.querySelectorAll("img").length


// -------------------------------
// AJUSTAR LARGURA
// -------------------------------

slides.style.width = `${total * 100}%`

slides.querySelectorAll("img").forEach(img=>{
img.style.width = `${100 / total}%`
})



// -------------------------------
// MOVER SLIDE
// -------------------------------

function moverSlide(){

index++

slides.style.transition = "transform 0.6s ease"

slides.style.transform =
`translateX(-${index * (100 / total)}%)`


// reset invisível
if(index === total - 1){

setTimeout(()=>{

slides.style.transition = "none"

index = 0

slides.style.transform = "translateX(0)"

},600)

}

}



// -------------------------------
// INICIAR CARROSSEL
// -------------------------------

function iniciar(){

if(intervalo) return

intervalo = setInterval(moverSlide,4000)

}



// -------------------------------
// PARAR CARROSSEL
// -------------------------------

function parar(){

clearInterval(intervalo)
intervalo = null

}



// -------------------------------
// EVENTOS HOVER
// -------------------------------

slides.addEventListener("mouseenter",parar)

slides.addEventListener("mouseleave",iniciar)



// -------------------------------
// EVENTOS TOUCH (MOBILE)
// -------------------------------

slides.addEventListener("touchstart",parar)

slides.addEventListener("touchend",iniciar)



// iniciar
iniciar()

})