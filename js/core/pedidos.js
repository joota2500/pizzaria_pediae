// ================================
// SISTEMA GLOBAL DE PEDIDOS (V3)
// ================================

function getPedidos(){
return JSON.parse(localStorage.getItem("pedidos")) || []
}

function salvarPedidos(lista){
localStorage.setItem("pedidos", JSON.stringify(lista))
}

function getPedidoAtualId(){
return localStorage.getItem("pedidoAtualId")
}

function setPedidoAtualId(id){
localStorage.setItem("pedidoAtualId", id)
}

function getPedidoAtual(){

const pedidos = getPedidos()
const id = getPedidoAtualId()

return pedidos.find(p => p.id == id)

}



// ================================
// CRIAR NOVO PEDIDO
// ================================

function criarPedido(){

const pedidos = getPedidos()

const novo = {
id: Date.now(),
itens: [],
status: "editando",
observacao: "",
criadoEm: new Date().toISOString()
}

pedidos.push(novo)

salvarPedidos(pedidos)
setPedidoAtualId(novo.id)

return novo

}



// ================================
// ADICIONAR ITEM AO PEDIDO
// ================================

function adicionarItemPedido(item){

let pedidos = getPedidos()
let id = getPedidoAtualId()

let pedido = pedidos.find(p => p.id == id)

// se não existir → cria automaticamente
if(!pedido){
pedido = criarPedido()
pedidos = getPedidos()
id = pedido.id
}

// 🔥 adiciona item
pedido.itens.push(item)

salvarPedidos(pedidos)

}



// ================================
// ATUALIZAR PEDIDO
// ================================

function atualizarPedido(dados){

let pedidos = getPedidos()
let id = getPedidoAtualId()

pedidos = pedidos.map(p=>{

if(p.id == id){
return {...p, ...dados}
}

return p

})

salvarPedidos(pedidos)

}



// ================================
// CANCELAR PEDIDO
// ================================

function cancelarPedidoAtual(){

let pedidos = getPedidos()
let id = getPedidoAtualId()

pedidos = pedidos.map(p=>{

if(p.id == id){
p.status = "cancelado"
}

return p

})

salvarPedidos(pedidos)
localStorage.removeItem("pedidoAtualId")

}



// ================================
// LIMPAR PEDIDO ATUAL (opcional)
// ================================

function limparPedidoAtual(){
localStorage.removeItem("pedidoAtualId")
}