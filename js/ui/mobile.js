// =======================================
// MENU MOBILE PROFISSIONAL
// =======================================

let menu = null
let botaoMenu = null



// ---------------------------------------
// ABRIR / FECHAR MENU
// ---------------------------------------

function toggleMenu(){

if(!menu) return

menu.classList.toggle("ativo")

const aberto = menu.classList.contains("ativo")

if(botaoMenu){

botaoMenu.setAttribute("aria-expanded", aberto)

}

}



// ---------------------------------------
// FECHAR MENU
// ---------------------------------------

function fecharMenu(){

if(!menu) return

menu.classList.remove("ativo")

if(botaoMenu){

botaoMenu.setAttribute("aria-expanded", false)

}

}



// ---------------------------------------
// INICIAR SISTEMA MOBILE
// ---------------------------------------

document.addEventListener("DOMContentLoaded",()=>{

menu = document.querySelector(".menu")
botaoMenu = document.querySelector(".menu-mobile-btn")

if(!menu || !botaoMenu) return



// ---------------------------------------
// FECHAR MENU AO CLICAR EM LINK
// ---------------------------------------

menu.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",()=>{

fecharMenu()

})

})



// ---------------------------------------
// FECHAR MENU CLICANDO FORA
// ---------------------------------------

document.addEventListener("click",(e)=>{

const clicouDentroMenu = menu.contains(e.target)
const clicouBotao = botaoMenu.contains(e.target)

if(!clicouDentroMenu && !clicouBotao){

fecharMenu()

}

})



// ---------------------------------------
// FECHAR MENU COM ESC
// ---------------------------------------

document.addEventListener("keydown",(e)=>{

if(e.key === "Escape"){

fecharMenu()

}

})

})



// ---------------------------------------
// CORRIGIR AO REDIMENSIONAR TELA
// ---------------------------------------

window.addEventListener("resize",()=>{

if(!menu) return

if(window.innerWidth > 768){

fecharMenu()

}

})