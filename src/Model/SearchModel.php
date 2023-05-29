<?php
use GuzzleHttp\Client;

class SearchModel {
    private $apiKey;
    private $baseUrl = 'https://api.themoviedb.org/3';

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }

    public function search($query) {
        $client = new Client();

        $url = $this->baseUrl . '/search/multi';
        $params = [
            'query' => $query,
            'include_adult' => false,
            'language' => 'fr-FR',
            'page' => 1,
        ];

        $response = $client->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'accept' => 'application/json',
            ],
            'query' => $params,
        ]);

        $data = json_decode($response->getBody(), true);

        if ($data && isset($data['results'])) {
            return $data['results'];
        } else {
            return [];
        }
    }
}



/* use Dotenv\Dotenv;

class SearchModel {
    private $apiKey;
    private $baseUrl = 'https://api.themoviedb.org/3/search/multi';

    public function __construct() {
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
        $dotenv->load();

        // Récupérer la clé API depuis les variables d'environnement
        $this->apiKey = $_ENV['API_KEY'];
    }

    public function search($query) {
        // Appeler l'API TMDb en utilisant la clé d'API récupérée depuis
        // les variables d'environnement
        $url = $this->baseUrl . '?api_key=' . $this->apiKey . '&query=' . urlencode($query);

        $response = file_get_contents($url);
        $data = json_decode($response, true);

        if ($data && isset($data['results'])) {
            return $data['results'];
        } else {
            return [];
        }
    }
} */