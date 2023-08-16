const productos = [
    //equipamiento oficial
    {
        id: 'equipamiento01',
        nombre: 'Camiseta titular',
        imagen: "./assets/img/prenda01.webp",
        categoria: 'equipamiento',
        precio:27000,
    },
    {
        id: 'equipamiento02',
        nombre: 'Camiseta suplente',
        imagen: "./assets/img/prenda02.png",
        categoria: 'Equipamiento oficial',
        precio:23000,
    },
    {
        id: 'equipamiento03',
        nombre: 'Camiseta titular 2019/2020',
        imagen: "./assets/img/prenda03.jpg",
        categoria: 'equipamiento',
        precio:15000,
    },
    {
        id: 'equipamiento04',
        nombre: 'Camiseta alternativa',
        imagen: "./assets/img/prenda04.png",
        categoria: 'equipamiento',
        precio:20000,
    },
    {
        id: 'equipamiento05',
        nombre: 'Short blanco oficial',
        imagen: "./assets/img/prenda05.jpeg",
        categoria: 'equipamiento',
        precio:10000,
    },
    {
        id: 'equipamiento06',
        nombre: 'Short negro oficial',
        imagen: "./assets/img/prenda06.png",
        categoria: 'equipamiento',
        precio:10000,
    },
    //ACCESORIOS   
    {
        id: 'accesorio01',
        nombre: 'Gorra con escudo',
        imagen: "./assets/img/prenda07.webp",
        categoria: 'accesorios',
        precio:2000,
    },
    {
        id: 'accesorio02',
        nombre: 'Piluso con escudo',
        imagen: "./assets/img/prenda08.webp",
        categoria: 'accesorios',
        precio:3000,
    },
    {
        id: 'accesorio03',
        nombre: 'Gorro de lana',
        imagen: "./assets/img/prenda09.webp",
        categoria: 'accesorios',
        precio:2500,
    },
    //ABRIGOS
    {
        id: 'abrigo01',
        nombre: 'Camperon Nike Oficial',
        imagen: "./assets/img/prenda10.jpg",
        categoria: 'abrigos',
        precio:50000,
    },
    {
        id: 'abrigo02',
        nombre: 'Campera Nike de entrenamiento',
        imagen: "./assets/img/prenda11.webp",
        categoria: 'abrigos',
        precio:30000,
    },
    {
        id: 'abrigo03',
        nombre: 'Campera nike negra',
        imagen: "./assets/img/prenda12.jpg",
        categoria: 'abrigos',
        precio:20000,
    }
        
]

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
cargarProductos(productos)
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

