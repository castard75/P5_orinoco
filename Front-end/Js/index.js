//Recuperation des articles

function getArticles() {
  try {
    fetch("http://localhost:3000/api/teddies")
      .then(function (res) {
        if (res.ok) {
          return res.json();
        } else {
          alert(
            "Notre site rencontre un problème veuillez réessayer ultérieurement"
          );
        }
      })
      .then(function (value) {
        console.log(value);
        //stockage de la response dans tableauOurs
        const tableauOurs = value;
        addArticles(tableauOurs);
      });
  } catch (e) {
    console.log("Retour du serveur : " + e);
  }
}

getArticles();

//Ajout des articles dans mon html
function addArticles(tableauOurs) {
  let articles = "";
  for (let i in tableauOurs) {
    articles += `
   
    <div class=" card mb-4 box-shadow">
    <div class="card-header">
      <h4 class="my-0 size font-weight-normal">${tableauOurs[i].name}</h4>
    </div>
    <div class="ours_article "> <img class="img-fluid " src=" ${
      tableauOurs[i].imageUrl
    }" alt="imageOurs"> </div>
    <div class="card-body">
   
      <h1 class="card-title pricing-card-title">
      ${tableauOurs[i].price / 100} €
      </h1>
      <a href="product.html?id=${tableauOurs[i]._id}">
      <button
        type="button"
        class="btn btn-lg  btn-widht btn-outline-primary"
      >
       Voir produit
      </button>
      </a>
    </div>
  
  
 
  </div>
    `;
  }

  const personne1 = document.getElementById("listeArticles");
  personne1.innerHTML = articles;
}
