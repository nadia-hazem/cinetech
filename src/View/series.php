<!DOCTYPE html>
<html lang="fr">

    <?php 
    $pageTitle = "Les Séries";
    require_once 'src/View/inc/head.php';
    ?>

<body>
    
    <?php require_once 'src/View/inc/header.php'; ?>
    
    <main>

        <h1>Les séries les mieux notées</h1>

        <div id="top-rated-series" class="d-flex"></div>

        <h1>Toutes les séries</h1>

        <div id="genre-container" class="d-flex flex-wrap justify-content-center"></div>

        <!-- <div id="genre-select-wrapper">
            <select id="genre-select">
                <option value="">Tous les genres</option>
            </select>
        </div> -->

        <div id="all-series" class="d-flex flex-wrap grid-series justify-content-between"></div>

        <div class="d-flex justify-content-center m-5">
            <button id="prev-page-btn" class="pagination-btn btn btn-light m-auto">Précédent</button>
            <button id="next-page-btn" class="pagination-btn btn btn-light m-auto">Suivant</button>
        </div>

    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

    <script defer type="module" src="public/js/series.js"></script>

</body>
</html>