async function MostrarProductos(contenedor, amount) {
    try {
        const resMensWatches = await fetch('https://dummyjson.com/products/category/mens-watches');
        const mensWatches = await resMensWatches.json();
        const resWomensWatches = await fetch('https://dummyjson.com/products/category/womens-watches');
        const womensWatches = await resWomensWatches.json();
        const allProd = mensWatches.products.concat(womensWatches.products);
        if (amount === undefined) {
            amount = allProd.length
        }
        const max = amount !== undefined ? amount : allProd.length;
        for (let i=0; i<max; i++) {
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

async function MostrarResenias(contenedor, amount) {
    try {
        const resMensWatches = await fetch('https://dummyjson.com/products/category/mens-watches');
        const mensWatches = await resMensWatches.json();
        const resWomensWatches = await fetch('https://dummyjson.com/products/category/womens-watches');
        const womensWatches = await resWomensWatches.json();
        const allProd = mensWatches.products.concat(womensWatches.products);
        let i = 0;
        let cont = 0;
        const max = amount !== undefined ? amount : allProd.length;
        console.log(max)
        while (i < allProd.length && cont < max) {
            let fullStar = `<i class="fa-solid fa-star"></i>`
            let emptyStar = `<i class="fa-regular fa-star"></i>`
            let j = 0;
            console.log(allProd[i].reviews.length)
            while (j < allProd[i].reviews.length && cont < max) {
                console.log(cont)
                if (allProd[i].reviews[j].rating >= 4) {
                    contenedor.innerHTML += `
                    <div class="card">
                        <div class="card-header">
                            ${fullStar.repeat(allProd[i].reviews[j].rating) + emptyStar.repeat(5-allProd[i].reviews[j].rating)}
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                            <p>${allProd[i].reviews[j].comment}</p>
                            <footer class="blockquote-footer">${allProd[i].reviews[j].reviewerName}</footer>
                            </blockquote>
                        </div>
                    </div>`;
                    cont++
                }
                j++
            }
            i++
        }

        // for (let i=0; i<allProd.length; i++) {
        //     let fullStar = `<i class="fa-solid fa-star"></i>`
        //     let emptyStar = `<i class="fa-regular fa-star"></i>`
        //     for (let review of allProd[i].reviews) {
        //         if (review.rating >= 4) {
        //             contenedor.innerHTML += `
        //             <div class="card">
        //                 <div class="card-header">
        //                     ${fullStar.repeat(review.rating) + emptyStar.repeat(5-review.rating)}
        //                 </div>
        //                 <div class="card-body">
        //                     <blockquote class="blockquote mb-0">
        //                     <p>${review.comment}</p>
        //                     <footer class="blockquote-footer">${review.reviewerName}</footer>
        //                     </blockquote>
        //                 </div>
        //             </div>`;
        //         }
        //     }
        // }
    } catch (error) {console.log('[!] Ocurrió un error:', error)}
}

const productos = document.getElementById("productos")
const resenias = document.getElementById("resenias")
if (productos) {
    const amount = productos.getAttribute('data-amount');
    amount ? MostrarProductos(productos,amount) : MostrarProductos(productos);
}
if (resenias) {
    const amount = resenias.getAttribute('data-amount');
    amount ? MostrarResenias(resenias,amount) : MostrarResenias(resenias);
}


