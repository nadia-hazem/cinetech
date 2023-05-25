<!DOCTYPE html>
<html lang="fr">

    <?php 
    $pageTitle = "Série-détail";
    require_once 'src/View/inc/head.php';
    ?>

<body>
    
    <?php require_once 'src/View/inc/header.php'; ?>
    
    <main class="container">

        <div id="serie-detail" class="d-flex"></div>

        <div>
            <h1 class="h1">Séries similaires</h1>

            <div id="similar-series" class="d-flex"></div>
        </div>

    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

    <script defer type="module" src="../../public/js/serie-detail.js"></script>

</body>
</html>