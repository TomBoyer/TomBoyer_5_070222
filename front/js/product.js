//récupérer l'id de la card cliquée
//concaténer l'id et affiche dans l'html

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

console.log(id);

fetch("http://localhost:3000/api/products/" + id, {
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
})
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);

    document.getElementById('item__img').innerText = value.imageUrl
  });
