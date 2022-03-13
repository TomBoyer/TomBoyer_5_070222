
// console.log(products, contact);

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
clearLocalStorage();
