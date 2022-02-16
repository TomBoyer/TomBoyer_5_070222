//récupérer l'id de la card cliquée
//concaténer l'id et affiche dans l'html

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

// console.log(id);

//récup l'id de l'item cliqué surl a page précédente

fetch("http://localhost:3000/api/products/" + id, {
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
})
  //traduire le résultat en Json
  .then(function (result) {
    if (result.ok) {
      return result.json();
    }
  })

  //pointer les emplacements et injecter img+titre+prix+description
  .then(function (product) {
    // console.log(product);

    document.querySelector(".item__img").innerHTML = `
    <img src="${product.imageUrl}" alt="${product.altTXT}"> 
    `;
    document.querySelector("#title").innerText = product.name;

    document.querySelector("#price").innerText = product.price;

    document.querySelector("#description").innerText = product.description;

    //afficher les couleurs de l'api

    const colors = document.querySelector("#colors");

    product.colors.forEach((color) => {
      let option = document.createElement("option");
      option.value = color;
      option.text = color;

      colors.add(option);
    });

    //ajouter au panier

    let addToCart = document.getElementById("addToCart");

    addToCart.addEventListener("click", () => {
      let quantity = parseInt(document.querySelector("#quantity").value);
      let color = colors.value;
      let productId = product._id;
      // console.log(quantity, color, productId);

      //stocker la selection dans le local storage si quantité et couleur valides

      if (quantity > 0 && quantity < 100 && color != "") {
        let cart = JSON.parse(localStorage.getItem("basket"));
        let cartProduct = [productId, color, quantity];
        // console.log(localStorage.getItem("basket"));
        if (cart) {
          // console.log('if');
          cart.push(cartProduct);
        } else {
          // console.log('else');
          cart = [cartProduct];
        }

        localStorage.setItem("basket", JSON.stringify(cart));
      } else {
        //alerter user si item non valide
        alert(
          "Merci de selectionner une quantitée et une couleur pour poursuivre"
        );
      }
    });
  });
