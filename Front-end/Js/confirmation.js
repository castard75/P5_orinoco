let params = new URL(document.location).searchParams;
let orderIdUrl = params.get("orderId");

const OrderConfirmed = () => {
  //récuperation de l'id de commande (provenant du serveur) dans le localStorage
  const responseOrder = orderIdUrl;
  console.log(`response : ${responseOrder}`);

  //récuperation du prix commande (provenant du serveur) dans le localStorage
  const prixTotalCommande = localStorage.getItem("Prixtotal");
  console.log(`response : ${prixTotalCommande}`);

  //Structure HTML de la page de confirmation
  const positionNumeroCommande = document.getElementById("positionElement1");

  const structureConfirmationCommande = `

<div class="container-recapitulatif-commande_backgroundColor">
<h1>Confirmation de votre commande</h1>
</div>
<div class="recapitulatif-commande">
<p>Merci pour votre commande</p>
<p>
  Votre commande numéro: <span class="gras">${responseOrder}</span> a bien
  été prise en compte
</p>
<p>
  Le montant de votre commande est :
  <span class="gras">${prixTotalCommande}</span>€
</p>
<p class="gras">A bientôt chez Orinoco !</p>
</div>

`;

  //Injection HTML
  positionNumeroCommande.insertAdjacentHTML(
    "afterbegin",
    structureConfirmationCommande
  );
};

OrderConfirmed();
