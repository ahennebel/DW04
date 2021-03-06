﻿$(document).ready(function () {

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
                        $('<p class="alarmoff" id="0"><span class="calendar_titre">' + nom + '</span><span class="calendar_date">'
                            + jour + '</span><span class="calendar_heure">' + heure + '</span><a href="#alarm" class="alarm" id="' + timestamp + '">Activer Alarme</a></p>').appendTo(".events");
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
                    var jour = this.jour;
                    var heure = this.heure;
                    var timestamp = this.timestamp;
                    $('<p class="alarmoff" id=0> <span class="calendar_titre">' + nom + '</span><span class="calendar_date">' + jour + '</span>  <span class="calendar_heure">' + heure + '</span><a href="#alarm" class="alarm" id="' + timestamp + '">Activer Alarme</a></p>').appendTo(".events");


                });
            }
        })
    });


    //Gestion des alarmes
    var i = 0;
    $('.events').on('click', '.alarm', function () {
        var status = $(this).parent('.alarmoff').attr('id');
        if (status == 0)
            {
                i = i + 1;
                $(this).css('color', 'green');
                var date = this.id;
                var titre = $(this).prevAll('.calendar_titre').text();                
                $(this).parent('.alarmoff').attr('id', i);                

                //ajout de l'alarme 
                cordova.plugins.notification.local.schedule({
                    id: i,
                    title: titre,
                    message: "Cours imminent",
                    at: date
                });
        }
        else
        {
            //on enleve l'alarme
            var alarmid = $(this).parent('.alarmoff').attr('id');
            $(this).css('color', 'black');
            $(this).parent('.alarmoff').attr('id', 0);            
            alert("Alarme n°"+alarmid+"désactivée");
            cordova.plugins.notification.local.cancel(alarmid, function () {
                alert('notification enlevee');
            }, scope);
                        
           
        }
    });
    
   



});