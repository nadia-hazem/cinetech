<?php
// path: src/Controller/FavController.php

namespace App\Controller;
use App\Model\FavModel;
use PDO;
use Exception;

class FavController
{
    private $user;

    public function addToFav($id, $type, $userId)
    {
        $favModel = new FavModel();
        $favModel->addToFav($type, $id, $userId);
    }

    public function removeFromFav()
    {
        $id = $_POST['id'];
        $type = $_POST['type'];
        $userId = $_POST['userId'];

        $favModel = new FavModel();
        $favModel->removeFromFav($id, $type, $userId);
    }

    public function toggleFav($id, $type, $userId)
    {
        $favModel = new FavModel();
        $favModel->toggleFav($id, $type, $userId);
    }

    public function isFav($id, $type, $userId)
    {
        $id = $_POST['id'];
        $type = $_POST['type'];
        $userId = $_POST['userId'];
        $favModel = new \App\Model\FavModel();
        $isFav = $favModel->isFav($id, $type, $userId);

        if ($isFav) {
            echo json_encode(['isFavorite' => true]);
        } else {
            echo json_encode(['isFavorite' => false]);
        }
    }

    /* public function isFav($id, $type, $userId)
    {
        $favModel = new FavModel();
        $favModel->isFav($id, $type, $userId);
    } */
    public function getFavs($userId)
    {
        $id = $_POST['id'];
        $type = $_POST['type'];
        $favModel = new FavModel();
        $favs = $favModel->getFavs($id, $type, $userId);
        echo json_encode($favs);
    }
    
    public function displayFavs($id, $type, $userId)
    {
        // on instancie le modèle
        $favModel = new FavModel();
        
        if (isset($_POST['id']) && isset($_POST['type'])) {
            // Si les paramètres id et type sont définis, cela signifie que la demande concerne la suppression ou l'ajout d'un favori
            $id_user = $_SESSION['user']['user_id'];
            
            if ($favModel->isFav($_POST['id'], $_POST['type'], $id_user)) {
                // Si l'élément est déjà un favori, on le supprime
                $favModel->removeFromFav($_POST['id'], $_POST['type'], $id_user);
            } else {
                // Sinon, on l'ajoute aux favoris
                $favModel->addToFav($_POST['id'], $_POST['type'], $id_user);
            }
        }
        
        // Récupérer les favoris de l'utilisateur
        $favs = $favModel->displayFavs($id, $type, $userId);
        echo json_encode($favs);
    }
    
    
} // end of class FavController
