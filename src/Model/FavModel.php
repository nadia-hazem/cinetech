<?php
// path: src/Model/FavModel.php

namespace App\Model;
use PDO;

class FavModel extends AbstractModel {

    protected $pdo;
    protected $tableName = 'fav';

    public function isFav($id, $type)
    {
        if (isset($_SESSION['user'])) {
            $userId = $_SESSION['user']['id'];
            $stmt = $this->pdo->prepare("SELECT * FROM $this->tableName WHERE id = :id AND type = :type AND user_id = :user_id");
            $stmt->execute(['id' => $id, 'type' => $type, 'user_id' => $userId]);
            return $stmt->rowCount() > 0;
        } else {
            return false; // L'utilisateur n'est pas connecté
        }
    }

    public function addToFav($id, $type, $userId)
    {
        // Vérifier si l'élément est déjà un favori
        if ($this->isFav($id, $type, $userId)) {
            
            $this->removeFromFav($id, $type, $userId); // supprimer le favori
            return false;

        } else {
            // Ajouter l'élément à la base de données
            $data = [
                'id' => $id,
                'type' => $type,
                'user_id' => $userId
            ];

            $sql = "INSERT INTO $this->tableName (id, type, user_id) VALUES (:id, :type, :user_id)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($data);
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

        } else {
            // Ajouter l'élément à la base de données
            $data = [
                'id' => $id,
                'type' => $type,
                'user_id' => $userId
            ];
            $this->insert($data);
        }
    }

    public function getFav($id, $type, $userId)
    {
        $sql = "SELECT * FROM $this->tablename WHERE id = :id AND type = :type AND user_id = :user_id";
        $req = $this->pdo->prepare($sql);
        $req->execute([
            'id' => $id,
            'type' => $type,
            'user_id' => $userId
        ]);
        return $req->fetch(\PDO::FETCH_ASSOC);
    }

    public function displayFavs($id, $type,$userId)
    {
        $sql = "SELECT (id, type, user_id) values (id = :id, type = :type, user_id = :user_id) FROM $this->tablename WHERE user_id = :user_id";
        $req = $this->pdo->prepare($sql);
        $req->execute(['user_id' => $userId]);
        $favs = $req->fetchAll(\PDO::FETCH_ASSOC);
        return $favs;
    }
}
