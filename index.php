<?php
session_start();
require 'vendor/autoload.php';
var_dump(class_exists('\App\Controller\MovieController'));
$router = new AltoRouter();

$router->addRoutes(array(   // array(method, path, target, name)
    
    // Home //////////////////////////////
    array('GET', '/', function() { 
        $movieController = new \App\Controller\MovieController();
        $movieController->index();
    }, 'home' ),

    // Latest moovies ///////////////////////////
    array('GET', '/latest-movies', function() {
        $homeController = new \App\Controller\MovieController();
        $homeController->displayLatestMovies();
    }, 'latest_movies'),

    // Popular movies ///////////////////////////
    array('GET', '/popular-movies', function() {
        $homeController = new \App\Controller\MovieController(); 
        $homeController->displayPopularMovies();
    }, 'popular_movies'),

));


$match = $router->match();
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}