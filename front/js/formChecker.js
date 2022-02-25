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

  if (valueTest && element.value != "") {
    errorMsg.textContent = "";
    return true;
  } else {
    errorMsg.textContent = msg;
    return false;
  }
}

//fonction pour vérifier les champs :
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
    e.preventDefault()
});
