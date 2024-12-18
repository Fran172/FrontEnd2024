async function MostrarProductos(contenedor, cant) {
    try {
        const resMensWatches = await fetch('https://dummyjson.com/products/category/mens-watches');
        const mensWatches = await resMensWatches.json();
        const resWomensWatches = await fetch('https://dummyjson.com/products/category/womens-watches');
        const womensWatches = await resWomensWatches.json();
        const allProd = mensWatches.products.concat(womensWatches.products);
        if (cant === undefined) {
            cant = allProd.length
        }
        for (let i=0; i<cant; i++) {
            contenedor.innerHTML += `
                <div class="card text-center margen" style="width: 18rem;">
                    <img src="${allProd[i].thumbnail}" class="card-img-top" alt="${allProd[i].title}">
                    <div class="card-body">
                        <h5 class="card-title chakra-petch-bold">${allProd[i].title}</h5>
                        <p class="card-text chakra-petch-regular">USD ${allProd[i].price}</p>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                </div>`;
        }
    } catch (error) {console.log('[!] Ocurrió un error:', error)}
}

async function MostrarResenias(contenedor, cant) {
    try {
        const resMensWatches = await fetch('https://dummyjson.com/products/category/mens-watches');
        const mensWatches = await resMensWatches.json();
        const resWomensWatches = await fetch('https://dummyjson.com/products/category/womens-watches');
        const womensWatches = await resWomensWatches.json();
        const allProd = mensWatches.products.concat(womensWatches.products);
        if (cant === undefined) {
            cant = allProd.length
        }
        for (let i=0; i<cant; i++) {
            let fullStar = `<i class="fa-solid fa-star"></i>`
            let emptyStar = `<i class="fa-regular fa-star"></i>`
            for (let review of allProd[i].reviews) {
                if (review.rating >= 4) {
                    contenedor.innerHTML += `
                    <div class="card">
                        <div class="card-header">
                            ${fullStar.repeat(review.rating) + emptyStar.repeat(5-review.rating)}
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                            <p>${review.comment}</p>
                            <footer class="blockquote-footer">${review.reviewerName}</footer>
                            </blockquote>
                        </div>
                    </div>`;
                }
            }
        }
    } catch (error) {console.log('[!] Ocurrió un error:', error)}
}

const productos = document.getElementById("productos")
const resenias = document.getElementById("resenias")
if (productos) {
    MostrarProductos(productos);}
if (resenias) {
    MostrarResenias(resenias);}



