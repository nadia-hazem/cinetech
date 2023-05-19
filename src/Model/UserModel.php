<?php
// App/Model/UserModel.php

namespace App\Model;

use PDO;
class UserModel extends AbstractModel
{
    protected $tablename = 'user';

    // find all users
    public function findAll()
    {
        $req = $this->pdo->prepare('SELECT * FROM user');
        $req->execute();
        return $req->fetchAll();
    }

    // create user
    public function createUser($login, $email, $password, $role='user')
    {
        $req = $this->pdo->prepare('INSERT INTO user (login, email, password, role) VALUES (:login, :email, :password, :role)');
        $req->execute([
            'login' => $login,
            'email' => $email,
            'password' => $password,
            'role' => $role
        ]);
    }

    // find one user by column name
    public function findOneBy($columnName, $value)
    {
        $req = $this->pdo->prepare("SELECT * FROM user WHERE $columnName = ?");
        $req->execute([$value]);
        return $req->fetch();
    }

    // update user
    public function updateUser($id, $login, $email, $password, $role)
    {
        $req = $this->pdo->prepare('UPDATE user SET login = :login, email = :email, password = :password, role = :role WHERE id = :id');
        $req->execute([
            'id' => $id,
            'login' => $login,
            'email' => $email,
            'password' => $password,
            'role' => $role
        ]);
    }

    // delete user
    public function deleteUser($id)
    {
        $req = $this->pdo->prepare('DELETE FROM user WHERE id = :id');
        $req->execute([
            'id' => $id
        ]);
    }

} // end