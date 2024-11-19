
// Objeto con información del grupo
const grupo = {
    nombre: "Grupo 02",
    integrantes: ["José"]
};

// Array de frutas
const frutas = [
    { id: 1, nombre: "Manzana", precio: 100, img: "img/manzana.jpg" },
    { id: 2, nombre: "Banana", precio: 50, img: "img/banana.jpg" },
    { id: 3, nombre: "Mandarina", precio: 70, img: "img/mandarina.jpg" },
    { id: 4, nombre: "Pera", precio: 120, img: "img/pera.jpg" },
    { id: 5, nombre: "Ananá", precio: 150, img: "img/anana.jpg" },
    { id: 6, nombre: "Pomelo Amarillo", precio: 90, img: "img/pomelo-amarillo.jpg" },
    { id: 7, nombre: "Arándano", precio: 180, img: "img/arandano.jpg" },
    { id: 8, nombre: "Kiwi", precio: 200, img: "img/kiwi.jpg" },
    { id: 9, nombre: "Pomelo Rojo", precio: 110, img: "img/pomelo-rojo.jpg" },
    { id: 10, nombre: "Sandía", precio: 250, img: "img/sandia.jpg" },
];

// Carrito de compras
let carrito = [];

const App = {
    inicializar() {
        this.mostrarNombreGrupo();
        this.mostrarProductos(frutas);
        this.cargarCarrito();
        console.log("App inicializada correctamente.");
    },

    // Mostrar el nombre del grupo en la consola y en el DOM
    mostrarNombreGrupo() {
        console.log(grupo.nombre);
        const nombreGrupoDiv = document.querySelector(".nombreGrupo");
        nombreGrupoDiv.textContent = grupo.nombre;
    },

    // Mostrar los productos en pantalla
    mostrarProductos(productos) {
        const productGrid = document.querySelector(".product-grid");
        productGrid.innerHTML = ""; // Limpiar la vista antes de renderizar

        productos.forEach(fruta => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${fruta.img}" alt="${fruta.nombre}">
                <h3>${fruta.nombre}</h3>
                <p>Precio: $${fruta.precio}</p>
                <button onclick="App.agregarAlCarrito(${fruta.id})">Agregar al carrito</button>
            `;

            productGrid.appendChild(productCard);
        });
    },

    // Agregar un producto al carrito
    agregarAlCarrito(id) {
        const producto = frutas.find(fruta => fruta.id === id);
        if (producto) {
            carrito.push(producto);
            this.actualizarCarrito();
            this.guardarCarrito();
        }
    },

    // Actualizar la vista del carrito
    actualizarCarrito() {
        const cartItems = document.querySelector("#cart-items");
        const cartCount = document.querySelector("#cart-count");
        const totalPrice = document.querySelector("#total-price");

        cartItems.innerHTML = ""; // Limpiar el carrito

        if (carrito.length === 0) {
            cartItems.innerHTML = "<p>No hay elementos en el carrito.</p>";
        } else {
            carrito.forEach((item, index) => {
                const itemBlock = document.createElement("li");
                itemBlock.classList.add("item-block");

                itemBlock.innerHTML = `
                    <p class="item-name">${item.nombre} - $${item.precio}</p>
                    <button class="delete-button" onclick="App.eliminarDelCarrito(${index})">Eliminar</button>
                `;

                cartItems.appendChild(itemBlock);
            });
        }

        // Actualizar contador y precio total
        cartCount.textContent = carrito.length;
        totalPrice.textContent = `$${carrito.reduce((acc, item) => acc + item.precio, 0).toFixed(2)}`;
    },

    // Eliminar un producto del carrito
    eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        this.actualizarCarrito();
        this.guardarCarrito();
    },

    // Guardar el carrito en localStorage
    guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    },

    // Cargar el carrito desde localStorage
    cargarCarrito() {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            this.actualizarCarrito();
        }
    },

    // Filtrar productos según el input
    filtrarProductos(event) {
        const valor = event.target.value.toLowerCase();
        const productosFiltrados = frutas.filter(fruta => 
            fruta.nombre.toLowerCase().includes(valor)
        );
        this.mostrarProductos(productosFiltrados);
    }
};

// Asociar eventos
document.addEventListener("DOMContentLoaded", () => App.inicializar());
document.querySelector(".search-bar").addEventListener("keyup", (event) => App.filtrarProductos(event));
