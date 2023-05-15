<?php
session_start();
require 'vendor/autoload.php';

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