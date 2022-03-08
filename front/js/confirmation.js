// récupérer l'objet data stocké dans le local storage
// créer fonction pour pointer la confirmation et injecter le numéro de commande si le local storage existe

// const contact = JSON.parse(localStorage.getItem("contact"));
// const cartProducts = JSON.parse(localStorage.getItem("basket"));

// // const products = [];

// cartProducts.forEach((cartProduct) => {
//   for (let i = 0; i < cartProduct[2]; i++) {
//     products.push(cartProduct[0]);
//   }
// });
// // console.log(products, contact);

const orderId = document.getElementById("orderId");

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("orderId");

orderId.textContent = id;

//créer une fonction pour vider le local storage
function clearLocalStorage() {
  localStorage.removeItem("contact");
  localStorage.removeItem("basket");
}
// clearLocalStorage();
