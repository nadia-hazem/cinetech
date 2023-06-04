<?php
// path: src/Controller/UserController.php

namespace App\Controller;
use App\Model\UserModel;
use Exception;

class UserController
{
    private $user;

    public function __construct()
    {
        if (isset($_SESSION['user'])) {
            $this->user = $_SESSION['user'];
        }
    }

    public function list() {
        $userModel = new UserModel();
        $users = $userModel->findAll();

        return $users;
    }

    public function displayUserData($id) {
        $userModel = new UserModel();
    
        // Retrieve user data with id
        $userData = $userModel->findOneBy('id', $id);
    
        echo "User data:";

        if (!$userData) {
            throw new \Exception('L\'utilisateur n\'existe pas');
        } else {
            // Return user data as JSON
            echo json_encode($userData);
        }
    }

    public function isAdmin() {
        $user = new UserModel();
        $user = $user->findOneBy('id', $_SESSION['user']['id']);
        $role = $user['role'];
        if (isset($_SESSION['user']) && $_SESSION['user'][$role] == 'admin') {
            return true;
        } else {
            return false;
        }
    }

    public function getCurrentUser() {
        if (isset($_SESSION['user'])) {
            $userModel = new UserModel();
            $userId = $_SESSION['user']['id'];
            $user = $userModel->findOneBy('id', $userId);
            return $user;
        } else {
            return null;
        }
    }
    
    public function isLogged() {
        if (isset($_SESSION['user'])) {
            return true;
        }
        else {
            return false;
        }
    }

    public function logout() {
        session_destroy();
        header('Location: index.php');
    }

    public function checkLogin() {
        $userModel = new UserModel();
        $login = $_POST['checkLogin'];

        $user = $userModel->findOneBy('login', $login);
        if ($user) {
            echo 'indispo';
        } else {
            echo 'dispo';
        }
    }

    public function updateLogin($newLogin, $oldLogin, $password) {
        $userModel = new UserModel();
        $user = $userModel->findOneBy('id', $_SESSION['user']['id']);
    
        if (isset($_GET['checkLogin']) && $_GET['checkLogin'] == 1) {
            $data = json_decode(file_get_contents("php://input"), true);
            $newLogin = $data['newLogin'];
            $oldLogin = $data['oldLogin'];
        
            // Appeler la méthode du modèle pour vérifier le login
            $result = $user->checkLogin($newLogin, $oldLogin);
        
            // Envoyer une réponse appropriée
            return json_encode($result);
        }
        
        if (isset($_GET['checkPassword']) && $_GET['checkPassword'] == 1) {
            $data = json_decode(file_get_contents("php://input"), true);
            $password = $data['password'];
        
            // Appeler la méthode du modèle pour vérifier le mot de passe
            $result = $user->checkPassword($password);
        
            // Envoyer une réponse appropriée
            echo json_encode($result);
        }
        
        if (isset($_GET['updateLogin']) && $_GET['updateLogin'] == 1) {
            $data = json_decode(file_get_contents("php://input"), true);
            $newLogin = $data['newLogin'];
            $oldLogin = $data['oldLogin'];
            $password = $data['password'];
        
            // Appeler la méthode du modèle pour mettre à jour le login
            $result = $userModel->updateUserLogin($newLogin, $oldLogin, $password);
        
            // Envoyer une réponse appropriée
            echo json_encode($result);
        }
    }

    // function to check if the password is same than bd password
    function checkPassword() {
        $userModel = new UserModel();
        $password = $_POST['checkPassword'];
        $login = $_SESSION['user']['login'];

        $user = $userModel->findOneBy('login', $login);
        $password_hash = $user['password'];

        if (password_verify(
            $password,
            $password_hash
        )) {
            echo 'ok';
        } else {
            echo 'incorrect';
        }
    }
    
    public function updatePassword($password, $newPassword) {
        $userModel = new UserModel();
        $user = $userModel->findOneBy('id', $_SESSION['user']['id']);
        $password = password_verify($password, $user['password']);
        if ($password) {
            $userModel->updateUserPassword($newPassword, $_SESSION['user']['id']);
            if($user['role'] == 'admin') {
                header('Location: /admin');
            } else {
                header('Location: /profile');
            }
        } else {
            throw new \Exception('Mot de passe incorrect');
        }
    }
}