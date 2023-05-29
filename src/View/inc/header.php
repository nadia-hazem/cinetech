<?php
/* require_once __DIR__ . '/../../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../../');
$dotenv->load(); */
require_once 'vendor/autoload.php';
$router = new AltoRouter();
$user = new \App\Controller\UserController();

// if user click on logout
if (isset($_GET['logout'])) {
    if ($_GET['logout'] == true) {
        $user->logout();
    }
}

<header class="header sticky-top bg-light">

require_once 'src/Model/SearchModel.php';

$apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTAyMzUyYjNiNmEyNWFhMGFjYzMzMjdmM2EyMWZkZiIsInN1YiI6IjY0NjFmNDY3NmUwZDcyMDBlMzFkNWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQupnjWOqDsMJQt1hWsEREsbFODpbc8TFxE4ULFhhNY';
$searchModel = new SearchModel($apiKey); 

// Vérifier si une recherche a été soumise
if (isset($_GET['search'])) {
    $searchTerm = $_GET['search'];

    // Effectuer la recherche en utilisant la méthode appropriée du modèle
    $results = $searchModel->search($searchTerm);

    // Afficher les résultats ici
    foreach ($results as $result) {
        // Afficher les détails de chaque résultat
        echo $result['title'];
    }
}
?>

    <nav class="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
        <div class="container-fluid">

            <a class="navbar-brand" href="/"><span class="sitename">Cinétech</span></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-between" id="navbarText">

                <?php
                // Obtenez l'utilisateur actuel connecté
                $loggedInUser = $user->getCurrentUser();

                // Vérifiez si l'utilisateur est un administrateur
                if ($loggedInUser && $loggedInUser['role'] == 'admin') {
                    $login = $loggedInUser['login'];
                    echo '<p class="fw-light mb-0">Bienvenue' . ' ' . $login . '</p>';
                    ?>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="/films">Films</a></li>
                        <li class="nav-item"><a class="nav-link" href="/series">Séries</a></li>
                        <li class="nav-item"><a class="nav-link" href="/admin">Admin</a></li>
                        <li class="nav-item"><a class="nav-link" href="/logout">Déconnexion</a></li>
                    </ul>
                    <?php

                    // ou un membre
                } else if ($loggedInUser && $loggedInUser['role'] == 'user') { 
                    $login = $loggedInUser['login'];
                    echo '<p class="fw-light mb-0">Bienvenue' . ' ' . $login . '</p>';
                    ?>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="/films">Films</a></li>
                        <li class="nav-item"><a class="nav-link" href="/series">Séries</a></li>
                        <li class="nav-item"><a class="nav-link" href="/profile">Profil</a></li>
                        <li class="nav-item"><a class="nav-link" href="/logout">Déconnexion</a></li>
                    </ul>
                    <?php
                } else { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="/films">Films</a></li>
                        <li class="nav-item"><a class="nav-link" href="/series">Séries</a></li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="/register">Inscription</a></li>
                        <li class="nav-item"><a class="nav-link" href="/login">Connexion</a></li>
                    </ul>
                <?php
                } ?>

                <!-- search bar -->
                <span class="d-flex vertical-align-bottom">
                    <form class="d-flex" method="get" action="/search.php">
                        <input id="searchInput" class="form-control me-sm-1" type="text" name="search" placeholder="Search..." autocomplete="off">
                        <button class="btn btn-transparent text-white my-sm-0" type="submit"><i class="fas fa-search"></i></button>
                    </form>
                    <ul id="matchList" class="position-absolute z-3 mt-5" style="display:block;"></ul>
                    <ul id="matchList2" class="position-absolute z-3 mt-5" style="display:block;"></ul>
                </span> <!-- end search bar -->

            </div> <!-- end navbar-collapse -->
        </div> <!-- end container-fluid -->
    </nav> <!-- /menu-top -->

</header>