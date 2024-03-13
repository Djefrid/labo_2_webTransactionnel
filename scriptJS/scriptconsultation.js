// Requête AJAX pour obtenir les détails de la publication
const params = new URLSearchParams(window.location.search);
const Id = params.get('id');
//remplir blog
function remplireBlog() {
    fetch(`http://localhost:3000/Publication/${Id}`)
    .then(response => response.json())
    .then(json => loadPublication(json))
    .catch(err => console.log('Erreur lors du chargement des détails de la publication :',err));
}

function loadPublication(publication) {
    // Afficher les détails de la publication
    let  titre = `<p class="text-center h1">${publication.Titre}</p>`;
    let auteur = `<p class="text-center text-decoration-underline h4">${publication.Auteur}</p>`;
    // Insérer les détails de la publication dans la page
    console.log(titre);
    document.getElementById('titre').innerHTML =  titre;
    document.getElementById('auteur').innerHTML =  auteur;
    for (let i = 1; i < 6; i++) 
        document.getElementById(`contenu${i}`).innerHTML = publication.Contenu;
}
remplireBlog();




