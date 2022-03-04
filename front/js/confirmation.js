// récupérer l'objet data stocké dans le local storage
// créer fonction pour pointer la confirmation et injecter le numéro de commande si le local storage existe

const contact = JSON.parse(localStorage.getItem("contact"));
const cartProducts = JSON.parse(localStorage.getItem("basket"));
const orderId = document.getElementById("orderId");

const products = [];

cartProducts.forEach((cartProduct) => {
  for (let i = 0; i < cartProduct[2]; i++) {
    products.push(cartProduct[0]);
  }
});
// console.log(products, contact);

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
  .then((dataList) => {
    console.log(dataList);
    orderId.textContent = dataList.orderId;
  })
  .catch(function (err) {
    //An error has occurred
    alert("Une erreur est survenue merci de réesayer");
  });

//créer une fonction pour vider le local storage
function clearLocalStorage() {
  localStorage.removeItem("contact");
  localStorage.removeItem("basket");
}
clearLocalStorage();
