<?php
// App/Controller/UserController.php

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
            // Render user data using user.php view file
            // require_once 'src/View/user.php';
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
}