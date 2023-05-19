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
    <script defer src="public/js/detail.js"></script>

</head>
<body>

    <?php require_once 'src/View/inc/header.php'; ?>

    <main class="container">

        <div id="movie-detail" class="d-flex"></div>

        <div>
            <h3>Films similaires :</h3>
            <ul id="similar-movies" class="d-flex"></ul>
        </div>

    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>