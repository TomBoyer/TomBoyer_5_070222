//récupérer la variable (chariot de produits) précédement créée pour stocker les infos dans le local storage
let cartProducts = JSON.parse(localStorage.getItem("basket"));
// console.log(cartProducts[0]);

//afficher les produits du panier
//pointer les emplacements : cartItem + prix total + quantitée totale, puis injecter les infos stockées dans le local storage + API
const cartItems = document.getElementById("cart__items");
let totalPrice = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");

// gérer dynamiquement la suppression
function deletArticle(i, rowElmnt) {
  cartProducts.splice(i, 1);
  localStorage.setItem("basket", JSON.stringify(cartProducts));
  // location.reload();
  rowElmnt.remove();
}

//fonction panier affichage vide + disable form
function noItems() {
  const emptyBasket = `
  <div class="cart__empty"> 
  <p>Le panier est vide</p>
  </div>
  `;

  cartItems.innerHTML = emptyBasket;
  totalPrice.textContent = "0";
  totalQuantity.textContent = "Aucune séléction dans le panier des";

  const form = document.querySelector(".cart__order__form");
  // console.log(form);
  form.classList.add("disableForm");
}

//si pas d'item dans le local storage : afficher "le panier est vide" + prix = 0 + quantitée = pas d'article ET cacher le form
if (cartProducts === null) {
  noItems();
} else {
  //si items dans le local storage : récupérer les infos stockées dans le local storage et les injecter dans les emplacements dédiés de la page cart.html

  //déclarer prix total et quantitée total pour calcul + affichage
  let totalP = 0;
  let totalQ = 0;

  let priceArray = [];

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
        priceArray.push(product.price);
        let quantity = cartProduct[2];
        let totalPriceRaw = price * quantity;
        // console.log(totalPriceRaw);

        totalP = totalP + totalPriceRaw;
        totalQ = totalQ + quantity;
        // console.log(totalQ, totalP);

        cartItems.innerHTML += `
        <article class="cart__item" data-id="${id}" data-color="${cartProduct[1]}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${cartProduct[1]}</p>
                <p class="product__price" id="product__price">${totalPriceRaw} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" id="itemQuantity" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${cartProduct[2]}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem"><ion-icon name="trash-outline"></ion-icon></p>
                </div>
                </div>
            </div>
        </article>
        `;

        //prix total et quantitée totale
        totalPrice.textContent = totalP;
        totalQuantity.textContent = totalQ;
        // console.log(totalP);

        // eventlistener sur le select pour augmenter/diminuer dynamiquement la quantitée et le prix
        let selectQuantity = document.querySelectorAll(".itemQuantity");

        selectQuantity.forEach((quantity, i) => {
          quantity.addEventListener("change", () => {
            // console.log(quantity.value, i);

            if (quantity.value == 0) {
              deletArticle(
                i,
                quantity.parentElement.parentElement.parentElement.parentElement
              );
              // console.log(quantity.parentElement.parentElement.parentElement.parentElement);
            } else {
              let newPrice = document.querySelectorAll(".product__price");
              // console.log(priceArray[i]);
              newPrice[i].textContent =
                String(quantity.value * priceArray[i]) + " €";
              // console.log(newPrice[i]);
              // console.log(cartProducts[i][2], quantity.value, priceArray[i]);
              // console.log(totalQ, cartProducts[i][2], parseInt(quantity.value));

              totalQ = 0;
              totalP = 0;
              cartProducts[i][2] = quantity.value;

              cartProducts.forEach((product, key) => {
                totalQ = totalQ + parseInt(product[2]);
                totalP = totalP + parseInt(product[2] * priceArray[key]);
              });

              totalQuantity.textContent = totalQ;

              totalPrice.textContent =
                totalP -
                cartProducts[i][2] * priceArray[i] +
                parseInt(quantity.value) * priceArray[i];
            }

            
          });
        });

        let deletBtn = document.querySelectorAll(".deleteItem");

        deletBtn.forEach((btn, i) => {
          btn.addEventListener("click", () => {
            deletArticle(
              i,
              btn.parentElement.parentElement.parentElement.parentElement
            );
            // console.log(btn.parentElement.parentElement.parentElement.parentElement);
          });
        });
      });
  });
}

//------------------
//partie du form-checker
//------------------

//1. pointer les inputs
const inputs = document.querySelectorAll(
  'input[type="text"],input[type="email"]'
);

//1.1 déclarer les variables de stockage d'informations
let firstName, lastName, address, city, email; //variable stockant les infos

//1.2 déclarer la logique de controle dynamique
const errorDisplay = (tag, message /* valid */) => {
  const errorMsg = document.querySelector("#" + tag + "ErrorMsg");
  errorMsg.textContent = message;
};

//1.3 déclarer logique de contrôle pour chaque input
//1.3.1 firstName
const firstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    //tester longueur
    errorDisplay("firstName", "le prénom doit faire entre 3 et 20 caractères"); //le tag est donc firstName, le msg est donc blabla 3-20
    firstName = null; //je vide la variable firstName si pas valide
  } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
    //je test le caractères
    errorDisplay(
      "firstName",
      "le prénom ne doit pas contenir de caracteres spéciaux"
    ); //le tag est donc firstName, le msg est donc blabla caract spe
    firstName = null; //je vide la variable firstName si pas valide
  } else {
    //je valide
    errorDisplay("firstName", "", true); //le tag est donc firstName, le msg y'en a pas, on passe sur true
    firstName = value; //on récupère l'info écrite dans l'input grace à value
  }
};

//1.3.2 lastName
const lastNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    //tester longueur
    errorDisplay("lastName", "le nom doit faire entre 3 et 20 caractères"); //le tag est donc lastName, le msg est donc blabla 3-20
    lastName = null; //je vide la variable lastName si pas valide
  } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
    //je test les caractères
    errorDisplay(
      "lastName",
      "le nom ne doit pas contenir de caracteres spéciaux"
    ); //le tag est donc lastName, le msg est donc blabla caract spe
    lastName = null; //je vide la variable lastName si pas valide
  } else {
    //je valide
    errorDisplay("lastName", "", true); //le tag est donc lastName, le msg y'en a pas, on passe sur true
    lastName = value; //on récupère l'info écrite dans l'input grace à value
  }
};

//1.3.3 address
const addressChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 30)) {
    //tester longueur
    errorDisplay("address", "l'adresse doit faire entre 3 et 30 caractères"); //le tag est donc adress, le msg est donc blabla 3-30
    address = null; //je vide la variable address si pas valide
  } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
    //je test les caractères
    errorDisplay(
      "address",
      "l'adresse ne doit pas contenir de caracteres spéciaux"
    ); //le tag est donc address, le msg est donc blabla caract spe
    address = null; //je vide la variable address si pas valide
  } else {
    //je valide
    errorDisplay("address", "", true); //le tag est donc address, le msg y'en a pas, on passe sur true
    address = value; //on récupère l'info écrite dans l'input grace à value
  }
};

//1.3.4 city
const cityChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 30)) {
    //tester longueur
    errorDisplay("city", "la ville doit faire entre 3 et 30 caractères"); //le tag est donc city, le msg est donc blabla 3-30
    city = null; //je vide la variable city si pas valide
  } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
    //je test les caractères
    errorDisplay(
      "city",
      "la ville ne doit pas contenir de caracteres spéciaux"
    ); //le tag est donc city, le msg est donc blabla caract spe
    city = null; //je vide la variable city si pas valide
  } else {
    //je valide
    errorDisplay("city", "", true); //le tag est donc city, le msg y'en a pas, on passe sur true
    city = value; //on récupère l'info écrite dans l'input grace à value
  }
};

//1.3.5 email
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    //je test les caractères
    errorDisplay("email", "Le mail n'est pas valide"); //le tag est donc email, le msg est donc pas valide
    email = null; //je vide la variable email si pas valide
  } else {
    //je valide
    errorDisplay("email", "", true); //le tag est donc email, le msg y'en a pas, on passe sur true
    email = value; //on récupère l'info écrite dans l'input grace à value
  }
};

//2. logique de controle : on a besoin d'analyser ce qui est dans les inputs et de valider ou non
inputs.forEach((input) => {
  //pour chaque input présent dans la const inputs je vérifie que les données = valides
  input.addEventListener("input", (e) => {
    //j'écoute les inputs
    // console.log(e.target.id); //j'affiche l'id de l'input ou je suis
    // console.log(e.target.value); //j'affiche la valeur écrite dans l'input ou je suis
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "address":
        addressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

//3.Récupérer les données écrites par le user dans les inputs
//3.1 déclarer la const pour cibler le form
const form = document.querySelector(".cart__order__form");
// console.log(form);

//3.2
form.addEventListener("submit", (e) => {
  // console.log("le form part");
  e.preventDefault();

  if (firstName && lastName && address && city && email) {
    const contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };
    console.log(contact);

    const products = [];

    cartProducts.forEach((cartProduct) => {
      for (let i = 0; i < cartProduct[2]; i++) {
        products.push(cartProduct[0]);
      }
    });
    console.log(products);

    //stocker dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));
    // /body: JSON.stringify({ contact, products }),
    //stocker dans le local storage
    localStorage.setItem("basket", JSON.stringify(cartProducts));

    inputs.forEach((input) => {
      input.value = "";
    });

    (firstName = null),
      (lastName = null),
      (address = null),
      (city = null),
      (email = null);

    // alert("ok ça c'est fait");

    //utiliser un fecth sur le /order : utiliser POST, contact puis le produit sous forme string. stringify
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        products,
        contact,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          return result.json();
        }
      })
      .then((order) => {
        console.log(order);
        window.location.href = `confirmation.html?orderId=${order.orderId}`;
      })
      .catch(function (err) {
        //An error has occurred
        alert("Une erreur est survenue merci de réesayer");
      });
  } else {
    alert("manque un truc chef");
  }
});

//------------------
//partie du text-anim
//------------------
const target = document.getElementById("target");
let array = ["Prénom", "Nom", "Adresse", "Ville", "Email"];
let wordIndex = 0;
let letterIndex = 0;

// target.textContent = array[0];

const createLettre = () => {
  const letter = document.createElement("div");
  target.appendChild(letter);

  letter.textContent = array[wordIndex][letterIndex];

  setTimeout(() => {
    letter.remove();
  }, 2000);
};

const loop = () => {
  setTimeout(() => {
    if (wordIndex >= array.length) {
      wordIndex = 0;
      letterIndex = 0;
      loop();
    } else if (letterIndex < array[wordIndex].length) {
      createLettre();
      letterIndex++;
      loop();
    } else {
      wordIndex++;
      letterIndex = 0;
      setTimeout(() => {
        loop();
      }, 2000);
    }
  }, 60);
};
loop();
