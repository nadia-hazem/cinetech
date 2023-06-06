<?php
// path: src/Model/UserModel.php

namespace App\Model;

use PDO;
class UserModel extends AbstractModel
{
    protected $tablename = 'user';
    private $id;
    private $login;
    private $email;

    public function __construct()
    {
        parent::__construct();

        // Récupérer les données de l'utilisateur s'il est connecté
        if (isset($_SESSION['user'])) {
            $this->id = $_SESSION['user']['id'];
            $this->login = $_SESSION['user']['login'];
            $this->email = $_SESSION['user']['email'];
        }
    }

    // find all users
    public function findAll()
    {
        $req = $this->pdo->prepare('SELECT (id, login, email, password, role) VALUES (:id, :login, :email, :password,) FROM user');
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
    /* public function updateUser($id, $login, $email, $password, $role)
    {
        $req = $this->pdo->prepare('UPDATE user SET login = :login, email = :email, password = :password, role = :role WHERE id = :id');
        $req->execute([
            'id' => $id,
            'login' => $login,
            'email' => $email,
            'password' => $password,
            'role' => $role
        ]);
    } */

    // find user role by id
    public function findRoleById($id)
    {
        $req = $this->pdo->prepare('SELECT role FROM user WHERE id = :id');
        $req->execute([
            'id' => $id
        ]);
        return $req->fetch();
    }

    // check if user exist
    public function isUserExist($login)
    {
        $req = $this->pdo->prepare("SELECT * FROM $this->tablename WHERE login = :login");
        $req->execute([
            ':login' => $login
        ]);
        $result = $req->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            echo "indispo";
        } else {
            echo "dispo";
        }
        $this->pdo = null;
    }

    // delete user
    public function deleteUser($id)
    {
        $req = $this->pdo->prepare('DELETE FROM user WHERE id = :id');
        $req->execute([
            'id' => $id
        ]);
    }

    public function updateUserLogin($newLogin, $oldLogin, $password)
    {
        // Vérifier si l'ancien login et le mot de passe correspondent à l'utilisateur actuel
        $sql = "SELECT * FROM user WHERE login=:oldLogin AND password=:password";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(array(':oldLogin' => $oldLogin, ':password' => $password));
        $count = $stmt->rowCount();

        if ($count > 0) {
            // Mettre à jour le login de l'utilisateur
            $sql = "UPDATE user SET login=:newLogin WHERE login=:oldLogin";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(array(':newLogin' => $newLogin, ':oldLogin' => $oldLogin));
            $count = $stmt->rowCount();

            if ($count > 0) {
                // Mettre à jour le login dans la session de l'utilisateur
                $_SESSION['user']['login'] = $newLogin;
                echo 'ok';
            } else {
                echo 'error';
            }
        } else {
            echo 'incorrect';
        }
    }


    /* public function updateUserLogin($newLogin, $oldLogin) {
        // update user login
        $sql = "UPDATE user SET login=:newLogin WHERE password=:password AND login=:oldLogin";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(array(':newLogin' => $newLogin, ':id' => $_SESSION['user']['id'], ':oldLogin' => $oldLogin));
        $count = $stmt->rowCount();
        if ($count > 0) {
            $_SESSION['user']['login'] = $newLogin;
            echo 'ok';
        } else {
            echo 'error';
        }
    }  */  

    // Update password
    public function updateUserPassword($password, $newPassword)
    {
        $requete = "SELECT password FROM user where login = :login";

        $select = $this->pdo->prepare($requete);

        $login = htmlspecialchars($_SESSION['user']['login']);
        $password = htmlspecialchars($password);
        $newPassword = htmlspecialchars($newPassword);

        $select->execute(array(':login' => $login));
        $fetch_assoc = $select->fetch(PDO::FETCH_ASSOC);
        $password_hash = $fetch_assoc['password'];

        if (password_verify(
            $password,
            $password_hash
        )) {
            $requete2 = "UPDATE user SET password=:password WHERE id_user=:id";
            $update = $this->pdo->prepare($requete2);
            $newPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $update->execute(array(
                ':password' => $newPassword,
                ':id' => $_SESSION['id'],
            ));

            if ($update) {
                $error = "ok";
                echo $error;
                var_dump($this->findOneBy('login', $login));
            } else {
                $error = "error";
                echo $error;
            }
        } else {
            $error = "incorrect";
            echo $error; // wrong password
        }

        $this->pdo = null;
    }

} // end