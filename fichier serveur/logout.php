<?php 
session_start ();

session_unset();

session_destroy();

echo 'Votre session a bien été fermée';

?>