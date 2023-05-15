<?php
// App/Model/MovieModel.php

namespace App\Model;

use Exception;

class MovieModel {
    private $apiKey;

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }

    public function getLatestMovies() {
        $url = "https://api.themoviedb.org/3/movie/latest?api_key=$this->apiKey&language=fr-FR&page=1";

        try {
            $response = file_get_contents($url);
            $data = json_decode($response);
            return $data;
        } catch (Exception $e) {
            echo 'Erreur de requête:', $e->getMessage(), "\n";
        }
    }

    public function getPopularMovies() {
        $url = "https://api.themoviedb.org/3/movie/popular?api_key=$this->apiKey&language=fr-FR&page=1";
        
        try {
            $response = file_get_contents($url);
            $data = json_decode($response);
            return $data->results;
        } catch (Exception $e) {
            echo 'Erreur de requête:', $e->getMessage(), "\n";
        }
    }

    public function getLatestSeries() {
        $url = "https://api.themoviedb.org/3/tv/latest?api_key=$this->apiKey&language=fr-FR&page=1";
        
        try {
            $response = file_get_contents($url);
            $data = json_decode($response);
            return $data;
        } catch (Exception $e) {
            echo 'Erreur de requête:', $e->getMessage(), "\n";
        }
    }

    public function getPopularSeries() {
        $url = "https://api.themoviedb.org/3/tv/popular?api_key=$this->apiKey&language=fr-FR&page=1";
        
        try {
            $response = file_get_contents($url);
            $data = json_decode($response);
            return $data->results;
        } catch (Exception $e) {
            echo 'Erreur de requête:', $e->getMessage(), "\n";
        }
    }

    public function searchMovies($query) {
        $url = "https://api.themoviedb.org/3/search/movie?api_key=$this->apiKey&language=fr-FR&query=$query";
        
        try {
            $response = file_get_contents($url);
            $data = json_decode($response);
            return $data->results;
        } catch (Exception $e) {
            echo 'Erreur de requête:', $e->getMessage(), "\n";
        }
    }

}
?>