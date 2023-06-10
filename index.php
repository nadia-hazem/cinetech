<?php
session_start();
use Dotenv\Dotenv;

require __DIR__ . '/vendor/autoload.php';

// Charger le fichier .env
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
// Lire la valeur de la variable TMDB_API_KEY
$apiKey = $_ENV['TMDB_API_KEY'];
// Passer la clé API aux pages de fetch
$router = new AltoRouter();

$router->addRoutes(array(   // array(method, path, target, name)    
    // Home //////////////////////////////
    array('GET', '/', function() { 
        require_once 'src/View/home.php';
    }, 'home' ),
    
    // Search //////////////////////////////
    array('GET', '/search.php', function() { 
        require_once 'src/View/search.php';
    }, 'search' ),

    // Register get //////////////////////////
    array('GET', '/register', function () {
        require 'src/View/register.php'; 
    }, 'register-get'),

    // Register post /////////////////////////
    array('POST', '/register', function () {
        $userController = new \App\Controller\UserController();
        $userController->register();
    }, 'register-post'),

    // Login get /////////////////////////////
    array('GET', '/login', function () {
        require 'src/View/login.php'; 
    }, 'login-get'),

    // Login post ////////////////////////////
    array('POST', '/login', function () {
        $userController = new \App\Controller\UserController();
        $userController->login();
    }, 'login-post'),

    // isLogged //////////////////////////////
    array('GET', '/isLogged', function () {
        $userController = new \App\Controller\UserController();
        echo json_encode($userController->isLogged());
    }, 'isLogged'),

    // Logout ////////////////////////////////
    array('GET', '/logout', function () {
        $userController = new \App\Controller\UserController();
        $userController->logout();
    }, 'logout'),

    // Profile ///////////////////////////////
    array('GET', '/profile', function () {
        require_once 'src/View/profile.php';
    }, 'profile'),
    
    // Admin /////////////////////////////////
    array('GET', '/admin', function () {
        require_once 'src/View/admin.php';
    }, 'admin'),

    // CurentUser /////////////////////////////////
    array ('GET', '/getCurrentUser', function () {
        $userController = new \App\Controller\UserController();
        echo json_encode($userController->getCurrentUser());
    }, 'currentUser'),

    // Films //////////////////////////////
    array('GET', '/films', function() { 
        require_once 'src/View/films.php';
    }, 'films' ),
    
    // Film-detail //////////////////////////////
    array('GET', '/film-detail/[i:id]', function ($id) { 
        require_once 'src/View/film-detail.php'; 
    }, 'film-detail'),

    // Series //////////////////////////////
    array('GET', '/series', function() { 
        require_once 'src/View/series.php';
    }, 'series' ),

    // Serie-detail //////////////////////////////
    array('GET', '/serie-detail/[i:id]', function ($id) {
        require_once 'src/View/serie-detail.php';
    }, 'serie-detail'),

//////////////////////////////// PROFILE /////////////////////////////////////////

    // Vérification du login
    array('POST', '/checkLogin', function() { 
        $userController = new \App\Controller\UserController();
        $userController->checkLogin();
    }, 'checkLogin' ),

    // Vérification du mot de passe
    array('POST', '/checkPassword', function() { 
        $userController = new \App\Controller\UserController();
        $password = $_POST['password'];
        $userController->checkPassword($password);
    }, 'checkPassword' ),
    
    // Mise à jour du login
    array('POST', '/updateLogin', function() {
        $oldLogin = isset($_POST['oldLogin']) ? $_POST['oldLogin'] : null;
        $newLogin = isset($_POST['newLogin']) ? $_POST['newLogin'] : null;
        $password = isset($_POST['password']) ? $_POST['password'] : null;
        $userController = new \App\Controller\UserController();
        $user = $userController->getCurrentUser();
        $oldLogin = $user['login'];    
        $userController->updateLogin($oldLogin, $newLogin, $password);
    }, 'updateLogin'),
    
    // Mise à jour du mot de passe
    array('POST', '/updatePassword', function() { 
        $userController = new \App\Controller\UserController();
        $userController->updatePassword($_POST['newPassword'], $_POST['oldPassword'], $_POST['password']);
    }, 'updatePassword' ),

    // FAVORIS ////////////////////////////////////////////

    // Ajouter un favori
    /* array('POST', '/addToFav', function() { 
        $favController = new \App\Controller\FavController();
        $favController->addToFav($_POST['id'], $_POST['type'], $_POST['userId']);
    }, 'addToFav' ), */

    // Ajouter un favori
    array('POST', '/addFavorite', function() { 
        $favController = new \App\Controller\FavController();
        $type = $_POST['type'];
        $itemId = $_POST['id'];
        $favController->addToFav($itemId, $_POST['type'], $_SESSION['user']['user_id']);
    }, 'addToFav' ),    

    // Supprimer un favori
    array('POST', '/removeFromFav', function() { 
        $favController = new \App\Controller\FavController();
        $favController->removeFromFav();
    }, 'removeFromFav' ),

    // Vérifier si un élément est un favori
    array('POST', '/isFav', function() { 
        $favController = new \App\Controller\FavController();
        $isFav = $favController->isFav($_POST['id'], $_POST['type'], $_POST['userId']);
    }, 'isFav' ),

        /* if (isset($_POST['id']) && isset($_POST['type']) && isset($_POST['userId'])) {
            $favModel->isFav($_POST['id'], $_POST['type'], $_POST['userId']);
        } else {
            echo json_encode('error');
        }
    },  'isFav' ),*/

    array('POST', '/toggleFav', function() { 
        $favController = new \App\Controller\FavController();
        $favController->toggleFav($_GET['id'], $_GET['type'], $_GET['userId']);
    }, 'toggleFav' ),
    

    // Afficher les favoris
    array('GET', '/profile/favorites', function() { 
        $favController = new \App\Controller\FavController();
        $favController->displayFavs($_GET['user_id'], $_GET['type'], $_GET['user']);
        require_once 'src/View/profile.php';
    }, 'favorites' ),


)); // end of routes




$match = $router->match();
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}