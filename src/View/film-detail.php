<!DOCTYPE html>
<html lang="fr">

    <?php 
    $pageTitle = "Film-Détail";
    require_once 'src/View/inc/head.php';
    ?>

<body>

    <?php require_once 'src/View/inc/header.php'; ?>

    <main class="container">

        <!-- Titre du film -->
        <div id="item-detail" class="d-flex"></div>

        <div>
            <h3>Films similaires :</h3>
            <ul id="similar-movies" class="d-flex"></ul>
        </div>

    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    <?php ($itemId) ?>
    <script defer type="module" src="public/js/film-detail.js"></script>
</body>
</html>