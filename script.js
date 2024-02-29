// function ListPublication() {
//   fetch('http://localhost:3000/Publication')
//     .then(response => response.json())
//     .then(json => remplirePublication(json))
//     .catch(err => console.log(err));
// }



// function ListCommentaire() {
//   fetch('http://localhost:3000/Commentaire')
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err));
// }
// ListCommentaire();



// // remplir le contenu
// function remplirePublication(ListPublication) {

//   for (let i = 0; i < ListPublication.length; i++) {
//     let design = `<div class="col-10 col-lg-3 bloc">
//                     <a class="text-decoration-none" href="index.html?id=${ListPublication[i].id}">
//                         <div class="row">
//                             <div class="card rounded-4 border border-3 border-secondary hover-zoom mx-auto">
//                                 <img class="card-img-top image" src="paysage.jpg" alt="Card image cap">
//                                 <div class="fs-4 p-3 mb-2 bg-secondary text-white card-title" id="titre">${ListPublication[i].Titre}</div>
//                                 <div class="card-body">
//                                     <p class="card-text contenue">${ListPublication[i].Contenu}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </a>
//                   </div>`;



                 
//     document.getElementById("ContenuPublication").innerHTML += design;
//     trimText(document.querySelectorAll(".card-text")[i],50);
//     trimText(document.querySelectorAll(".card-title")[i],15); 
//   }
// }

// ListPublication();

// // trimtext carbody

// function trimText( card ,maxlength) {
//   if(card.textContent.length > maxlength) 
//     card.textContent = card.textContent.substring(0, maxlength)+'...';
// }


// executer une suite de fonction pour le traitement devenement sur le bouton






let currentPage = 1;
    const publicationsPerPage = 6;

    // Fonction pour afficher les publications sur la page actuelle
    function afficherPublicationsSurPage(pageNumber, publications) {
        const startIndex = (pageNumber - 1) * publicationsPerPage;
        const endIndex = pageNumber * publicationsPerPage;
        const publicationsOnPage = publications.slice(startIndex, endIndex);

        // Effacer le contenu précédent
        document.getElementById("ContenuPublication").innerHTML = "";

        // Remplir le contenu avec les publications de la page actuelle
        remplirePublication(publicationsOnPage);
    }

// Fonction pour afficher les boutons de pagination
function afficherPagination(publications) {
  const totalPages = Math.ceil(publications.length / publicationsPerPage);
  const paginationContainer = document.getElementById("pagination");

  // Effacer les boutons précédents
  paginationContainer.innerHTML = "";

  // Bouton "Previous"
const previousButton = document.createElement("button");
previousButton.innerText = "Previous";
previousButton.classList.add("btn", "btn-pagination", "mx-1"); // Ajouter la classe CSS personnalisée
previousButton.style.borderRadius = "20px"; // Appliquer la bordure arrondie au bouton
previousButton.style.fontWeight = "bold"; // Appliquer le texte en gras au bouton
previousButton.style.backgroundColor = "#1645b1"; // Appliquer une couleur de fond transparente au bouton
previousButton.style.color = "white"; // Appliquer la couleur du texte au bouton
previousButton.addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        afficherPublicationsSurPage(currentPage, publications);
    }
});
paginationContainer.appendChild(previousButton);


  // Afficher les boutons de pagination numérotés
  for (let i = 1; i <= totalPages; i++) {
    if (i <= 3 || i >= currentPage - 1 && i <= currentPage + 1 || i > totalPages - 2) {
      const button = document.createElement("button");
      button.innerText = i;
      button.classList.add("btn", "btn-pagination", "mx-1"); // Ajouter la classe CSS personnalisée
      button.style.borderRadius = "20px"; // Appliquer la bordure arrondie au bouton
      button.style.fontWeight = "bold"; // Appliquer le texte en gras au bouton
      button.style.backgroundColor = "#1645b1 "; // Appliquer une couleur de fond transparente au bouton
      button.style.color = "white";
      button.addEventListener("click", function() {
          currentPage = i;
          afficherPublicationsSurPage(currentPage, publications);
      });
          paginationContainer.appendChild(button);
      } else if (i === 4) {
          // Ajouter un bouton "..." si nécessaire
          const ellipsisButton = document.createElement("button");
          ellipsisButton.innerText = "...";
          ellipsisButton.disabled = true;
          ellipsisButton.classList.add("btn", "btn-pagination", "mx-1 bg-gray"); // Ajouter la classe CSS personnalisée
          ellipsisButton.style.borderRadius = "20px";
          ellipsisButton.style.fontWeight = "bold";
          paginationContainer.appendChild(ellipsisButton);
      }
  }

  // Bouton "Next"
  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.classList.add("btn", "btn-pagination", "mx-1"); // Ajouter la classe CSS personnalisée
  nextButton.style.borderRadius = "20px"; // Appliquer la bordure arrondie au bouton
  nextButton.style.fontWeight = "bold"; // Appliquer le texte en gras au bouton
  nextButton.style.backgroundColor = "#1645b1"; // Appliquer une couleur de fond transparente au bouton
  nextButton.style.color = "white";
  nextButton.addEventListener("click", function() {
      if (currentPage < totalPages) {
          currentPage++;
          afficherPublicationsSurPage(currentPage, publications);
      }
  });
  paginationContainer.appendChild(nextButton);
}



    // Fonction pour charger et afficher les publications avec pagination
    function chargerPublicationsAvecPagination() {
        fetch('http://localhost:3000/Publication')
            .then(response => response.json())
            .then(publications => {
                // Afficher les publications sur la première page
                afficherPublicationsSurPage(currentPage, publications);

                // Afficher la pagination
                afficherPagination(publications);
            })
            .catch(err => console.log(err));
    }

    // Appeler la fonction pour charger les publications avec pagination
    chargerPublicationsAvecPagination();

    // Fonction pour remplir les publications
    function remplirePublication(listPublication) {
        listPublication.forEach(publication => {
            const design = `
                <div class="col-10 col-lg-3 bloc">
                    <a class="text-decoration-none" href="index.html?id=${publication.id}">
                        <div class="row">
                            <div class="card rounded-4 border border-3 border-secondary hover-zoom mx-auto">
                                <img class="card-img-top image" src="paysage.jpg" alt="Card image cap">
                                <div class="fs-4 p-3 mb-2 bg-secondary text-white card-title" id="titre">${publication.Titre}</div>
                                <div class="card-body">
                                    <p class="card-text contenue">${publication.Contenu}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`;
            document.getElementById("ContenuPublication").innerHTML += design;
            document.querySelectorAll(".card-text").forEach(card => trimText(card, 60));
            document.querySelectorAll(".card-title").forEach(card => trimText(card, 20));
        });
    }

    // trimtext carbody

    function trimText( card ,maxlength) {
      if(card.textContent.length > maxlength) 
        card.textContent = card.textContent.substring(0, maxlength)+'...';
    }