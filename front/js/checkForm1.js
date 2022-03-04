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
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector(
    ".cart__order__form__question" + "." + tag
  );
  const errorMsg = document.querySelector("#" + tag + "ErrorMsg");

//   console.log(container);
//   console.log(p);

  if (!valid) {
    container.classList.add("error");
    errorMsg.textContent = message;
  } else {
    container.classList.remove("error");
    errorMsg.textContent = message;
  }
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
console.log(form);

//3.2 
form.addEventListener("submit", (e) => {
  console.log("le form part");
  e.preventDefault();

  if (firstName && lastName && address && city && email) {
    const data = {

      firstName : firstName,
      lastName : lastName,
      address : address,
      city : city,
      email : email,
    };
    console.log(data);

    inputs.forEach((input) => {
      input.value = "";
    });

    firstName = null,
      lastName=null,
      address=null,
      city=null,
      email=null

    alert("ok ça c'est fait");
  } else {
    alert("manque un truc chef");
  }
});

//------------------
//partie du text-anim
//------------------
const target = document.getElementById("target");
let array = ["Prénom", "Nom", "Adress", "Ville", "Email"];
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
    } else if  (letterIndex < array[wordIndex].length) {

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