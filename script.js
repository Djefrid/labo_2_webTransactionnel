function ListPublication() {
  fetch('http://localhost:3000/Publication')
    .then(response => response.json())
    .then(json => remplirePublication(json))
    .catch(err => console.log(err));
}



function ListCommentaire() {
  fetch('http://localhost:3000/Commentaire')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
}
ListCommentaire();



// remplir le contenu
function remplirePublication(ListPublication) {

  for (let i = 0; i < ListPublication.length; i++) {
    let design = `<div class="col-10 col-lg-3 bloc">
                    <a class="text-decoration-none" href="index.html?id=${ListPublication[i].id}">
                        <div class="row">
                            <div class="card rounded-4 border border-3 border-secondary hover-zoom mx-auto">
                                <img class="card-img-top image" src="paysage.jpg" alt="Card image cap">
                                <div class="fs-4 p-3 mb-2 bg-secondary text-white card-title" id="titre">${ListPublication[i].Titre}</div>
                                <div class="card-body">
                                    <p class="card-text contenue">${ListPublication[i].Contenu}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                  </div>`;



                 
    document.getElementById("ContenuPublication").innerHTML += design;
    trimText(document.querySelectorAll(".card-text")[i],50);
    trimText(document.querySelectorAll(".card-title")[i],15); 
  }
}

ListPublication();

// trimtext carbody

function trimText( card ,maxlength) {
  if(card.textContent.length > maxlength) 
    card.textContent = card.textContent.substring(0, maxlength)+'...';
}


// executer une suite de fonction pour le traitement devenement sur le bouton






