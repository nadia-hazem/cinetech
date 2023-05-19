<?php
require_once 'vendor/autoload.php';
$router = new AltoRouter();
$user = new \App\Controller\UserController();
?>

<header class="header bg-light">

    <!--------------------------------------TOPMENU---------------------------------------------->
    <nav class="topmenu navbar navbar-black bg-dark d-flex justify-content-between">
        <!-- logo -->
        <!-- <a class="navbar-brand" href="<?php //echo $router->generate('home'); ?>"><img src="public/img/logo.png" alt="logo" height="40px"></a> -->
        
        <!-- search bar -->
        <div class="d-flex vertical-align-bottom col mx-2">
            <form class="d-flex w-100" method="get" action="search.php">
                <input id="search" class="form-control me-sm-1" type="text" name="search" placeholder="Search..." autocomplete="off">
                <button class="btn btn-transparent text-white my-sm-0" type="submit"><i class="fas fa-search"></i></button>
            </form>
            <ul id="matchList" class="position-absolute z-3 mt-5"></ul>
            <ul id="matchList2" class="position-absolute z-3 mt-5"></ul>
        </div> <!-- end search bar -->

        <div class="vertical-align-middle  lg-6 md-6 sm-12">

            <?php
            // if user click on logout
            if (isset($_GET['logout'])) {
                if ($_GET['logout'] == true) {
                    $user->logout();
                }
            }

            // Obtenez l'utilisateur actuel connecté
            $loggedInUser = $user->getCurrentUser();

            // Vérifiez si l'utilisateur est un administrateur
            if ($loggedInUser && $loggedInUser['role'] == 'admin') {
                ?>
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="films">Films</a></li>
                    <li><a href="series">Séries</a></li>
                    <li><a href="logout">Déconnexion</a></li>
                </ul>
                <?php

                // ou un membre logué
            } else if ($user->isLogged()) { ?>
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="films">Films</a></li>
                    <li><a href="series">Séries</a></li>
                    <li><a href="logout">Déconnexion</a></li>
                </ul>
                <?php
            } else { ?>
                <ul>
                <li><a href="/">Accueil</a></li>
                    <li><a href="films">Films</a></li>
                    <li><a href="series">Séries</a></li>
                    <li><a href="register-get">Inscription</a></li>
                    <li><a href="login-get">Connexion</a></li>
                </ul>
            <?php
            } ?>
        </div>
    </nav> <!-- /menu-top -->

</header>