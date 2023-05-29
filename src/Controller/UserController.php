<?php
// path: src/Controller/UserController.php

namespace App\Controller;
use App\Model\UserModel;

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

    public function updateLogin($login, $old, $password) {
        $userModel = new UserModel();
        $user = $userModel->findOneBy('login', $old);
        $password = password_verify($password, $user['password']);
        if ($password) {
            $userModel->updateUserLogin($login, $old, $password);
            $_SESSION['user']['login'] = $login;
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