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

    // register get //////////////////////////
    array('GET', '/register', function () {
        require 'src/View/register.php'; 
    }, 'register-get'),

    // register post /////////////////////////
    array('POST', '/register', function () {
        $authController = new \App\Controller\AuthController();
        $authController->register();
    }, 'register-post'),

    // login get /////////////////////////////
    array('GET', '/login', function () {
        require 'src/View/login.php'; 
    }, 'login-get'),

    // login post ////////////////////////////
    array('POST', '/login', function () {
        $authController = new \App\Controller\AuthController();
        $authController->login();
    }, 'login-post'),

    // logout ////////////////////////////////
    array('GET', '/logout', function () {
        $authController = new \App\Controller\AuthController();
        $authController->logout();
    }, 'logout'),

    // films //////////////////////////////
    array('GET', '/films', function() { 
        require_once 'src/View/films.php';
    }, 'films' ),
    
    // film-detail //////////////////////////////
    array('GET', '/film-detail/[i:id]', function ($id) { 
        require_once 'src/View/film-detail.php'; 
    }, 'film-detail'),

    // series //////////////////////////////
    array('GET', '/series', function() { 
        require_once 'src/View/series.php';
    }, 'series' ),

    // serie-detail //////////////////////////////
    array('GET', '/serie-detail/[i:id]', function ($id) {
        require_once 'src/View/serie-detail.php';
    }, 'serie-detail'),
    
    // search //////////////////////////////
    array('GET', '/search.php', function() { 
        require_once 'src/View/search.php';
    }, 'search' ),

)); // end of addRoutes




$match = $router->match();
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}