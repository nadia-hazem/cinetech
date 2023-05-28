<?php
use GuzzleHttp\Client;

class SearchModel {
    protected $url = "https://api.themoviedb.org/3/search/multi";
    protected $api_key;

    public function __construct() {
        $this->api_key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTAyMzUyYjNiNmEyNWFhMGFjYzMzMjdmM2EyMWZkZiIsInN1YiI6IjY0NjFmNDY3NmUwZDcyMDBlMzFkNWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQupnjWOqDsMJQt1hWsEREsbFODpbc8TFxE4ULFhhNY"; 
    }

    public function search(string $query): array {
        // créer le client Guzzle et ajouter l'en-tête d'autorisation
        $client = new Client();
        $response = $client->request('GET', $this->url, [
            'query' => [
            'api_key' => $this->api_key,
            'query' => $query,
            'language' => 'en-US',
            'page' => 1,
            'include_adult' => false,
            ],
            'headers' => [
            'Accept' => 'application/json',
            ],
        ]);

        $resultArray = json_decode($response->getBody(), true);

        return $resultArray['results'];
    }
}

/* class SearchModel {
    private $apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTAyMzUyYjNiNmEyNWFhMGFjYzMzMjdmM2EyMWZkZiIsInN1YiI6IjY0NjFmNDY3NmUwZDcyMDBlMzFkNWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQupnjWOqDsMJQt1hWsEREsbFODpbc8TFxE4ULFhhNY';
    private $baseUrl = 'https://api.themoviedb.org/3/search/multi';
    
    public function search($query) {
        // Appeler l'API TMDb en utilisant la clé d'API définie dans la classe
        $url = $this->baseUrl . '?api_key=' . $this->apiKey . '&query=' . urlencode($query);

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($curl);

        $data = json_decode($response, true);

        if ($data && isset($data['results'])) {
            return $data['results'];
        } else {
            return [];
        }
         */
        /* $response = file_get_contents($url);
        $data = json_decode($response, true);
        
        if ($data && isset($data['results'])) {
            return $data['results'];
        } else {
            return [];
        } */
    /*}
}*/




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