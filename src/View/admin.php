<?php
// Path: src\View\admin.php

require_once 'src/Controller/UserController.php';
require_once 'src/Model/UserModel.php';

$userModel = new \App\Model\UserModel();
$user = new \App\Controller\UserController();

// if user is not logged in
if (!$user->isLogged()) {
    header('Location: /login');
    exit;
}
// Obtenez l'utilisateur actuel connecté
$loggedInUser = $user->getCurrentUser();
$login = $loggedInUser['login'];
// Vérifiez si l'utilisateur est un administrateur
if ($loggedInUser && $loggedInUser['role'] == 'user') {
    header('Location: /profile');
    exit;
} else {
    $user = $user->getCurrentUser();
    $login = $user['login'];
    $email = $user['email'];
}


?>
<!DOCTYPE html>
<html lang="fr">

    <?php 
    $pageTitle = "Admin";
    require_once 'src/View/inc/head.php';
    ?>

<body>
    
    <?php require_once 'src/View/inc/header.php'; ?>

    <main>
        <?php
        ?>
        <h1 class="mb-5">Welcome <?= $login ?></h1>

        <div class="tab">
            <button class="tablinks" onclick="openTab(event, 'infos')">Informations</button>
            <button class="tablinks" onclick="openTab(event, 'login')">Change Login</button>
            <button class="tablinks" onclick="openTab(event, 'password')">Change Password</button>
            <!-- <button class="tablinks" onclick="openTab(event, 'favorites')">Favorites</button> -->
        </div>

        <!-- Tab infos -->
        <div id="infos" class="tabcontent p-2">
            <div class="row justify-content-between">
                <div class="col-lg-5 col-md-12 col-sm-12 bg-light p-3 my-1 shadow">
                    <p class="text-muted">Login: <?= $login ?></p>
                    <p class="text-muted">E-mail: <?= $email ?></p>
                </div>
            </div>
        </div>

        <!-- Tab login -->
        <div id="login" class="tabcontent p-2">
            <div class="row wrap justify-content-between">
                <div class="col">
                    <!-- FORMS -->
                    <form action="" method="post" id="loginForm" class="col-lg-6 col-md-12 col-sm-12 bg-secondary shadow my-2 p-5">
                        <div class="d-flex my-5">
                            <i class="fa fa-user fa-2x mx-2"></i>
                            <h5 class="mb-3 text-light">Change login</h5>
                        </div>
                        <div class="col">
                            <div class="row">
                                <label for="login">login</label>
                                <input type="text" name="login" class="login rounded " value="<?= $login ?>" required>
                                <p></p>
                            </div>
                            <div class="row">
                                <label for="password">Password</label>
                                <input type="password" name="password" class="password rounded" placeholder="" required>
                                <p></p>
                            </div>
                            <div class="col">
                                <input type="submit" value="Change" name="send" id="btnModifLogin" class="btn btn-dark my-2">
                                <p></p>
                            </div>
                        </div> <!-- /col -->
                    </form>
                </div> <!-- /col -->
            </div> <!-- /row -->
        </div>

        <!-- Tab password -->
        <div id="password" class="tabcontent p-2">
            <div class="row wrap justify-content-between">
                <div class="col">
                    <form action="" method="post" id="passwordForm" class="col-lg-6 col-md-12 col-sm-12 bg-secondary shadow my-2 p-5">
                        <div class="d-flex my-5">
                            <i class="fa fa-lock fa-2x mx-2"></i>
                            <h5 class="mb-3">Change password</h5>
                        </div>
                        <div class="row">
                            <label for="password">Current password</label>
                            <input type="password" name="password" class="password rounded" placeholder="" id="oldPassword" required>
                            <p></p>
                        </div>
                        <div class="row">
                            <label for="newPassword">New password</label>
                            <input type="password" name="newPassword" id="newPassword rounded" class="password" placeholder="" required>
                            <p></p>
                        </div>
                        <div class="row">
                            <label for="newPassword2">Confirmation</label>
                            <input type="password" name="newPassword2" id="newPassword2" class="password" placeholder="" required>
                            <p></p>
                        </div>
                        <div class="col">
                            <input type="submit" value="Change" name="send" id="btnModifPass" class="btn btn-dark my-2">
                            <p></p>
                        </div>

                    </form>
                </div> <!-- /col -->
            </div> <!-- /row -->
        </div>

    </main>

    <!---------------------------scripts------------------------------>
    <!-- Bootstrap js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        /* Tabs script */
        function openTab(evt, information) {
            let i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace("active", "");
            }

            document.getElementById(information).style.display = "block";
            evt.currentTarget.className += " active";
        }
    </script>

</body>
</html>