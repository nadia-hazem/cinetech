<?php
session_start();
require 'vendor/autoload.php';
$router = new AltoRouter();

$router->addRoutes(array(   // array(method, path, target, name)
    
    // Home //////////////////////////////
    array('GET', '/', function() { 
        require_once 'src/View/home.php';
    }, 'home' ),

    // Register //////////////////////////////
    array('GET', '/register', function() { 
        require_once 'src/View/register.php';
    }, 'register' ),

    // Login //////////////////////////////
    array('GET', '/login', function() { 
        require_once 'src/View/login.php';
    }, 'login' ),

));


$match = $router->match();
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}