<?php
// path: src/Controller/SearchController.php
require_once 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use SearchModel;

class SearchController {
    public function search() {
        $query = $_GET['query'] ?? '';

        // Instancier SearchModel en passant la clé d'API
        $apiKey = $_ENV['API_KEY']; // charger la clé depuis les variables d'environnement
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