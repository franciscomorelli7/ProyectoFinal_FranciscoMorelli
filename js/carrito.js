let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)
const carritoVacio=document.querySelector("#carritoVacio");
const carritoProductos = document.querySelector("#carritoProductos")
const carritoAcciones =document.querySelector("#carritoAcciones")
const carritoCompra = document.querySelector("#carritoCompra")
let botonEliminar = document.querySelectorAll(".carritoProductoBorrar")
const accionVaciar = document.querySelector("#vaciarCarro")
const contenedorTotal = document.querySelector("#totalCompra")


function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length >0){

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoCompra.classList.remove("disabled");
    
        carritoProductos.innerHTML = "";
    
    
        productosEnCarrito.forEach(producto =>{
            
            const div = document.createElement("div");
            div.classList.add("productoCarrito");
            div.innerHTML=`
            <img src="${producto.imagen}" class="productosCarritoImagen" alt="${producto.nombre}">
                            <div class="productoCarritoNombre">
                                <small>Nombre</small>
                                <h3>${producto.nombre}</h3>
                            </div>
                            <div class="carritoProductoCantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carritoProductoPrecio">
                                <small>Precio</small>
                                <p>$${producto.precio}</p>
                            </div>
                            <div class="carritoProductoTotal">
                                <small>Total</small>
                                <p>$${producto.precio * producto.cantidad}</p>
                            </div>
                            <button class="carritoProductoBorrar" id="${producto.id}">
                                <i class="bi bi-trash3"></i>
                            </button>
                    `;
                carritoProductos.append(div);
        })
        
    }else{
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoCompra.classList.add("disabled");
    }

    actualizarBotonEliminar();
}

cargarProductosCarrito();



function actualizarBotonEliminar(){
    botonEliminar = document.querySelectorAll(".carritoProductoBorrar");
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", borrarDelCarrito);
    })

}
function borrarDelCarrito (e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index,1)
    cargarProductosCarrito();
    
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
}

accionVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    productosEnCarrito.length =0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

}
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto)=> acc +(producto.precio *producto.cantidad),0)
    total.innerText = `$${totalCalculado}`
}