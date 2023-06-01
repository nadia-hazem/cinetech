<?php
// path: src/Controller/UserController.php

namespace App\Controller;
use App\Model\UserModel;
use Exception;

class UserController
{
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
        if (isset($_SESSION['user']) && $_SESSION[$role] == 'admin') {
            return true;
        } else {
            return false;
        }
    }

    public function getCurrentUser() {
        if (isset($_SESSION['user'])) {
            $userModel = new UserModel();
            $userId = $_SESSION['user']['id'];
            $_SESSION['id'] = $userId; // Ajout de l'identifiant de l'utilisateur à la session
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
        $password = password_verify($password, $user['password']);
        if ($password) {
            $userModel->updateUserLogin($newLogin, $oldLogin, $password);
            if (isset($_GET['updateLogin']) && $_GET['updateLogin'] == 1) {
                $data = json_decode(file_get_contents("php://input"), true);
                $newLogin = $data['newLogin'];
                $oldLogin = $data['oldLogin'];
                $password = $data['password'];
            
                $updateData = $userModel->updateUserLogin($newLogin, $oldLogin, $password);
                var_dump($newLogin, $oldLogin, $password);
                // Envoyer une réponse appropriée
                if ($updateData === "ok") {
                    echo ("ok");
                } elseif ($updateData === "incorrect") {
                    echo ("Mot de passe incorrect");
                } elseif ($updateData === "notfound") {
                    echo ("Utilisateur introuvable");
                } else {
                    echo ("Erreur lors de la modification du login");
                }
            }
            if($user['role'] == 'admin') {
                header('Location: /admin');
            } else {
                header('Location: /profile');
            }
        } else {
            throw new \Exception('Mot de passe incorrect');
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