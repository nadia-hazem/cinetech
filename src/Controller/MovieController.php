<?php
// App/Controller/HomeController.php

namespace App\Controller;

use App\Model\MovieModel;

class MovieController {
    private $movieModel;

    public function __construct() {
        $apiKey = '1e02352b3b6a25aa0acc3327f3a21fdf';
        $this->movieModel = new MovieModel($apiKey);
    }
    
    public function index() {
        // Fonction qui renvoie la page d'accueil
        $latestMovies = $this->movieModel->getLatestMovies();
        $popularMovies = $this->movieModel->getPopularMovies();
        require_once '../../view/home.php';
    }

    public function displayLatestMovies() {
        // Récupérer les derniers films à partir du modèle
        $latestMovies = $this->movieModel->getLatestMovies();

        // Renvoyer les données en format JSON
        header('Content-Type: application/json');
        echo json_encode($latestMovies);
    }

    public function displayPopularMovies() {
        // Récupérer les films populaires à partir du modèle
        $popularMovies = $this->movieModel->getPopularMovies();

        // Renvoyer les données en format JSON
        header('Content-Type: application/json');
        echo json_encode($popularMovies);
    }

}
?>