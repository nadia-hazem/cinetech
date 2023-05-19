<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Films</title>
    <!-- Bootstrap 5.3.0 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="public/css/style.css">
    <!-- Javascript -->
    <!-- <script type="module" defer src="public/js/pagination.js"></script> -->
    <script defer src="public/js/test.js"></script>

</head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Les Films</title>
</head>
<body>
    
    <?php require_once 'src/View/inc/header.php'; ?>

    <main>
        <h1 class="h1">Les films à venir</h1>

        <div id="upcoming-movies" class="d-flex"></div>

        <h1 class="h1">Tous les films</h1>

        <div id="genre-select-wrapper">
            <select id="genre-select">
                <option value="">Tous les genres</option>
            </select>
        </div>

        <div id="all-movies" class="d-flex flex-wrap grid-movies justify-content-between"></div>


        <div class="d-flex justify-content-center m-5">
            <button id="prev-page-btn" class="pagination-btn btn btn-light m-auto">Précédent</button>
            <button id="next-page-btn" class="pagination-btn btn btn-light m-auto">Suivant</button>
        </div>
    </main>


    <!--------------------------------------------------------->
    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>