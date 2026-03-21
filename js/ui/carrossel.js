// ================================
// CARROSSEL PROFISSIONAL
// ================================

document.addEventListener("DOMContentLoaded",()=>{

const slides = document.querySelector(".slides")
if(!slides) return

const imagens = slides.querySelectorAll("img")

let index = 0
let intervalo = null

const total = imagens.length

// ================================
// AJUSTAR LAYOUT CORRETO
// ================================

slides.style.display = "flex"
slides.style.width = `${total * 100}%`

imagens.forEach(img=>{
img.style.width = `${100 / total}%`
img.style.objectFit = "cover"
})


// ================================
// MOVER SLIDE
// ================================

function moverSlide(){

index++

if(index >= total){
index = 0
}

slides.style.transform = `translateX(-${index * (100 / total)}%)`
slides.style.transition = "transform 0.5s ease"

}


// ================================
// AUTO PLAY
// ================================

function iniciar(){
intervalo = setInterval(moverSlide,3500)
}

function parar(){
clearInterval(intervalo)
}


// ================================
// EVENTOS
// ================================

// hover desktop
slides.addEventListener("mouseenter",parar)
slides.addEventListener("mouseleave",iniciar)

// touch mobile
slides.addEventListener("touchstart",parar)
slides.addEventListener("touchend",iniciar)


// ================================
// INICIAR
// ================================

iniciar()

})