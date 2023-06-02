<?php
// path: src/Controller/FavController.php

namespace App\Controller;
use App\Model\FavModel;
use Exception;

class FavController {

    public function addToFav() {
        // Ajouter un élément aux favoris de l'utilisateur
        try {
            $type = $_POST['type'];
            $idType = $_POST['id_type'];
            $idUser = $_SESSION['user_id'];

            $favoriteModel = new FavModel();
            $favoriteModel->addToFav($type, $idType, $idUser);

            echo json_encode(['status' => 'success']);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function removeFromFav() {
        // Supprimer un élément des favoris de l'utilisateur
        try {
            $id = $_POST['id'];

            $favoriteModel = new FavModel();
            $favoriteModel->removeFromFav($id);
            // Supprimer le favori de la base de données

            echo json_encode(['status' => 'success']);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

} // end of class FavController
