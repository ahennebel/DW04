$(document).ready(function () {
    // Lorsque je soumets le formulaire
    $('#login').on('submit', function (e) {
        console.log('je suis passe dans le jquery');
        e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire

        var $this = $(this); // L'objet jQuery du formulaire

        // Je récupère les valeurs
        var pseudo = $('#identifiant').val();
        var password = $('#password').val();

        // Je vérifie une première fois pour ne pas lancer la requête HTTP
        // si je sais que mon PHP renverra une erreur
        if (pseudo === '' || password === '') {
            alert('Les champs doivent êtres remplis');
        } else {
            // Envoi de la requête HTTP en mode asynchrone
            $.ajax({
                url: 'http://xjapanfan.com/unilimcalendar/traitement.php', // Le nom du fichier indiqué dans le formulaire
                type: 'POST', // La méthode indiquée dans le formulaire (get ou post)
                data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
                dataType: 'json', //format de sortie json
                success: function (json) { // Je récupère la réponse du fichier PHP                     
                    $(jQuery.parseJSON(JSON.stringify(json))).each(function() {  
                        var nom = this.intitule;
                        var date = this.date;

                        $('<p> <span class="calendar_titre">'+nom+'</span><span class="calendar_date">'+date+'</span><a href="#">Activer Alarme</a></p>').appendTo("#view_calendar");
                         
                        //document.write(nom + date + "<br>");
                    });
                    //document.write(JSON.stringify(json));
                    
                    //alert(JSON.stringify(json));                             
                }
        
    });
});