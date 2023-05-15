<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>detail</title>
    <!-- Bootstrap 5.3.0 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
    
</head>
<body>

    <main class="container">

        <h2>{{ movieTitle }}</h2>
        <p><strong>Réalisateur :</strong> {{ movieDirector }}</p>
        <p><strong>Type :</strong> {{ movieType }}</p>
        <p><strong>Pays d'origine :</strong> {{ movieCountry }}</p>
        <p><strong>Résumé :</strong> {{ movieSummary }}</p>

        <h3>Acteurs :</h3>
        <ul>
            {% for actor in movieActors %}
                <li>{{ actor }}</li>
            {% endfor %}
        </ul>

        <div>
            <h3>Films similaires :</h3>
            <ul id="similar-movies"></ul>
        </div>

    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>