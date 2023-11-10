AOS.init();

const productos = [
    {id:1, nombre: "Coctelera", img:"./public/img/cocteleraImg.jpg", precio: "$6600"},
    {id:2, nombre: "Barspoon", img:"./public/img/barspoonImg.jpg", precio: "$4500"},
    {id:3, nombre: "Colador", img:"./public/img/coladorOrugaImg.jpg", precio: "$3700"},
    {id:4, nombre: "Jigger", img:"./public/img/jiggerImg.jpg", precio: "$6400"},
    {id:5, nombre: "Vaso Old Fashioned", img:"./public/img/vasoOldFashionedImg.jpg", precio: "$2300"},
    {id:6, nombre: "Vaso Highball", img:"./public/img/vasoHighballImg.jpg", precio: "$1800"},
    {id:7, nombre: "Copa Hurricane", img:"./public/img/copaHurricaneImg.jpg", precio: "$3100"},
    {id:8, nombre: "Copa Cocktail", img:"./public/img/copaCocktailImg.jpg", precio: "$3400"},
    {id:9, nombre: "Vodka Grey Goose", img:"./public/img/greyGooseImg.jpg", precio: "$45 000"},
    {id:10, nombre: "Ron Diplomatico", img:"./public/img/diplomaticoImg.jpg", precio: "$42 000"},
    {id:11, nombre: "Gin Hendrick's", img:"./public/img/hendricksImg.jpg", precio: "$24 000"},
    {id:12, nombre: "Cognac Hennessy", img:"./public/img/hennessyImg.jpg", precio: "$34 000"},
]

let productosCarrito = []
let seccionCarrito = document.getElementById("carrito")
let elementosCarrito = document.getElementById("elementos-carrito")
let botonesAgregarAlCarrito = document.querySelectorAll("[data-productid]")
let comprarButton = document.getElementById("comprarButton")

botonesAgregarAlCarrito.forEach((boton)=>boton.addEventListener("click",agregarAlCarrito))
localStorage.setItem("carrito", productosCarrito)
function agregarAlCarrito(event){
    let idBotonAgregar = event.target.dataset.productid 
    let productoAAgregar = productos.find((x)=>x.id == idBotonAgregar)
    productosCarrito.push(productoAAgregar)
    
    let divsCarrito = document.createElement("div")
    divsCarrito.innerHTML = `<div class="carritoCard">
    <img src=${productoAAgregar.img}>
    <div id="product-info">
        <p>${productoAAgregar.nombre}</p>
        <p>${productoAAgregar.precio}</p>
    </div>
    <div class="cantidad">
        <p>1</p>
    </div>
    <button class="card-button card-delete-button" data-productid="${productoAAgregar.id}"}>X</button>
</div>`
    elementosCarrito.appendChild(divsCarrito)
    let pCarritoVacio = document.getElementById("p-carrito-vacio")
    if(pCarritoVacio){
        pCarritoVacio.classList.add("hide")
    }
    if(productosCarrito.length > 0){
        comprarButton.classList.remove("hide")
    }
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
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
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






