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
            $this->pdo = new PDO ("mysql:host=$host; dbname=$dbname;charset=utf8", $dbuser, $dbpass);
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

    public function insert($data) {
        // Obtenir les clés et les valeurs du tableau de données
        $columns = array_keys($data);
        $values = array_values($data);
    
        // Concaténer les noms de colonnes et les placeholders pour les valeurs
        $columnsString = implode(',', $columns);
        $placeholders = implode(',', array_fill(0, count($values), '?'));
    
        // Construire la requête SQL d'insertion
        $query = "INSERT INTO $this->tablename ($columnsString) VALUES ($placeholders)";
    
        try {
            // Préparer et exécuter la requête SQL avec les valeurs
            $stmt = $this->pdo->prepare($query);
            $stmt->execute($values);
            return true;
        } catch (\PDOException $e) {
            // Gérer les exceptions
            echo 'Erreur : ' . $e->getMessage();
            exit;
        }
    }

    public function delete($data) {
        // Obtenir les clés et les valeurs du tableau de données
        $columns = array_keys($data);
        $values = array_values($data);
    
        // Concaténer les noms de colonnes et les placeholders pour les valeurs
        $columnsString = implode(',', $columns);
        $placeholders = implode(',', array_fill(0, count($values), '?'));
    
        // Construire la requête SQL d'insertion
        $query = "DELETE FROM $this->tablename WHERE $columnsString = $placeholders";
    
        try {
            // Préparer et exécuter la requête SQL avec les valeurs
            $stmt = $this->pdo->prepare($query);
            $stmt->execute($values);
            return true;
        } catch (\PDOException $e) {
            // Gérer les exceptions
            echo 'Erreur : ' . $e->getMessage();
            exit;
        }
    }
}
