//récupérer la variable (chariot de produits) précédement créée pour stocker les infos dans le local storage
let cartProducts = JSON.parse(localStorage.getItem("basket"));
// console.log(cartProducts);

//afficher les produits du panier
//pointer les emplacements : cartItem + prix total + quantitée totale, puis injecter les infos stockées dans le local storage + API
const cartItems = document.getElementById("cart__items");
let totalPrice = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");

//si pas d'item dans le local storage : afficher "le panier est vide" + prix = 0 + quantitée = pas d'article
if (cartProducts === null) {
  const emptyBasket = `
  <div class="cart__empty"> 
  <p>Le panier est vide</p>
  </div>
  `;

  cartItems.innerHTML = emptyBasket;
  totalPrice.textContent = "0";
  totalQuantity.textContent = "Aucune séléction dans le panier des";
} else {
  //si items dans le local storage : récupérer les infos stockées dans le local storage et les injecter dans les emplacements dédiés de la page cart.html

  //déclarer prix total et quantitée total pour calcul + affichage
  let totalP = 0;
  let totalQ = 0;

  //boucle pour parcourir tous les produits présents dans le local storage
  cartProducts.forEach((cartProduct) => {
    //localiser l'id dans le local storage
    let id = cartProduct[0];
    // console.log(id);

    //utiliser Fetch pour récupérer les infos dans l'API en fonction de l'id stockée dans le local storage + traduire l'affichage
    fetch("http://localhost:3000/api/products/" + id, {
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
      //pointer les noeuds pour injecter les infos de l'api + local storage
      .then(function (product) {
        let price = product.price;
        let quantity = cartProduct[2];
        let totalPriceRaw = price * quantity;
        // console.log(totalPriceRaw);

        totalP = totalP + totalPriceRaw;
        // console.log(totalP);
        totalQ = totalQ + quantity;
        // console.log(totalQ);

        cartItems.innerHTML += `
        <article class="cart__item" data-id="${id}" data-color="${cartProduct[1]}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${cartProduct[1]}</p>
                <p>${totalPriceRaw} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartProduct[2]}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem"><ion-icon name="trash-outline"></ion-icon></p>
                </div>
                </div>
            </div>
        </article>
        `;

        totalPrice.textContent = totalP;
        totalQuantity.textContent = totalQ;
        // console.log(totalP);

        // // créer function pour supprimer un article
        // function deleteArticle(i) {
        //   cartProducts.splice(i, 1);
        //   localStorage.setItem("basket", JSON.stringify(cartProducts));
        //   //  location.reload();
        // }

        // // eventlistener sur la corbeille pour remove un article complet
        // let btnDeletItem = document.querySelectorAll(".deleteItem");
        // console.log(btnDeletItem);

        // btnDeletItem.add
      });
  });
}

// // eventlistener sur le select pour augmenter/diminuer dynamiquement la quantitée et le prix
