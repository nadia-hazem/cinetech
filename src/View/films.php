<!DOCTYPE html>
<html lang="fr">

    <?php 
    $pageTitle = "Les Films";
    require_once 'src/View/inc/head.php';
    ?>

<body>
    
    <?php require_once 'src/View/inc/header.php'; ?>

    <main>
        <h1 class="h1">Les films à venir</h1>

        <div id="upcoming-movies" class="d-flex"></div>

        <h1 class="h1">Tous les films</h1>

        <div id="genre-container" class="list-group-horizontal unstyled"></div>

        <!--  <div id="genre-select-wrapper">
            <select id="genre-select">
                <option value="">Tous les genres</option>
            </select>
        </div> -->

        <div id="all-movies" class="d-flex flex-wrap grid-items justify-content-between"></div>


        <div class="d-flex justify-content-center m-5">
            <button id="prev-page-btn" class="pagination-btn btn btn-light m-auto">Précédent</button>
            <button id="next-page-btn" class="pagination-btn btn btn-light m-auto">Suivant</button>
        </div>

    </main>


    <!--------------------------------------------------------->
    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script defer type="module" src="public/js/films.js"></script>
</body>
</html>