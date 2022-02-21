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

    //ajouter au panier : écoute du bouton pour ajouter les éléments de la selections dans le local storage

    let addToCart = document.getElementById("addToCart");

    addToCart.addEventListener("click", () => {
      let quantity = parseInt(document.querySelector("#quantity").value);
      let color = colors.value;
      let productId = product._id;
      // console.log(quantity, color, productId);

      //stocker la selection dans le local storage si quantité et couleur valide
      if (quantity > 0 && quantity < 100 && color != "") {
        let cart = JSON.parse(localStorage.getItem("basket"));
        let cartProduct = [productId, color, quantity];
        // console.log(localStorage.getItem("basket")); normal 2 click necessaires ?

        if (cart) {
          //si item dans le local storage
          // console.log('if');
          cart.push(cartProduct);
        } else {
          //si pas d'item dans le local storage
          // console.log('else');
          cart = [cartProduct];
        }

        localStorage.setItem("basket", JSON.stringify(cart));

        //alert pour préciser au user les infos stockées dans le panier
        // alert(
        //   `Vous venez d'ajouter ${quantity} ${product.name} ${color} à votre panier`
        // );

        //PopUp pour préciser au user les infos stockées dans le panier
        const popupConfirmation = () => {
          if (
            window.confirm(
              `Vous venez d'ajouter ${quantity} ${product.name} ${color} à votre panier
              
Consulter le panier OK ou revenir à l'accueil ANNULER`
            )
          ) {
            window.location.href = "cart.html";
          } else {
            window.location.href = "index.html";
          }
        };
        popupConfirmation();
      } else {
        //alerter user si item non valide
        alert("Merci de choisir une quantitée et une couleur pour poursuivre");

        // window.confirm(`Merci de selectionner une quantitée et une couleur pour poursuivre`)
      }

      // localStorage.getItem("basket");
      // localStorage.removeItem('basket')
    });
  })
  .catch(function (err) {
    //An error has occurred
    alert("Une erreur est survenue merci de réesayer");
  });
