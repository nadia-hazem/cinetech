<!DOCTYPE html>
<html lang="fr">

    <?php 
    $pageTitle = "Les Films";
    require_once 'src/View/inc/head.php';
    ?>

<body>
    
    <?php require_once 'src/View/inc/header.php'; ?>

    <main>

        <div class="title">
            <h1 class="title">LES FILMS</h1>
        </div>

        <h1 class="h1">Les films à venir</h1>
        <div id="upcoming-movies" class="aura d-flex"></div>

        <h1 class="h1">Tous les films</h1>
        <div id="genre-container" class="list-group-horizontal unstyled text-secondary"></div>
        <div id="all-movies" class="aura d-flex flex-wrap grid-items justify-content-between"></div>

        <div class="d-flex justify-content-center m-5">
            <button id="prev-page-btn" class="pagination-btn m-auto text-secondary">Précédent</button>
            <div id="pagination-numbers" class="pagination-numbers text-secondary"></div>
            <button id="next-page-btn" class="pagination-btn m-auto text-secondary">Suivant</button>
        </div>

    </main>

    <!---------------------------scripts------------------------------>
    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    
    
    <!-- pagination -->
    <script defer type="module" src="public/js/pagination.js"></script>
    <!-- films -->
    <script defer type="module" src="public/js/films.js"></script>
</body>
</html>