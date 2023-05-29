<?php
// path: src/Controller/SearchController.php

/* require_once 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load(); */

use SearchModel;

class SearchController {
    public function search() {
        $apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTAyMzUyYjNiNmEyNWFhMGFjYzMzMjdmM2EyMWZkZiIsInN1YiI6IjY0NjFmNDY3NmUwZDcyMDBlMzFkNWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQupnjWOqDsMJQt1hWsEREsbFODpbc8TFxE4ULFhhNY';
        
        $query = htmlspecialchars($_GET['query']) ?? '';
        // Instancier SearchModel en passant la clé d'API
        $searchModel = new SearchModel($apiKey);
        
        $results = $searchModel->search($query);
        // Traitement des résultats
        $response = [
            'status' => 'success',
            'data' => $results
        ];
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
