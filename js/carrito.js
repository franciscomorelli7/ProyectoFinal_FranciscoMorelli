let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)
const carritoVacio=document.querySelector("#carritoVacio");
const carritoProductos = document.querySelector("#carritoProductos")
const carritoAcciones =document.querySelector("#carritoAcciones")
const carritoCompra = document.querySelector("#carritoCompra")
let botonEliminar = document.querySelectorAll(".carritoProductoBorrar")
const accionVaciar = document.querySelector("#vaciarCarro")
const contenedorTotal = document.querySelector("#totalCompra")
const comprar = document.querySelector("#finalizarCompra")


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
    actualizarTotal()
}

cargarProductosCarrito();



function actualizarBotonEliminar(){
    botonEliminar = document.querySelectorAll(".carritoProductoBorrar");
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", borrarDelCarrito);
    })

}
function borrarDelCarrito (e){
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #03045e, #ab2a3e)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index,1)
    cargarProductosCarrito();
    
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
}

accionVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Se vaciara su carrito",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Vaciar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Vaciado!',
            'Ha borrado todos los productos del carrito',
            'success'
          )
          productosEnCarrito.length =0;
          localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
          cargarProductosCarrito();
        }
      })

   

}
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto)=> acc +(producto.precio * producto.cantidad),0)
    contenedorTotal.innerText = `$${totalCalculado}`;
}

comprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    productosEnCarrito.length =0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoCompra.classList.remove("disabled");
}
        