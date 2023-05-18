<?php
session_start();
require 'vendor/autoload.php';
$router = new AltoRouter();

$router->addRoutes(array(   // array(method, path, target, name)
    
    // Home //////////////////////////////
    array('GET', '/', function() { 
        require_once 'src/View/home.php';
    }, 'home' ),

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
    
    // detail //////////////////////////////
    array('GET', '/detail.php/{id}', function ($params) {
        $movieId = $params['id'];
        require_once 'src/view/detail.php';
    }, 'films-detail' ),

)); // end of addRoutes




$match = $router->match();
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}