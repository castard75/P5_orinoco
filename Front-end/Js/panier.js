//Récuperation des produits sélectionnés
let totalProduits = JSON.parse(localStorage.getItem("productChoice"));

//Création de la boucle pour afficher les produits
let totalPrice = 0;
let panierStorage = "";

for (let i in totalProduits) {
  panierStorage += `
  <tr>
  <th scope="row">
    <div class="p-2">
      <img
        src="${totalProduits[i].imageUrl}"
        alt=""
        width="170px"
        class="img-fluid rounded shadow-sm"
      />
      <div class="ml-3 d-inline-block align-middle">
      <h5> ${totalProduits[i].name} </h5>
     
      </div>
    </div>
  </th>

  <td class="align-middle"><strong> ${
    totalProduits[i].price / 100
  } €</strong></td>
  
  
  <td class="align-middle">
    <a href="#" class="text-dark"
      ><i class="fa fa-trash"></i
    ></a>
  </td>
</tr>`;

  totalPrice += totalProduits[i].price;
}

//affichage des produits grace a la boucle
const affichagePanier = document.getElementById("placementArticles");

affichagePanier.innerHTML = panierStorage;

//On affiche le prix total de la commande
let totalDuMontant = `
<div class="py-2 text-uppercase">${totalPrice / 100}€</div>
`;
const leTotal = document.getElementById("totalFinal");
leTotal.innerHTML = totalDuMontant;

let myForm = document.getElementById("myForm");

function firstNameControl(firstName) {
  const lePrenom = document.getElementById("firstName").value;
  if (/^[A-Za-z]{3,20}$/.test(lePrenom)) {
    console.log("OK");

    return true;
  } else {
    console.log("MAUVAIS");

    return false;
  }
}

function lastNameControl(lastName) {
  const leNom = document.getElementById("lastName").value;
  if (/^[A-Za-z]{3,20}$/.test(leNom)) {
    console.log("OK");

    return true;
  } else {
    console.log("KO");

    return false;
  }
}

function adresseControl(adresse) {
  const adressForm = document.getElementById("address").value;
  if (/^[A-Za-z0-9\s]{5,50}$/.test(adressForm)) {
    console.log("OK");

    return true;
  } else {
    console.log("KO");

    return false;
  }
}

function cityControl(city) {
  const laVille = document.getElementById("city").value;
  if (/^[A-Za-z\s]{3,20}$/.test(laVille)) {
    console.log("OK");

    return true;
  } else {
    console.log("KO");

    return false;
  }
}

function emailControl(email) {
  const emailRegex = document.getElementById("email").value;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRegex)) {
    console.log("OK");

    return true;
  } else {
    console.log("KO");

    return false;
  }
}

//Création d'une fonction qui récupere les valeurs du formulaire que l'on stockera dans une variable contact
function getForm() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  return {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };
}
console.log(getForm);
//---------------------------Fin de gestion de la validation------------------------------

function commandOrder(e) {
  e.preventDefault();

  // on stock le formulaire dans l'objet contact que l'on enverra au back
  let contact = getForm();

  //Control du formulaire en rentrant en paramètre les valeurs de l'objet contact
  emailControl(contact.email);
  firstNameControl(contact.firstName);
  lastNameControl(contact.lastName);
  adresseControl(contact.address);
  cityControl(contact.city);

  firstNameControl();
  emailControl();
  lastNameControl();
  adresseControl();
  cityControl();
  //Condition validation formualaire
  if (emailControl(contact.email) == false) {
    let emailError = " Email non valide";
    let emailDisplay = document.querySelector("#email_error");
    emailDisplay.innerHTML = emailError;
    return false;
  } else if (emailControl(contact.email) == true) {
    let emailError = "";
    let emailDisplay = document.querySelector("#email_error");

    emailDisplay.innerHTML = emailError;
  }

  if (firstNameControl(contact.firstName) == false) {
    let messageFirstname =
      "Chiffres et symboles ne sont pas autorisé \n Ne pas dépasser 20 caractères,minimum 3 caractères";
    const firstnameHandler = document.querySelector("#firstname_error");
    firstnameHandler.innerHTML = messageFirstname;
    return false;
  } else if (firstNameControl(contact.firstName) == true) {
    let messageFirstname = " ";
    const validationfirst = document.querySelector("#firstname_error");
    validationfirst.innerHTML = messageFirstname;
  }

  if (lastNameControl(contact.lastName) == false) {
    let lastnameError =
      "Chiffres et symboles ne sont pas autorisé \n Ne pas dépasser 20 caractères,minimum 3 caractères";
    const lastnameHandler = document.querySelector("#lastname_error");
    lastnameHandler.innerHTML = lastnameError;
    return false;
  } else if (lastNameControl(contact.lastName) == true) {
    let messageLastname = " ";
    const validationLastName = document.querySelector("#lastname_error");
    validationLastName.innerHTML = messageLastname;
  }

  if (adresseControl(contact.address) == false) {
    let adressError =
      "Chiffres et symboles ne sont pas autorisé \n Ne pas dépasser 20 caractères,minimum 3 caractères";
    let adressHandler = document.querySelector("#adress_error");
    adressHandler.innerHTML = adressError;
    return false;
  } else if (adresseControl(contact.address) == true) {
    let adressError = "";
    let adressHandler = document.querySelector("#adress_error");
    adressHandler.innerHTML = adressError;
  }

  if (cityControl(contact.city) == false) {
    let cityError =
      "Chiffres et symboles ne sont pas autorisé \n Ne pas dépasser 20 caractères,minimum 3 caractères";
    let cityHandler = document.querySelector("#city_error");
    cityHandler.innerHTML = cityError;
    return false;
  } else if (cityControl(contact.city) == true) {
    let cityError = "";
    let cityHandler = document.querySelector("#city_error");
    cityHandler.innerHTML = cityError;
  }
  //Stockage du  prix total de la commande
  localStorage.setItem("Prixtotal", JSON.stringify(totalPrice));

  //Recuperation et stockages des produits sélectionné dans un tableau pour l'envoie a l'api
  let products = [];

  for (let Product of totalProduits) {
    products.push(Product.id);
  }

  // objet pour envoyer au serveur
  const order = {
    contact,
    products,
  };
  // Envoie de l'objet au serveur
  const promise = fetch(
    "http://localhost:3000/api/teddies/order",

    {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  promise.then(async (response) => {
    //Try catch pour capturer une éventuel éxception
    try {
      //stockage de response
      const contenu = await response.json();
      console.log(contenu);

      if (response.ok) {
        //recuperation de l'orderId du serveur

        console.log("la reponse du order Id est" + contenu.orderId);

        //Aller vers la page de confirmation
        window.location = `confirmation.html?orderId=${contenu.orderId}`;
        removeItem();
      } else {
        `reponse du server :  ${response.status}`;
        alert(`problème avec le serveur : erreur ${response.status} `);
      }
    } catch (e) {
      console.log(e);
    }
  });
}

const removeItem = () => {
  localStorage.removeItem("productChoice");
};
