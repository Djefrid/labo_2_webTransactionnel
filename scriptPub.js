 $(document).ready(function () {
    $('#publicationForm').submit(function (e) {
        e.preventDefault();
        confirmerEnvoiPublication();
    
    })
    }); 

let listPublication;

function ListPublication() {
    fetch('http://localhost:3000/Publication')
        .then(response => response.json())
        .then(json => {
            listPublication = json;
        })
        .catch(err => console.log(err));
}

function confirmerEnvoiPublication() {
    // Construction de l'objet à envoyer
    let publication = {
        Titre: $('#titre').val(),
        Auteur: $('#auteur').val(),
        DateP: new Date().toISOString().slice(0, 10),
        Contenu: $('#contenu').val()
    };

    // Affichage de la boîte de dialogue de confirmation
    $("#confirmationDialog").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        title: "Confirmer l'envoi",
        buttons: {
            "Confirmer": function() {
                $(this).dialog("close");
                envoyerPublication(publication);
                
            },
            "Annuler": function() {
                $(this).dialog("close");
            }
        }
    }).text("Voulez-vous vraiment envoyer cette publication ?");
}

function envoyerPublication(publication) {
    // Envoi de la requête POST
    fetch('http://localhost:3000/Publication', {
        method: 'POST',
        body: JSON.stringify(publication),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Publication ajoutée avec succès :', data);
            //alert('Publication ajoutée avec succès !');
            // Redirection vers la page principale
            window.location.href = 'acceiul.html';
        })
        .catch(error => console.error('Erreur lors de l\'ajout de la publication :', error));
}


