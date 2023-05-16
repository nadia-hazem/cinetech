<?php
// App/Controller/UserController.php

namespace App\Controller;
use App\Model\UserModel;

class UserController
{
    public function list()
    {
        $userModel = new UserModel();
        $users = $userModel->findAll();

        return $users;
    }

    public function displayUserData($id)
    {
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
}