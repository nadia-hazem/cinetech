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
        $favModel = new FavModel();
        $favModel->isFav($id, $type, $userId);
    }

    public function displayFavs($id, $type, $userId)
    {
        if (isset($_POST['id']) && isset($_POST['type']) > 0) {
            // on récupère l'id de l'utilisateur
            $id_user = $_SESSION['user']['user_id'];
            // on instancie le model
            $favModel = new FavModel();
            // on récupère les favoris de l'utilisateur
            if(isset($_POST['id'], $_POST['type'])) {
                $favModel->removeFromFav($_POST['id'], $_POST['type'], $id_user);
            } else {
                // sinon on l'ajoute aux favoris
                $favModel->addToFav($_POST['id'], $_POST['type'], $id_user);
            }
        }
        $favs = $favModel->displayFavs($id, $type, $userId);
        return $favs;
    }
    
} // end of class FavController
