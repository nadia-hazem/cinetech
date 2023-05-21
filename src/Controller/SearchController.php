<?php
// Path: src/Controller/SearchController.php

namespace App\Controller;
use App\Model\SearchModel;

class SearchController
{
    public function search()
    {
        $query = $_GET['query'] ?? '';

        $searchModel = new SearchModel();
        $results = $searchModel->search($query);

        //Traitement des résultats
    }
}