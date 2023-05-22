<!DOCTYPE html>
<html lang="fr">

    <?php 
    $pageTitle = "Accueil";
    include 'src/View/inc/head.php';

    /* var_dump($apiKey); */
    ?>
<body>
    <?php require_once 'src/View/inc/header.php'; ?>

    <main>

        <h1>Dans les salles</h1>
        <div id="now-playing-movies" class="d-flex"></div>
        
        <h1>Les films les plus populaires</h1>
        <div id="popular-movies" class="d-flex"></div>

        <h1>Découvrez les dernières séries</h1>
        <div id="latest-series" class="d-flex"></div>

        <h1>Les séries les plus populaires</h1>
        <div id="popular-series" class="d-flex"></div>

    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    <script defer type="module" src="public/js/home.js"></script>
</body>
</html>
