<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <!-- Bootstrap css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">

</head>
<body>

    <?php require_once 'src/View/inc/header.php'; ?>

    <main class="container my-5 w-75">
        <h1 class="fw-light my-5">Login</h1>
        <a href="/" class="btn btn-light mb-5">Back to home</a>
        <form method="post" action="">
            <div class="row">
                <div class="mb-3">
                    <label for="login" class="form-label">Login</label>
                    <input type="login" class="form-control" id="login" name="login" placeholder="Your Login" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Your Password" required>
                </div>
            </div>
            <div class="row">
                <div class="col-6 ">
                    <button type="submit" class="btn btn-dark">Submit</button>
                </div>
            </div>
        </form>
    </main>
    
    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>