//récupérer l'id de la card cliquée
//concaténer l'id et affiche dans l'html

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

// console.log(id);

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
  .then(function (product) {
    // console.log(product);

    document.querySelector(".item__img").innerHTML = `
    <img src="${product.imageUrl}" alt="${product.altTXT}"> 
    `;
    document.querySelector("#title").innerText = product.name;

    document.querySelector("#price").innerText = product.price;

    document.querySelector("#description").innerText = product.description;

    const colors = document.querySelector("#colors");

    product.colors.forEach((color) => {
      let option = document.createElement("option");
      option.value = color;
      option.text = color;

      colors.add(option);
    });

    let addToCart = document.getElementById("addToCart");

    addToCart.addEventListener("click", () => {
      let quantity = parseInt(document.querySelector("#quantity").value);
      let color = colors.value;
      let productId = product._id;
      // console.log(quantity, color, productId);

      if (quantity > 0 && quantity < 100 && color != "") {
        let cart = JSON.parse(localStorage.getItem("basket"));
        let cartProduct = [productId, color, quantity];
        console.log(localStorage.getItem("basket"));
        if (cart) {
          // console.log('if');
          cart.push(cartProduct);
        } else {
          // console.log('else');
          cart = [cartProduct];
        }

        localStorage.setItem(JSON.stringify(cart), "basket");
      } else {
        alert(
          "Merci de selectionner une quantitée et une couleur pour poursuivre"
        );
      }
    });
  });
