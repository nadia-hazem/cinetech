<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    // Vérifiez si la variable $pageTitle est définie (dans la page)
    if (isset($pageTitle)) {
        echo "<title>". $pageTitle ." - Cinétech</title>"; // Afficher le titre de la page
    } else {
        echo "<title>Cinétech</title>"; // Afficher un titre par défaut si pas de titre défini
    }
    ?>
    <!-- Bootstrap 5.3.0 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
    <!-- Jquery -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g="crossorigin="anonymous"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="/public/css/style.css">

    <!-- Menu responsive Bootstrap -->
    <script>
    $('.navbar-toggler').click(function() {
        $('.navbar-collapse').toggle();
    });
    </script>

    <!-- Javascript -->
    <?php 
    // Ce script fonctionne mais l'ordre de chargement pose problème au chargement des fetchs alors j'ai appelé les script directement dans les pages avant la fermeture de la balise body.

/*     $pageName = basename($_SERVER['PHP_SELF'], ".php"); //obtenez le nom de la page actuelle, sans l'extension .php
    if ($pageName === 'home') {
        echo '<script defer src="public/js/home.js"></script>';
    } else if ($pageName === 'films') {
        echo '<script defer src="public/js/films.js"></script>';
    } else if ($pageName === 'series') {
        echo '<script defer src="public/js/series.js"></script>';
    } else if ($pageName === 'films-detail') {
        echo '<script defer src="public/js/film-detail.js"></script>';
    } */
    ?>


</head>
