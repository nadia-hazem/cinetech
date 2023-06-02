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
    /* array('GET', '/', function() { 
        header('Location: http://cinetech/home');
    }),

    array('GET', '/home', function() { 
            require_once 'src/View/home.php';
    }, 'home'), */

    // Register get //////////////////////////
    array('GET', '/register', function () {
        require 'src/View/register.php'; 
    }, 'register-get'),

    // Register post /////////////////////////
    array('POST', '/register', function () {
        $authController = new \App\Controller\AuthController();
        $authController->register();
    }, 'register-post'),

    // Login get /////////////////////////////
    array('GET', '/login', function () {
        require 'src/View/login.php'; 
    }, 'login-get'),

    // Login post ////////////////////////////
    array('POST', '/login', function () {
        $authController = new \App\Controller\AuthController();
        $authController->login();
    }, 'login-post'),

    // Logout ////////////////////////////////
    array('GET', '/logout', function () {
        $authController = new \App\Controller\AuthController();
        $authController->logout();
    }, 'logout'),

    // Profile ///////////////////////////////
    array('GET', '/profile', function () {
        require_once 'src/View/profile.php';
    }, 'profile'),

    // Admin /////////////////////////////////
    array('GET', '/admin', function () {
        require_once 'src/View/admin.php';
    }, 'admin'),

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
    
    // Search //////////////////////////////
    array('GET', '/search.php', function() { 
        require_once 'src/View/search.php';
    }, 'search' ),

    // Vérification du login
    array('POST', '/checkLogin', function() { 
        $userController = new \App\Controller\UserController();
        $userController->checkLogin();
    }, 'checkLogin' ),

    // Vérification du mot de passe
    array('POST', '/checkPassword', function() { 
        $userController = new \App\Controller\UserController();
        $userController->checkPassword($_POST['password']);
    }, 'checkPassword' ),

    // Mise à jour du login
    array('POST', '/updateLogin', function() { 
        $userController = new \App\Controller\UserController();
        $userController->updateLogin($_POST['newLogin'], $_POST['oldLogin'], $_POST['password']);
    }, 'updateLogin' ),

    // Ajouter un favori
    array('POST', '/favorites', function() { 
        $favController = new \App\Controller\FavController();
        $favController->addToFav();
    }, 'addToFav' ),

    // Supprimer un favori
    array('POST', '/delete', function() { 
        $favController = new \App\Controller\FavController();
        $favController->removeFromFav();
    }, 'removeFromFav' ),


)); // end of routes




$match = $router->match();
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}