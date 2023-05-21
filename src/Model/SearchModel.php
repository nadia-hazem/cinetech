<?php
// path: src/Model/SearchModel.php

namespace App\Model;

use PDO;
class SearchModel extends AbstractModel
{
    public function search($query) {
        
        // Votre code de traitement
        $url = "https://api.themoviedb.org/3/search/movie?api_key=' . getenv('TMDB_API_KEY') . '&query=$query";
        $result = file_get_contents($url);
        $data = json_decode($result);
        return $data->results;
    }
}
