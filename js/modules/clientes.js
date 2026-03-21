// ================================
// CLIENTES (INSTAGRAM FIX REAL)
// ================================

let carregado = false

function carregarInstagram(){

if(carregado){
reprocessarInstagram()
return
}

carregado = true

const script = document.createElement("script")
script.src = "https://www.instagram.com/embed.js"
script.async = true

script.onload = ()=>{
reprocessarInstagram()
}

document.body.appendChild(script)

}


// 🔥 força reprocessamento (ESSENCIAL)
function reprocessarInstagram(){

if(window.instgrm){

window.instgrm.Embeds.process()

setTimeout(()=>{
document.querySelectorAll(".cliente-post")
.forEach(el=>el.classList.add("loaded"))
},1200)

}

}


// ================================
// OBSERVER
// ================================

document.addEventListener("DOMContentLoaded",()=>{

const secao = document.getElementById("clientes")

if(!secao) return

const observer = new IntersectionObserver((entries)=>{

if(entries[0].isIntersecting){

carregarInstagram()
observer.disconnect()

}

},{ threshold:0.3 })

observer.observe(secao)

})