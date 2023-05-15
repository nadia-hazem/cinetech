<?php
// App/Controller/MovieController.php

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
        $latestSeries = $this->movieModel->getLatestSeries();
        $popularMovies = $this->movieModel->getPopularMovies();
        $popularSeries = $this->movieModel->getPopularSeries();
        require_once 'src/View/home.php';
    }

    public function displayLatestMovies() {
        $latestMovies = $this->movieModel->getLatestMovies();

        header('Content-Type: application/json');
        echo json_encode($latestMovies);
    }

    public function displayPopularMovies() {
        $popularMovies = $this->movieModel->getPopularMovies();

        header('Content-Type: application/json');
        echo json_encode($popularMovies);
    }

    public function displayLatestSeries() {
        $latestSeries = $this->movieModel->getLatestSeries();

        header('Content-Type: application/json');
        echo json_encode($latestSeries);
    }

    public function displayPopularSeries() {
        $popularSeries = $this->movieModel->getPopularSeries();

        header('Content-Type: application/json');
        echo json_encode($popularSeries);
    }

    public function searchMovies() {
        // Récupérer la requête de recherche
        $query = $_GET['query'];

        // Récupérer les résultats de recherche à partir du modèle
        $searchResults = $this->movieModel->searchMovies($query);

        // Renvoyer les données en format JSON
        header('Content-Type: application/json');
        echo json_encode($searchResults);
    }

}
?>