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
        .movies-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 2rem 0;
        }

        .movie {
            width: 300px;
            margin: 1rem;
            text-align: center;
        }

        .movie img {
            width: 100%;
            height: auto;
            margin-bottom: 1rem;
        }

        .movie h2 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }

        .movie p {
            font-size: 0.9rem;
            line-height: 1.2;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>

    <main>

        <h1>Bienvenue sur mon application de films !</h1>

        <?php
        // Afficher les derniers films
        if (!empty($latestMovies)) {
            echo '<h2>Derniers films</h2>';
            echo '<div class="movies-container">';
            foreach ($latestMovies as $movie) {
                echo '<div class="movie">';
                echo '<img src="https://image.tmdb.org/t/p/w300/'.$movie->poster_path.'" alt="'.$movie->title.'">';
                echo '<h2>'.$movie->title.'</h2>';
                echo '<p>'.$movie->overview.'</p>';
                echo '</div>';
            }
            echo '</div>';
        }

        // Afficher les films populaires
        if (!empty($popularMovies)) {
            echo '<h2>Films populaires</h2>';
            echo '<div class="movies-container">';
            foreach ($popularMovies as $movie) {
                echo '<div class="movie">';
                echo '<img src="https://image.tmdb.org/t/p/w300/'.$movie->poster_path.'" alt="'.$movie->title.'">';
                echo '<h2>'.$movie->title.'</h2>';
                echo '<p>'.$movie->overview.'</p>';
                echo '</div>';
            }
            echo '</div>';
        }
        ?>

    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>