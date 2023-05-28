<!DOCTYPE html>
<html lang="fr">

<?php 
$pageTitle = "Recherche";
include 'inc/head.php'; 
?>

<body>

    <?php require_once 'src/View/inc/header.php'; ?>
    
    <main class="container min-vh-100 justify-content-center align-items-center">
        <section class="row">                
            <div class="col-md-6 m-auto">                    
                <table class="table table-hover bg-light">
                    <thead>
                        <tr>
                            <th scope="col text-white">
                                <h2 class="py-5">Your search</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // récupérer les résultats de la recherche depuis la méthode search() du modèle SearchModel
                        if (isset($_GET['search'])) {
                            $searchTerm = $_GET['search'];
                            $results = $searchModel->search($searchTerm);
                        
                            // afficher les résultats dans une liste HTML
                            echo '<ul>';
                            foreach ($results as $result) {
                                echo '<li>';
                                echo '<a href="detail.php?id=' . $result['id'] . '">' . $result['title'] . '</a>';
                                echo '</li>';
                            }
                            echo '</ul>';
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
    
    <?php //include 'inc/footer.php'; ?>
    
    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    
    
    <!-- pagination -->
    <script defer type="module" src="public/js/pagination.js"></script>
    <!-- search -->
    <!-- <script defer type="module" src="/search.js"></script> -->

</body>
</html>
