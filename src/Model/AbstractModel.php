<?php
// src/Model/AbstractModel.php

namespace App\Model;
use PDO;

abstract class AbstractModel {

    protected $pdo;
    protected $tablename = '';

    public function __construct() 
    {
        $host = 'localhost';
        $dbname = 'cinetech';
        $dbuser = 'root';
        $dbpass = '';

        try {
            $this->pdo = new PDO ("mysql:host=$host; $dbname=$dbname;charset=utf8", $dbuser, $dbpass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->exec("set names utf8");
        } catch (\PDOException $e) {
            echo "Erreur : " . $e->getMessage();
            die();
        }
    }

    public function findOneBy($colname, $value)
    {
        $query = "SELECT * FROM $this->tablename WHERE $colname = :value";
        $select = $this->pdo->prepare($query);
        $select->execute([':value' => $value]);
        $result = $select->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    // Find all data from a table
    public function findAll()
    {
        $query = "SELECT * FROM $this->tablename";
        $select = $this->pdo->prepare($query);
        $select->execute();
        $result = $select->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    // delete one data from a table
    public function deleteOne($id, $colname)
    {
        $id = htmlspecialchars($id);

        $query = "DELETE FROM $this->tablename WHERE $colname = :id";
        $delete = $this->pdo->prepare($query);
        $delete->execute([':id' => $id]);
    }

}
