AOS.init();

let productosCarrito = []
let seccionCarrito = document.getElementById("carrito")
let elementosCarrito = document.getElementById("elementos-carrito")
let comprarButton = document.getElementById("comprarButton")

fetch("productos.json")
    .then(response => response.json())
    .then(data => {
        const productos = data.productos;
        let cardsUtensilios = document.getElementById("cardsUtensilios");
        let cardsCristaleria = document.getElementById("cardsCristaleria");
        let cardsBebidas = document.getElementById("cardsBebidas");
        productos.forEach((producto,index) => {
            const productoElement = document.createElement("div");
            productoElement.innerHTML = `<div class="card ${producto.classname}-card">
                <div class="card-details">
                    <p class="card-title">${producto.nombre}</p>
                    <p class="card-price">${producto.precio}</p>
                </div>
                <button class="card-button" id="add${producto.classname}" data-productid="${index+1}">Agregar al carrito</button>
            </div>`;
            if(producto.categoria == "utensilio"){
                cardsUtensilios.appendChild(productoElement);
            }else if(producto.categoria == "bebida"){
                cardsBebidas.appendChild(productoElement)
            }else if(producto.categoria == "cristaleria"){
                cardsCristaleria.appendChild(productoElement)
            }
        });
        const botonesAgregarAlCarrito = document.querySelectorAll("[data-productid]")
        botonesAgregarAlCarrito.forEach((boton)=>boton.addEventListener("click",agregarAlCarrito))
    function agregarAlCarrito(event){
    let idBotonAgregar = event.target.dataset.productid 
    let productoAAgregar = productos.find((x)=>x.id == idBotonAgregar)
    let idAAgregar = productoAAgregar.id
    let divsCarrito = document.createElement("div")
    if(productosCarrito.some((x)=>x.id == idAAgregar)){
        productoAAgregar.cantidad += 1
        let pCantidad = document.querySelector(`#producto${productoAAgregar.id}`)
        pCantidad.textContent = `${productoAAgregar.cantidad}`
    }else{
        productosCarrito.push(productoAAgregar)
        productoAAgregar.cantidad = 1
        console.log("ahi te lo agregue master")
        divsCarrito.innerHTML = `
    <div class="carritoCard">
        <img src=${productoAAgregar.img}>
        <div id="product-info">
            <p>${productoAAgregar.nombre}</p>
            <p>${productoAAgregar.precio}</p>
        </div>
        <div id="divCantidad">
            <p class="pCantidad" id="producto${productoAAgregar.id}">${productoAAgregar.cantidad}</p>
        </div>
        <button class="card-button card-delete-button" data-productid="${productoAAgregar.id}"}>X</button>
    </div>`
        elementosCarrito.appendChild(divsCarrito)
    }
    let pCarritoVacio = document.getElementById("p-carrito-vacio")
    if(pCarritoVacio){
        pCarritoVacio.classList.add("hide")
    } //OPERADOR AVANZADO
    if(productosCarrito.length > 0){
        comprarButton.classList.remove("hide")
    } //OPERADOR AVANZADO
    console.log(productosCarrito)
    let botonesEliminarDelCarrito = divsCarrito.querySelectorAll(".card-delete-button")
    botonesEliminarDelCarrito.forEach((boton)=>boton.addEventListener("click",eliminarfuncion))
    function eliminarfuncion(event){
        let idBotonElimnar = event.target.dataset.productid 
        let indiceAEliminar = productosCarrito.findIndex((producto) => producto.id == idBotonElimnar);
        productosCarrito.splice(indiceAEliminar,1)
        console.log(productosCarrito)
        if(divsCarrito.parentNode){
            divsCarrito.remove()
        }
        if(productosCarrito.length == 0){
            pCarritoVacio.classList.remove("hide")
            comprarButton.classList.add("hide")
        }
    }
    comprarButton.addEventListener("click", () =>{let timerInterval
        Swal.fire({
            title: "Compra exitosa!",
            html: "Este mensaje se cerrará en <b></b> milisegundos.",
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        })
        productosCarrito.splice(0)
        divsCarrito.remove()
        comprarButton.classList.add("hide")
        pCarritoVacio.classList.remove("hide")
    })
    }
})
