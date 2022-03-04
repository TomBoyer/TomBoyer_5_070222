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
