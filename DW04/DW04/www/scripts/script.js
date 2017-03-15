$(document).ready(function () {

    // Lorsque je soumets le formulaire
    $('#login').on('submit', function (e) {        
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
                        $('#content_login').addClass("unactive");
                        $('#view_calendar').removeClass("unactive");
                        $('<span>' + pseudo + '</span>').appendTo(".nom");
                        $(jQuery.parseJSON(JSON.stringify(json))).each(function () {
                        var nom = this.intitule;
                        var jour = this.jour;
                        var heure = this.heure;
                        var timestamp = this.timestamp;
                        $('<p> <span class="calendar_titre">' + nom + '</span><span class="calendar_date">' + jour +'</span><span>'+ heure +'</span><a href="#" id="'+timestamp+'">Activer Alarme</a></p>').appendTo(".events");                        
                    });                                            
                }
            });
            }
    });

    //Gestion de la deconnection des utilisateurs
    $('#logout').click(function () {
        $.ajax({
            url: 'http://xjapanfan.com/unilimcalendar/logout.php',            
            success: function (html) {
                alert('Vous avez été deconnecté');
                $('#content_login').removeClass("unactive");
                $('#view_calendar').addClass("unactive");
                $('.events').empty();
                $('.nom').empty();
                window.location.href = 'index.html';
            }
        })
    });

    //Gestion du rafraichissement de la page
    $('#actualise').click(function () {
        $.ajax({
            url: 'http://xjapanfan.com/unilimcalendar/traitement.php',
            dataType: 'json', //format de sortie json
            success: function (json) { // Je récupère la réponse du fichier PHP 
                $('#content_login').addClass("unactive");
                $('#view_calendar').removeClass("unactive");
                $('<span>' + pseudo + '</span>').appendTo(".nom");
                $(jQuery.parseJSON(JSON.stringify(json))).each(function () {
                    var nom = this.intitule;
                    var date = this.date;

                    $('<p> <span class="calendar_titre">' + nom + '</span><span class="calendar_date">' + date + '</span><a href="#">Activer Alarme</a></p>').appendTo(".events");


                });
            }
        })
    });



});