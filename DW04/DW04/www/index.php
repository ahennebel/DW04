
//Connexion BDD
<?php
try
{
$bdd = new PDO('mysql:host=localhost;dbname=jeromes_mood124;charset=utf8' , 'root' , '');
print 'je suis connecte';
}
catch (Exception $e)
{
	die('Erreur :'. $e->getMessage());
}
 ?>


//verification utilisateur
 <?php 
$nom = 'etudiant1';
$password = md5('+Azerty00');

$reponse = $bdd->query('SELECT * FROM mdls8_user');

while ($donnee = $reponse->fetch())
	{
		if ($nom == $donnee['username'] && $password = $donnee['password'])
		{		
			$pseudo = $donnee['username'];
			break;
		}
	}
//Si un utilisateur a ete trouvé avec le formulaire alors on enregistre ses données et on les transfere dans une BDD locale	
if (isset($pseudo))
	{
		print 'le pseudo'.$pseudo.''.'existe';
		
	}else{
		print 'erreur utilisateur non reconnu';
	}


 ?>