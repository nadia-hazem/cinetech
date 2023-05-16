<?php
// App/Model/UserModel.php

namespace App\Model;

use PDO;
class UserModel extends AbstractModel
{
    protected $tablename = 'user';

    // create user
    public function createUser($login, $email, $password)
    {
        $req = $this->pdo->prepare('INSERT INTO user (login, email, password) VALUES (:login, :email, :password)');
        $req->execute([
            'login' => $login,
            'email' => $email,
            'password' => $password,
        ]);
    }

}