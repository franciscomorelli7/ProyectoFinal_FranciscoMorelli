let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#principal");
const claseBotones = document.querySelectorAll(".botonNav");
const tituloMain = document.querySelector("#tituloMain");
let agregar = document.querySelectorAll(".producto__agregar")
const numerito = document.querySelector("#numerito")


function cargarProductos (productosElegidos){
        
    contenedorProductos.innerHTML = " "
    
        productosElegidos.forEach(producto =>{

            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
            <img class="productoImagen" src="${producto.imagen}" alt="">
            <div class="producto__informacion">
                <h4 class="producto__nombre">${producto.nombre}</h4>
                <p class="producto__precio">$${producto.precio}</p>
                <button class="producto__agregar" id= "${producto.id}">Agregar al carrito</button>
            </div>
            `;
            contenedorProductos.append(div);
        })
 habilitarAgregar()
}

claseBotones.forEach(boton => {
    boton.addEventListener("click", (b)=>{
        if(b.currentTarget.id != 'todos'){
            
            const productosBoton = productos.filter(producto => producto.categoria === b.currentTarget.id)
            cargarProductos(productosBoton)
        }else{
            
            cargarProductos(productos)
        }
    })
})
function habilitarAgregar (){
    agregar = document.querySelectorAll(".producto__agregar");

    agregar.forEach(boton =>{
        boton.addEventListener("click",agregarCarrito)
    });
}
let productosEnCarrito

let productosEnCarritoLS = (localStorage.getItem("productos-en-carrito"))


if(productosEnCarritoLS){
     productosEnCarrito =JSON.parse(productosEnCarritoLS)
     actualizarNumerito()
}else{
    productosEnCarrito = []
}


function agregarCarrito(e){
    Toastify({
        text: "Producto agregado",
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
    const idBoton= e.currentTarget.id;
    const productoAgregado = productos.find (producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto=> producto.id === idBoton)){
       const index = productosEnCarrito.findIndex (producto => producto.id === idBoton)
       productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}
function actualizarNumerito(){
    let nuevoNumero = productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumero
}

