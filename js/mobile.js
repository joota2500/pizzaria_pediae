// ================================
// MENU MOBILE PROFISSIONAL
// ================================

let menu
let botaoMenu



// -------------------------------
// ABRIR / FECHAR MENU
// -------------------------------

function toggleMenu(){

if(!menu) return

menu.classList.toggle("ativo")

}



// -------------------------------
// INICIAR SISTEMA MOBILE
// -------------------------------

document.addEventListener("DOMContentLoaded",()=>{

menu = document.querySelector(".menu")
botaoMenu = document.querySelector(".menu-mobile-btn")

if(!menu) return



// -------------------------------
// FECHAR MENU AO CLICAR EM LINK
// -------------------------------

const links = document.querySelectorAll(".menu a")

links.forEach(link=>{

link.addEventListener("click",()=>{

menu.classList.remove("ativo")

})

})



// -------------------------------
// FECHAR MENU CLICANDO FORA
// -------------------------------

document.addEventListener("click",(e)=>{

if(!menu || !botaoMenu) return

if(!menu.contains(e.target) && !botaoMenu.contains(e.target)){

menu.classList.remove("ativo")

}

})



})



// -------------------------------
// CORRIGIR AO REDIMENSIONAR TELA
// -------------------------------

window.addEventListener("resize",()=>{

if(!menu) return

if(window.innerWidth > 768){

menu.classList.remove("ativo")

}

})