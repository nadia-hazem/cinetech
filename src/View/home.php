<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <!-- Bootstrap 5.3.0 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
    
    <style>
        .movie-container {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
        }

        .movie {
            width: 200px;
            margin: 1rem;
            scroll-snap-align: center;
            border-radius: 6px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease-in-out;
            cursor: pointer;
        }

        .movie:hover {
            transform: scale(1.05);
            z-index: 1;
        }

        .movie:hover:before {
            opacity: 0.3;
        }

        .movie:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1));
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
        }

        .movie img {
            width: 100%;
            height: auto;
            object-fit: cover;
            transition: transform 0.2s ease-in-out;
        }

        .movie:hover img {
            transform: scale(1.1);
        }

        .movie h2 {
            font-size: 1rem;
            margin-bottom: 0.5rem;
            font-weight: 500;
            text-align: center;
            color: #fff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .movie p {
            display: none;
            font-size: 0.8rem;
            line-height: 1.2;
            margin-bottom: 1rem;
            text-align: center;
            color: #fff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .movie:hover p {
            display: block;
        }
    </style>
</head>
<body>

    <main>

    <?php
    $movieController = new \App\Controller\MovieController();
    $latestMovies = $movieController->displayLatestMovies();

    // Afficher chaque film
    foreach ($latestMovie as $movie) {
        // Vérifier si le film a une image de poster
        if (!empty($movie->poster_path)) {
            // Construire l'URL de l'image du poster en utilisant le champ poster_path et la base URL de l'API
            $posterUrl = "https://image.tmdb.org/t/p/w200" . $movie->poster_path;

            // Afficher l'image du poster
            echo "<img src=\"$posterUrl\" alt=\"$movie->title\">";
        }
    }
    ?>


    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>