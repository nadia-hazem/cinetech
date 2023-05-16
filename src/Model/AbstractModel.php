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


}
