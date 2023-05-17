<?php
// App/Controller/AuthController.php

namespace App\Controller;
use App\Model\UserModel;

class AuthController {

    public function register()
    {
        // Vérifier si le formulaire a été soumis
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Récupérer les données du formulaire
            $login = $_POST['login'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $cpassword = $_POST['cpassword'];
            if($password !== $cpassword) {
                throw new \Exception('Les mots de passe ne correspondent pas');
            }
            
            $_POST['login'] = htmlspecialchars($_POST['login'], ENT_QUOTES);
            $_POST['email'] = htmlspecialchars($_POST['email'], ENT_QUOTES);
            $_POST['password'] = htmlspecialchars($_POST['password'], ENT_QUOTES);
            $_POST['cpassword'] = htmlspecialchars($_POST['cpassword'], ENT_QUOTES);
            
            $login = $_POST['login'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $cpassword = $_POST['cpassword'];
            
            $password = password_hash($password, PASSWORD_DEFAULT);

            // Vérifier si l'e-mail est déjà utilisé
            $userModel = new UserModel();
            $user = $userModel->findOneBy('email', $email);
            if ($user) {
                require_once 'src/View/register.php';
                echo '<p class="mx-5">email déjà utilisé</p>';
            } else {
                // Créer un nouvel utilisateur dans la base de données
                $userModel = new UserModel();
                $userModel->createUser($login, $email, $password);
                require_once 'src/View/register.php';
                echo '<p class="mx-5">Utilisateur créé avec succès</p>';
                // Rediriger l'utilisateur vers une autre page
                header('Location: /login');
                exit;
            }
        }
    }

    public function login()
    {
        // Vérifier si le formulaire a été soumis
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Récupérer les données du formulaire
            $login = $_POST['login'];
            $password = $_POST['password'];

            $_POST['login'] = htmlspecialchars($_POST['login'], ENT_QUOTES);
            $_POST['password'] = htmlspecialchars($_POST['password'], ENT_QUOTES);

            $login = $_POST['login'];
            $password = $_POST['password'];

            $request = new UserModel();
            $user = $request->findOneBy('login', $login);
            if(!$user) {
                require_once 'src/View/login.php';
                echo '<p class="mx-5">login ou mot de passe incorrect</p>';
            } else {
                if(password_verify($password, $user['password'])) {
                    session_start();
                    $_SESSION['user'] = $user;
                    header('Location: /');
                    exit;
                } else {
                    require_once 'src/View/login.php';
                    echo '<p class="mx-5">login ou mot de passe incorrect</p>';
                }
            }

        }
    }

    public function logout()
    {
        session_start();
        session_destroy();
        header('Location: /');
        exit;
    }

}