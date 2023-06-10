
<!DOCTYPE html>
<html lang="fr">

    <?php 
    $pageTitle = "Inscription";
    require_once 'src/View/inc/head.php';
    ?>

<body id="register">

    <?php require_once 'src/View/inc/header.php'; ?>
    
    <h1 class="title">S'inscrire</h1>

    <main class="container">
        <div class="row justify-content-center mx-2">
            <div class="col-lg-6 col-md-9 col-sm-12">

                <a href="/" class="text-danger mx-5">Back to home</a>

                <form method="post">
                    <div class="row mt-5 ">
                        <div class="col-6 mb-3">
                            <label for="login" class="form-label">login</label>
                            <input type="text" class="form-control" id="login" name="login" placeholder="Your Login" required>
                        </div>
                        <div class="col-6 mb-3">
                            <label for="email" class="form-label">E-Mail</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="E-mail" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
                        </div>
                        <div class="col-6 mb-3">
                            <label for="password" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="cpassword" name="cpassword" placeholder="Password" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 ">
                            <button type="submit" class="btn btn-danger my-2">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>

    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

    <script defer type="module" src="public/js/script.js"></script>
</body>
</html>