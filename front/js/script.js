//Afficher l'ensemble des produits retournés par l'API : Get

//1. test de l'url de l'API : penser à lancer le serv (cf readme)
//2. fetch l'url
//3. then une function de resultat
//4. then une fonction de valeurs si resulats ok
//5. créer un boucle qui va recupérer toutes les values
//6. pour chaque données récup dans l'API injecter une nouvelle card (exp dans le HTML)
//7. pour chaque card trier les infos en remplaçant les "infos à afficher" par les chemins respectifs des données de l'API

fetch("http://localhost:3000/api/products/", {
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
})
  .then(function (result) {
    if (result.ok) {
      return result.json();
    }
  })
  .then(function (products) {
    // console.log(value);

    products.forEach((product) => {
      // console.log(data);
      document.getElementById("items").innerHTML += `
      <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
      `;
    });
  })
  .catch(function (err) {
    //An error has occurred
    alert('Une erreur est survenue merci de réesayer')
  });
