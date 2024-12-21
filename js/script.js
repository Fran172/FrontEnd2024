async function mostrarResenias(amount) {
    try {
        const resMensWatches = await fetch('https://dummyjson.com/products/category/mens-watches');
        const mensWatches = await resMensWatches.json();
        const resWomensWatches = await fetch('https://dummyjson.com/products/category/womens-watches');
        const womensWatches = await resWomensWatches.json();
        const productos = mensWatches.products.concat(womensWatches.products);

        const contenedorResenias = document.getElementById("resenias")
        const max = amount !== undefined ? amount : productos.length;
        let cont = 0;
        for (let i = 0; i < productos.length && cont < max; i++) {
            for (let j = 0; j < productos[i].reviews.length && cont < max; j++) {
                if (productos[i].reviews[j].rating >= 4) {
                    const review = productos[i].reviews[j];
                    const fullStar = `<i class="fa-solid fa-star"></i>`;
                    const emptyStar = `<i class="fa-regular fa-star"></i>`;
                    contenedorResenias.innerHTML += `
                        <div class="card">
                            <div class="card-header">
                                ${fullStar.repeat(review.rating) + emptyStar.repeat(5 - review.rating)}
                            </div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p>${review.comment}</p>
                                    <footer class="blockquote-footer">${review.reviewerName}</footer>
                                </blockquote>
                            </div>
                        </div>`;
                    cont++;
                }
            }
        }
    } catch (error) {console.log('[!] Ocurrió un error:', error)}
}

async function mostrarProductos(amount) {
    try {
        const resMensWatches = await fetch('https://dummyjson.com/products/category/mens-watches');
        const mensWatches = await resMensWatches.json();
        const resWomensWatches = await fetch('https://dummyjson.com/products/category/womens-watches');
        const womensWatches = await resWomensWatches.json();
        const productos = mensWatches.products.concat(womensWatches.products);

        const contenedorProductos = document.getElementById("productos")
        const max = amount !== undefined ? amount : productos.length;
        for (let i=0; i<max; i++) {
            const card = document.createElement("div");
            card.innerHTML = `
                <div class="card text-center margen" style="width: 18rem;">
                    <img src="${productos[i].thumbnail}" class="card-img-top" alt="${productos[i].title}">
                    <div class="card-body">
                        <h5 class="card-title chakra-petch-bold">${productos[i].title}</h5>
                        <p class="card-text chakra-petch-regular">USD ${productos[i].price}</p>
                        <button class="btn btn-primary">Comprar</button>
                    </div>
                </div>`;
            const boton = card.querySelector("button");
            boton.addEventListener("click", () => agregarAlCarrito(productos[i]));
            contenedorProductos.appendChild(card);
        }
    } catch (error) {console.log('[!] Ocurrió un error:', error)}
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenedorPrecio = document.getElementById("precio-total");
    let contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.innerHTML = "";
    let precioTotal = 0;
    if (carrito.length > 0) {
        for (let i=0; i<carrito.length; i++) {
            precioTotal += carrito[i].price;
            const card = document.createElement("div");
            card.className = "card mb-3"
            card.innerHTML = `
                <div class="row">
                    <div class="col-md-4">
                    <img src="${carrito[i].thumbnail}"  alt="${carrito[i].title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${carrito[i].title}</h5>
                            <p class="card-text">${carrito[i].description}</p>
                            <div class="list-group">
                                <p class="list-group-item m-0"><b>Categoría</b>: ${carrito[i].category}</p>
                                <p class="list-group-item m-0"><b>Marca</b>: ${carrito[i].brand}</p>
                                <p class="list-group-item m-0"><b>Rating</b>: ${carrito[i].rating}</p>
                                <p class="list-group-item m-0"><b>Garantía</b>: ${carrito[i].warrantyInformation}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h5 class="card-footer d-flex justify-content-between align-items-center fs-3">
                    <button class="btn btn-secondary btn-sm py-1 fs-3">Borrar</button>
                    USD ${carrito[i].price}
                </h5>`;
                contenedorCarrito.appendChild(card)
                const boton = card.querySelector("button");
                boton.addEventListener("click", () => eliminarDeCarrito(i));
                contenedorPrecio.innerHTML = `
                    <span class="text-body-secondary">Total: </span>
                    <span class="fs-1">USD ${Math.round(precioTotal)}</span>`;
            }
        } else {
            contenedorCarrito.innerHTML += `
            <div class="card mb-3">
            <span class="carrito-vacio">El carrito está vacio</span>
            </div>`;
            contenedorPrecio.innerHTML = "";
    }
}

function eliminarDeCarrito(indice) {
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(indice, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', function() {
    const contenedorProductos = document.getElementById("productos")
    const contenedorResenias = document.getElementById("resenias")
    const ContenedorCarrito = document.getElementById("carrito")
    if (contenedorProductos) {
        const amount = contenedorProductos.getAttribute('data-amount');
        amount ? mostrarProductos(amount) : mostrarProductos();
    }
    if (contenedorResenias) {
        const amount = contenedorResenias.getAttribute('data-amount');
        amount ? mostrarResenias(amount) : mostrarResenias();
    }
    if (ContenedorCarrito) {
        mostrarCarrito();
        document
            .getElementById("vaciar-carrito")
            .addEventListener("click", () => vaciarCarrito());
    }
});


