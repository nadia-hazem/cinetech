<?php
// path: src/Model/FavModel.php

namespace App\Model;
use PDO;

class FavModel extends AbstractModel {

    protected $tableName = 'fav';

    public function addToFav($type, $idType, $idUser) {
        $data = [
        'type' => $type,
        'id_type' => $idType,
        'id_user' => $idUser
        ];
        return $this->insert($data);
    }

    public function getFavoritesByUserId($idUser, $type) {
        $stmt = $this->pdo->prepare("SELECT * FROM $this->tableName WHERE id_user = :id_user AND type = :type");
        $stmt->execute([$idUser, $type]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function isFavorite($type, $idType, $idUser) {
        $stmt = $this->pdo->prepare("SELECT * FROM $this->tableName WHERE type = :type AND id_type = :id_type AND id_user = :id_user");
        $stmt->execute([$type, $idType, $idUser]);
        return $stmt->rowCount() > 0;
    }

    public function removeFromFav($id) {
        $this->deleteOne($id, 'id');
    }
}
