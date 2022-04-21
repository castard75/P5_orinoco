let params = new URL(document.location).searchParams;

//Récuperation de l'id du produit sélectionné via l'url
let id = params.get("id");

//Création de l'url pour récupéré les données de l'ours
let url = "http://localhost:3000/api/teddies/" + id;

//Création de la classe produit pour crée un objet de chaque produit
class Produit {
  constructor(id, name, price, imageUrl, colors) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.colors = colors;
  }
}

let produitOurs = "";

//On va chercher les informations du produit sélectionné dans l'url pour l'afficher a l'écran
function product() {
  try {
    fetch(url)
      .then(function (res) {
        if (res.ok) {
          console.log(true);
          return res.json();
        } else {
          alert(
            "Notre site rencontre un problème veuillez réessayer ultérieurement"
          );
        }
      })
      .then(function (value) {
        const ours = value;

        console.log(ours);
        //création d'une instance de la class Produit avec les valeur de la const ours
        produitOurs = new Produit(
          ours._id,
          ours.name,
          ours.price,
          ours.imageUrl,
          ours.colors
        );

        console.log(produitOurs);
        let colors = "";

        //Création d'une boucle pour afficher les couleurs disponible
        for (i in produitOurs.colors) {
          colors += `<option value="1">${produitOurs.colors[i]}</option>`;
        }

        const productDisplay = () => {
          let productPage = `
          <div class=" card box-shadow taille ">
          <div class="card-header">
            <h4 class="my-0 size font-weight-normal">${produitOurs.name}</h4>
          </div>
          <div class="ours_article "> <img class="img-fluid " src=" ${
            produitOurs.imageUrl
          }" alt="imageOurs"> </div>
          <div class="card-body">
         <div class="price-center">
            <h1 class="card-title pricing-card-title price-size">
            ${produitOurs.price / 100} €
            </h1>
            <div class="button_fixer">
            
            <button
              type="button"
              class="btn btn-lg  btn-widht add-to-cart btn-outline-primary "
              onClick="addToCart()"
            >
             Ajouter au panier
            </button>
            <label for="color-select" class="btn">Choix couleur :</label>
            <select name="color" id="color-select" class="btn btn-lg  btn-widht add-to-cart btn-outline-primary">
            ${produitOurs.colors}</select>
            
          </div>
        
        
       
        </div>
        
        
      
        
      
      `;
          return productPage;
        };
        productDisplay();
        //Affichage du produit

        //Insertion de notre page dans le Html
        const pageOurs = document.getElementById("main-product");
        pageOurs.innerHTML = productDisplay();

        const colorInsertion = document.getElementById("color-select");
        colorInsertion.innerHTML = colors;
      });
  } catch (e) {
    console.log("Retour du serveur : " + e);
  }
}

product();

//Function pour l'ajout du produit au panier
function addToCart() {
  if (localStorage.getItem("productChoice") != null) {
    let produitStock = JSON.parse(localStorage.getItem("productChoice")); // recupère le tableau et stockage dans produtiStock
    console.log("productChoice");
    console.log(produitStock);
    produitStock.push(produitOurs); // ajout du nouveau produit
    localStorage.setItem("productChoice", JSON.stringify(produitStock));
    alert("votre produit a bien été ajouté au panier");
    // renvoie la nouvel valeur du tableau dans le stockage
  } else {
    // Si il y a pas encore de produit stocké

    let produitStock = [];
    produitStock.push(produitOurs); // on stock notre object dans le tableau

    localStorage.setItem("productChoice", JSON.stringify(produitStock));
    alert("votre produit a bien été ajouté au pianier");

    console.log(localStorage.getItem("productChoice"));
    // on envoie le tableau dans le stockage grace a la function add to cart
  }
}
