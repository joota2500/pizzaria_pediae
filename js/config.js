/* ================================================= */
/* CONFIGURAÇÕES GERAIS DO SISTEMA */
/* ================================================= */

const CONFIG = {


// =================================================
// DADOS DA PIZZARIA
// =================================================

nomePizzaria: "PeçaPizzaOnline",

whatsapp: "5585989214864",

instagram: "https://instagram.com/pizzaria",

tempoEntrega: "30 a 45 minutos",

pix: "pix@pizzaria.com",

endereco: "Rua da Pizza, 123 - Centro",



// =================================================
// REGRAS DO PEDIDO
// =================================================

pedido:{

valorMinimo:20,

permitirMeiaPizza:true,

maxSabores:2

},



// =================================================
// TAXA DE ENTREGA POR BAIRRO
// =================================================

taxaEntrega:{

centro:1,
mondego:2,
vilanova:3,
conselheiroesterlita:4,
putiu:5,
sambarao:6,
altoalegre:7,
raposa:8,
oiticica:4,
areias:5,
larges:6,
conjuntoesperanca:7

},



// =================================================
// NOMES DOS BAIRROS
// =================================================

bairros:{

centro:"Centro",
mondego:"Mondego",
vilanova:"Vila Nova",
conselheiroesterlita:"Conselheiro Esterlita",
putiu:"Putiú",
sambarao:"Sambarrão",
altoalegre:"Alto Alegre",
raposa:"Raposa",
oiticica:"Oiticica",
areias:"Areias",
larges:"Larges",
conjuntoesperanca:"Conjunto Esperança"

},



// =================================================
// HORÁRIO DA PIZZARIA
// =================================================

horario:{

abre:"18:00",

fecha:"22:00"

},



// =================================================
// CUPONS PROMOCIONAIS
// =================================================

cupons:{

PIZZA10:{
desconto:10,
minimo:70
},

PIZZA20:{
desconto:20,
minimo:90
},

FRETEGRATIS:{
freteGratis:true,
diasPermitidos:[1,2,3] // segunda terça quarta
}

}

}



// =================================================
// SEGURANÇA
// =================================================

Object.freeze(CONFIG)

Object.freeze(CONFIG.pedido)
Object.freeze(CONFIG.taxaEntrega)
Object.freeze(CONFIG.bairros)
Object.freeze(CONFIG.horario)
Object.freeze(CONFIG.cupons)