//Afficher l'ensemble des produits retournés par l'API : Get

//1. test de l'url de l'API : penser à lancer le serv (cf readme)

fetch("http://localhost:3000/api/products/", {
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
})
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    // console.log(value);

    value.forEach((data) => {
      console.log(data);
      document.getElementById('items').innerHTML += 
      `
      <a href="./product.html?id=${data._id}">
            <article>
              <img src="${data.imageUrl}" alt="${data.altTxt}">
              <h3 class="productName">${data.name}</h3>
              <p class="productDescription">${data.description}</p>
            </article>
          </a>
      `
    });
  });
