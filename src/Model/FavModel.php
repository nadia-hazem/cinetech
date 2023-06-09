<?php
// path: src/Model/FavModel.php

namespace App\Model;
use PDO;

class FavModel extends AbstractModel {

    protected $pdo;
    protected $tablename = 'fav';

    public function isFav($id, $type, $userId)
    {
        if (isset($_SESSION['user']) && isset($_SESSION['user']['id'])) {
            $userId = $_SESSION['user']['id'];
            $stmt = $this->pdo->prepare("SELECT * FROM $this->tablename WHERE id = :id AND type = :type AND user_id = :user_id");
            $stmt->execute(['id' => $id, 'type' => $type, 'user_id' => $userId]);
            return $stmt->rowCount() > 0;
        } else {
            return false; // L'utilisateur n'est pas connecté ou les clés ne sont pas définies
        }
    }

    public function addToFav($id, $type, $userId)
    {
        // Vérifier si l'élément est déjà un favori
        if ($this->isFav($id, $type, $userId)) {
            // Supprimer le favori
            $this->removeFromFav($id, $type, $userId);
            echo 'Retiré des favoris';
            return false;
        } else {
            // Ajouter l'élément à la base de données
            $data = [
                'id' => $id,
                'type' => $type,
                'user_id' => $userId
            ];
    
            $sql = "INSERT INTO $this->tablename (id, type, user_id) VALUES (:id, :type, :user_id)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($data);
            echo 'Ajouté aux favoris';
            return $this->pdo->lastInsertId();
        }
    }    

    public function removeFromFav($id, $type, $userId)
    {
        // Construire le tableau de données pour la suppression
        $data = [
            'id' => $id,
            'type' => $type,
            'user_id' => $userId,
        ];
        $this->delete($data); // Appeler la fonction delete de la classe AbstractModel
    }

    public function toggleFav($id, $type, $userId)
    {
        // Vérifier si l'élément est déjà un favori
        if ($this->isFav($id, $type, $userId)) {
            
            $this->removeFromFav($id, $type, $userId); // supprimer le favori
            return false;
            echo 'supprimé des favoris';

        } else {
            // Ajouter l'élément à la base de données
            $data = [
                'id' => $id,
                'type' => $type,
                'user_id' => $userId
            ];
            $this->insert($data);
            echo 'ajouté aux favoris';
        }
    }

    public function getFavs($id, $type, $userId)
    {
        $sql = "SELECT * FROM $this->tablename WHERE id = :id AND type = :type AND user_id = :user_id";
        $req = $this->pdo->prepare($sql);
        $req->execute([
            'id' => $id,
            'type' => $type,
            'user_id' => $userId
        ]);
        return $req->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    public function displayFavs($userId)
    {
        $sql = "SELECT * FROM $this->tablename WHERE user_id = :user_id";
        $req = $this->pdo->prepare($sql);
        $req->execute(['user_id' => $userId]);
        return $req->fetchAll(\PDO::FETCH_ASSOC);
    }
    
}
