<!DOCTYPE html>
<html lang="en">

    <?php 
    $pageTitle = "Recherche";
    include 'inc/head.php'; 
    ?>

<body>

    <?php require_once 'src/View/inc/header.php'; ?>
        
    <?php include 'inc/header.php'; ?>
        
        <main class="container min-vh-100 justify-content-center align-items-center">
            <section class="row ">                
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
                            // récupérer les résultats de la recherche depuis la méthode searchItem()
                            $search = $_GET['searchInput'];
                            $results = $item->searchItem($search);

                            // afficher les résultats dans une liste HTML
                            ?>
                            <tr>
                                <td>
                                    <ul>
                                        <li class="list-unstyled">
                                            <?php foreach ($results as $result) : ?>
                                                <a href="detail.php?id=<?= $result['id'] ?>"> <?= $result['title'] ?></a>
                                                <?php endforeach; ?>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </section>
        </main>
        
    </div> <!-- /wrapper -->
    
    <?php //include 'inc/footer.php'; ?>
    
    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script type="text/javascript" src="public/js/search.js"></script>

</body>

</html>