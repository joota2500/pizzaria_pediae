// ================================
// FILTRO DE CATEGORIAS
// ================================

function filtrarCategoria(categoria){

const cards = document.querySelectorAll(".pizza-card")
const botoes = document.querySelectorAll(".filtros button")

let resultados = 0


// -------------------------------
// BOTÃO ATIVO
// -------------------------------

botoes.forEach(btn=>{
btn.classList.remove("categoriaAtiva")
})

const botaoAtivo = Array.from(botoes).find(btn =>
btn.dataset.categoria === categoria
)

if(botaoAtivo){
botaoAtivo.classList.add("categoriaAtiva")
}



// -------------------------------
// FILTRAR CARDS
// -------------------------------

cards.forEach(card=>{

if(categoria === "todas"){

card.style.display = "flex"
resultados++

return

}

const tipo = card.dataset.categoria

if(tipo === categoria){

card.style.display = "flex"
resultados++

}else{

card.style.display = "none"

}

})



mostrarMensagemCategoria(resultados)

}



// ================================
// MENSAGEM SEM RESULTADO
// ================================

function mostrarMensagemCategoria(total){

let aviso = document.getElementById("semCategoria")

if(!aviso){

aviso = document.createElement("p")

aviso.id="semCategoria"
aviso.style.textAlign="center"
aviso.style.marginTop="20px"
aviso.style.fontWeight="600"

const lista = document.getElementById("lista-pizzas")

if(lista){
lista.after(aviso)
}

}



if(total === 0){

aviso.innerText="❌ Nenhuma pizza nessa categoria"

}else{

aviso.innerText=""

}

}