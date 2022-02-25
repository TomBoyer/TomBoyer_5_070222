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

/* Gestion du Form */
// declarer variable pour formulaire et regex
let form = document.querySelector(".cart__order__form");
let regexArray = [
  /^[a-zA-Z\u00C0-\u00FF]*$/,
  /^[a-zA-Z0-9\u00C0-\u00FF\s,'-]*$/,
  /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
];
// console.log(form, regexArray);

//fonction pour valider le formulaire
function validForm(element, i, elementinDom, message) {
  const valueTest = regexArray[i].test(element.value);
  const errorMsg = document.querySelector(elementinDom);
  regexArray[i].test("²");

  if (valueTest && element.value != "") {
    errorMsg.textContent = "";
    return true;
  } else {
    errorMsg.textContent = message;
    return false;
  }
}

//fonctions pour vérifier les champs :
//firstName
form.firstName.addEventListener("change", () => {
  validForm(
    form.firstName,
    0,
    "#firstNameErrorMsg",
    "Merci de renseigner votre prénom pour continuer"
  );
});

//lastName
form.lastName.addEventListener("change", () => {
  validForm(
    form.lastName,
    0,
    "#lastNameErrorMsg",
    "Merci de renseigner votre nom pour continuer"
  );
});

//adress
form.address.addEventListener("change", () => {
  validForm(
    form.adress,
    1,
    "#addressErrorMsg",
    "Merci de renseigner une adresse valide pour continuer"
  );
});

//city
form.city.addEventListener("change", () => {
  validForm(
    form.city,
    2,
    "#cityErrorMsg",
    "Merci de renseigner votre ville pour continuer"
  );
});

//email
form.email.addEventListener("change", () => {
  validForm(
    form.email,
    3,
    "#cityEemailErrorMsgrrorMsg",
    "Merci de renseigner une adresse mail valide pour continuer"
  );
});

//fonction pour écouter le bouton submit du formulaire
//valider que tous les champs sont remplis
const orderBtn = document.getElementById("order");

orderBtn.addEventListener("click", (e) => {
  let testValid =
    validForm(
      form.firstName,
      0,
      "#firstNameErrorMsg",
      "Merci de renseigner votre prénom pour continuer"
    ) &&
    validForm(
      form.lastName,
      0,
      "#lastNameErrorMsg",
      "Merci de renseigner votre nom pour continuer"
    ) &&
    validForm(
      form.adress,
      1,
      "#addressErrorMsg",
      "Merci de renseigner une adresse valide pour continuer"
    ) &&
    validForm(
      form.city,
      2,
      "#cityErrorMsg",
      "Merci de renseigner votre ville pour continuer"
    ) &&
    validForm(
      form.email,
      3,
      "#cityEemailErrorMsgrrorMsg",
      "Merci de renseigner une adresse mail valide pour continuer"
    );
  //empecher l'envoie du formulaire si un champs n'est pas complété
  e.preventDefault();

  if (testValid) {
    //si les champs sont bien complétés et que le panier n'est pas vide = ok
    console.log("le test valid est ok")
    if (cartProducts == null) {
      console.log(
        "Merci d'ajouter au moins un article dans votre panier pour effectuer une commande"
      );
    } else if (cartProducts.length == 0) {
      console.log(
        "Merci d'ajouter au moins un article dans votre panier pour effectuer une commande"
      );
    } else {
      //stocker l'/les id(s) dans un tableau
      const items = [];
      cartProducts.forEach((item) => {
        items.push(item.id);
      });
      //déclarer les informations de contact dans un objet
      const contact = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
      };
      // déclarer la commande = les items + les infos de contact dans un objet
      const infosOrder = {
        items,
        contact,
      };

      //Besoin de récupérer l'id par l'api
      const datas = {
        method: "POST",
        body: JSON.stringify(infosOrder),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      fetch("http://localhost:3000/api/products/", datas)
      .then(function (result) {
        if (result.ok) {
          return result.json();
        }
      })
      .then(function(listDatas) {
        localStorage.setItem("orderId", JSON.stringify(listDatas.orderID))
        document.location.href = `confirmation.html?id=${listDatas.orderID}`
      })
      .catch(function (err) {
        //An error has occurred
        console.log("Une erreur est survenue merci de réesayer");
      });
    }
  } else {
    //si tous les champs ne sont pas bien complétés ou que le panier est vide = prévenir que le formulaire n'est pas complété
    console.log(
      "Merci d'ajouter au moins un article dans votre panier et de compléter tous les champs correctement afin de finaliser votre commande"
    );
  }
});

/* Fin Gestion du Form */
