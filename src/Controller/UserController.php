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
    
    public function register() {
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
                
                require_once 'src/View/register.php'; ?>
                <p class="mx-5">Utilisateur créé avec succès</p>
                <?php
                // Rediriger l'utilisateur vers une autre page
                header('Location: /login');
                exit;
            }
        }
    }

    public function login() {
        // Vérifier si le formulaire a été soumis
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Récupérer les données du formulaire
            $login = $_POST['login'];
            $password = $_POST['password'];

            $_POST['login'] = htmlspecialchars($_POST['login'], ENT_QUOTES);
            $_POST['password'] = htmlspecialchars($_POST['password'], ENT_QUOTES);

            $request = new UserModel();
            $user = $request->findOneBy('login', $login);
            if(!$user) {
                require_once 'src/View/login.php';
                echo '<p class="mx-5">login ou mot de passe incorrect</p>';
            } else {
                if(password_verify($password, $user['password'])) {
                    session_start();
                    $_SESSION['user'] = $user; // Définir l'utilisateur actuel dans la session

                    if ($user['role'] == 'admin') {
                        header('Location: /admin');
                        exit;
                    } else {
                        header('Location: /profile');
                        exit;
                    }

                } else {
                    require_once 'src/View/login.php';
                    echo '<p class="mx-5">login ou mot de passe incorrect</p>';
                }
            }
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
        session_start();
        session_destroy();
        header('Location: index.php');
    }

    public function checkLogin() {
        $userModel = new UserModel();
        $login = $_POST['checkLogin'];
    
        $user = $userModel->findOneBy('login', $login);
        if ($user) {
            $response = ['status' => 'indispo'];
        } else {
            $response = ['status' => 'dispo'];
        }
    
        echo json_encode($response);
    }

    public function updateLogin($newLogin, $oldLogin, $password)
    {
        // Vérification du mot de passe
        $isPasswordCorrect = $this->checkPassword($password);

        if ($isPasswordCorrect) {
            // Appeler la méthode updateUserLogin du modèle pour mettre à jour le login
            $userModel = new UserModel();
            $updateResult = $userModel->updateUserLogin($newLogin, $oldLogin, $password);

            if ($updateResult) {
                // Envoyer la réponse JSON indiquant que la mise à jour a réussi
                echo json_encode('ok');
            } else {
                // Envoyer la réponse JSON indiquant une erreur lors de la mise à jour
                echo json_encode('error');
            }
        } else {
            // Envoyer la réponse JSON indiquant que le mot de passe est incorrect
            echo json_encode('incorrect');
        }
    }

    /* public function updateLogin($newLogin, $oldLogin, $password) {
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
        
            // Appeler la méthode du modèle pour mettre à jour le login
            $result = $userModel->updateUserLogin($newLogin, $oldLogin, $password);
        
            // Envoyer une réponse appropriée
            echo json_encode($result);
        }
    } */

    public function checkPassword($password) {
        $userModel = new UserModel();
        $login = $_SESSION['user']['login'];
    
        $user = $userModel->findOneBy('login', $login);
        $password_hash = $user['password'];
    
        if (password_verify($password, $password_hash)) {
            echo 'ok';
            return true;
        } else {
            echo 'incorrect';
            return false;
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