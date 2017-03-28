
<?php session_start ()?>
<?php
header('Access-Control-Allow-Origin: *');
 
//Connexion BDD**********************************************
try
{
//$bdd = new PDO('mysql:host=localhost;dbname=jeromes_mood124;charset=utf8' , 'root' , '');
$bdd = new PDO('mysql:host=xjapanfacckimo.mysql.db;dbname=xjapanfacckimo;charset=utf8' , 'xjapanfacckimo' , 'Nihongo59');
}
catch (Exception $e)
{
	die('Erreur :'. $e->getMessage());
}
//**********************************************************

 
 //POUR TESTER SANS FORMULAIRE****************************
 
//$nom = 'etudiant1';
//$password = md5('+Azerty00');

//********************************************************

if (isset ($_SESSION['login']))
{
	$user_id = $_SESSION['id'];
}
else
{
	$nom = $_POST['identifiant'];
	$password = md5($_POST['password']);
	$reponse = $bdd->query("SELECT * FROM mdls8_user");

	while ($donnee = $reponse->fetch())
	{
		if ($nom == $donnee['username']) //Si le nom est trouvé dans la BDD
		{
			$_SESSION['login'] = $donnee['username'];
			$_SESSION['id'] = $donnee['id'];
			$user_id = $_SESSION['id'];
			break;
		}
		else
		{
			$error = 'pseudo inconnu';
		}
	}
}

			/*$nom = $_POST['identifiant'];
			$password = md5($_POST['password']);


			$reponse = $bdd->query("SELECT * FROM mdls8_user");

			while ($donnee = $reponse->fetch())
				{
					if ($nom == $donnee['username'] && $password = $donnee['password']) //A MODIFIER MOT DE PASSE
					{		
						$_SESSION['login'] = $donnee['username'];
						$_SESSION['id'] = $donnee['id'];
						$user_id = $_SESSION['id'];
						break;
						
					}
				}*/
	
if (isset ($user_id)){
	
		//On recupere dans la table des enrolment des utilisateurs l'id de l'inscription commune au utilisateurs inscrit dans ce cours
		$user_enrolment = [];
		$enrolment_id = $bdd->query("SELECT * FROM mdls8_user_enrolments WHERE userid='$user_id'");

		while ($enrolment = $enrolment_id->fetch())
		{
			$user_enrolment[] = $enrolment['enrolid'];
			
		}

		//Les identifiants correpondant au cours dans lequel est inscrit l'utilisateur sont placés dans le tableau $user_enrolment



		//On récupere le contenu de la table mdls8_enrol pour y selectionner les identifiants réel des cours correspondant à l'inscription de l'eleve
		$id_cours = $bdd->query("SELECT * FROM mdls8_enrol");
		$cours_id_calendar = [];
		 while ($cours = $id_cours->fetch())
			 {
			 	foreach ($user_enrolment as $c)
			 	{
			 		if ($c == $cours['id'])
			 		{
			 			$cours_id_calendar[] = $cours['courseid']; 			
			 		}
			 	}
			 	
			 }	


		//maintenant qu'on a les id réels des cours on les compare au calendrier et on les affichent sur l'application
		//************************************************************************************************************
		
		$calendar = array();
		$j = 0;	
		foreach($cours_id_calendar as $id)
			{
				$calendrier = $bdd->query("SELECT * FROM mdls8_event WHERE courseid='$id' AND eventtype='course' ");
				while ($event = $calendrier->fetch())
					{		
						$calendar[$j] = array(
						'intitule'=> $event['name'],
						'jour'=>date("l j F Y",$event['timestart']),						 
						'heure'=> date("H:i",$event['timestart']),
						'timestamp'=>$event['timestart']
						);
						$j = $j + 1 ;																					
					}
			}
		$calendar_encode = 	json_encode($calendar);
		echo $calendar_encode;			
		//print_r($calendar);
}
else
{
	console.log('erreur'.$error);	
}
  


?>