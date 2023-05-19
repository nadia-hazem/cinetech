<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <!-- Bootstrap 5.3.0 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="public/css/style.css">
    <!-- Javascript -->
    <script defer src="public/js/index.js"></script>

</head>
<body>
    <?php require_once 'src/View/inc/header.php'; ?>

    <main>

        <h1>Dans les salles</h1>
        <div id="now-playing" class="d-flex"></div>

        <h1>Découvrez les dernières séries</h1>
        <div id="latest-series" class="d-flex"></div>

        <h1>Les films les plus populaires</h1>
        <div id="popular-movies" class="d-flex"></div>

        <h1>Les séries les plus populaires</h1>
        <div id="popular-series" class="d-flex"></div>

    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>