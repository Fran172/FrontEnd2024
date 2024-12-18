async function MostrarProductos() {
    try {
        const resMensWatches = await fetch('https://dummyjson.com/products/category/mens-watches');
        const mensWatches = await resMensWatches.json();
        const resWomensWatches = await fetch('https://dummyjson.com/products/category/womens-watches');
        const womensWatches = await resWomensWatches.json();
        const allProd = mensWatches.products.concat(womensWatches.products);
        const contProd = document.getElementById("productos");
        for (let card of allProd) {
            contProd.innerHTML += `
                <div class="card text-center margen" style="width: 18rem;">
                    <img src="${card.thumbnail}" class="card-img-top" alt="${card.title}">
                    <div class="card-body">
                        <h5 class="card-title chakra-petch-bold">${card.title}</h5>
                        <p class="card-text chakra-petch-regular">USD ${card.price}</p>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                </div>`;
                console.log(card);
        }
    } catch (error) {console.log('[!] Ocurrió un error:', error)}
}

MostrarProductos();