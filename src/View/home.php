<!DOCTYPE html>
<html lang="fr">

    <?php 
    $pageTitle = "Accueil";
    include 'src/View/inc/head.php';

    /* var_dump($apiKey); */
    ?>
<body>
    <?php require_once 'src/View/inc/header.php'; ?>

    <section class="hero">
        <div class="hero-container">
            <h1 class="hero-title">Bienvenue sur Cinetech</h1>
            <!-- <p class="hero-text"></p> -->
        </div>
    </section>
    
    <div id="banner" class="banner py-3 px-5 bg-black">
        <span id="bannerText">Le site de référence pour les films et les séries. Retrouvez les dernières infos sorties, les films et séries les plus populaires, les films et les séries à venir. Inscrivez-vous ! et faites votre liste de favoris</span>
    </div>

    <main>

        <h1>Dans les salles</h1>
        <div id="now-playing-movies" class="d-flex py-3"></div>

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

    <script>
        const bannerTextElement = document.getElementById('bannerText');
        const bannerText = "Le site de référence pour les films et les séries. Retrouvez les dernières sorties, les films et séries les plus populaires, les films à venir et les séries à venir.";
        bannerTextElement.textContent = bannerText;
    </script>

</body>
</html>
