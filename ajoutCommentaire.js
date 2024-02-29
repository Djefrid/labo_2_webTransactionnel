$("#envoyerCommentaire").click(function (e) {
    e.preventDefault();
    EnvoiCommentaire();
});

// Fonction pour envoyer un commentaire
function EnvoiCommentaire() {
    const params = new URLSearchParams(window.location.search);
    const Id = params.get('id');
   
    fetch(`http://localhost:3000/Commentaire`, {
        method: 'POST',
        body: JSON.stringify({
            Publicationid: Id,
            DateC: new Date().toISOString().slice(0, 10),
            Contenu: $('#commentairSaisie').val()     
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => {
        console.log(response.status);
        return response.json();
    })
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

// Fonction pour remplir les commentaires
function remplireCommentaire() {
    const params = new URLSearchParams(window.location.search);
    const Id = params.get('id');
    
    fetch(`http://localhost:3000/Commentaire?Publicationid=${Id}`)
    .then(response => response.json())
    .then(commentaires => {
        // Insérer tous les commentaires dans la page
        let design = '';
        commentaires.forEach(commentaire => {
            design += `<div class="col-12 col-sm-4 col-lg-12 ContenuCommentaire" id="testEnEscalier">
                            ${commentaire.Contenu}
                        </div>`;
        });
        document.getElementById('commentaireAjouteAutomatiquement').innerHTML = design;
    })
    .catch(err => console.log(err));
}

// Appeler la fonction remplireCommentaire une fois au chargement de la page
remplireCommentaire();

// Attacher la fonction EnvoiCommentaire au clic sur le bouton

