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
    <script defer src="public/js/series.js"></script>

</head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Séries</title>
</head>
<body>
    
    <?php require_once 'src/View/inc/header.php'; ?>
    
    <main>

        <h1>Les séries à venir</h1>

        <div id="upcoming-series" class="d-flex"></div>

        <h1>Toutes les séries</h1>

        <div id="genre-select-wrapper">
            <select id="genre-select">
                <option value="">Tous les genres</option>
            </select>
        </div>

        <div id="all-series" class="d-flex flex-wrap grid-series justify-content-between"></div>

    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>