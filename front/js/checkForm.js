//déclarer variables pour pointer inputs du formulaire + champs d'erreurs
let form = document.querySelector(".cart__order__form");
// console.log(form.email);
let validForm = document.querySelector(".cart__order__form__submit");

// let firstName = document.getElementById('firstName')
// let lastName = document.getElementById('lastName')
// let address = document.getElementById('address')
// let city = document.getElementById('city')
// let email = document.getElementById('email')

const errorFirstName = document.getElementById("firstNameErrorMsg");
const errorLastName = document.getElementById("lastNameErrorMsg");
const errorAdress = document.getElementById("addressErrorMsg");
const errorCity = document.getElementById("cityErrorMsg");
const errorEmail = document.getElementById("emailErrorMsg");

/* Valisation Email */

//Ecouter la modification de l'email
form.email.addEventListener("change", function () {
  validEmail(this);
});

// créer la fonction pour valider l'email : autoriser les caracteres dans une Regex
const validEmail = function (inputEmail) {
  //création regex pour validation email
  let emailRegExp = new RegExp(
    //premiere partie + 1@ + deuxieme partie + 1. + troisième partie , un flag global
    "^[a-ZA-Z0-9.-_]+[@]{1}[a-ZA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  //pointer errorEmail
  const errorEmail = document.getElementById("emailErrorMsg");

  // tester la regex
  if (emailRegExp.test(inputEmail.value)) {
    console.log(errorEmail);
    errorEmail.textContent = "Email valide";
    errorEmail.classList.add(".error");
    errorEmail.classList.add(".success");
  } else {
    errorEmail.textContent = "Email non valide";
    errorEmail.classList.add(".success");
    errorEmail.classList.add(".error");
  }
};

/* Fin Valisation Email */
