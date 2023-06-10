import { showSuccessMessage, showErrorMessage } from './script.js';

// variables
let validation = false;
// login
const loginForm = document.querySelector("#loginForm");
let loginInput = loginForm.querySelector(".login");
let passwordInput = loginForm.querySelector(".password");
const loginButton = loginForm.querySelector("#btnModifLogin");
// password
const passwordForm = document.querySelector("#passwordForm");
let oldPasswordInput = passwordForm.querySelector("#oldPassword");
let newPasswordInput = passwordForm.querySelector("#newPassword");
let newPasswordConfirmInput = passwordForm.querySelector("#newPassword2");
const passwordButton = passwordForm.querySelector("#btnModifPass");


/////////////////////////////////////
// Functions for login & password //
////////////////////////////////////

async function modifLogin(event) {

    const newLoginInput = loginForm.querySelector(".newLogin");
    const newLogin = newLoginInput.value;
    const oldLogin = newLoginInput.getAttribute('data-user-login');
    const password = passwordInput.value;

    console.log(newLogin, oldLogin, password);

    try {
        const loginStatus = await checkLogin(newLogin);
        if (loginStatus === 'dispo') {
            // Login disponible
            showSuccessMessage(loginInput, 'Login disponible');

            console.log('loginInput', loginInput);

            return;
        } else if (loginStatus === 'indispo') {
            // Login indisponible
            showErrorMessage(loginInput, 'Login indisponible');
            return;
        } else if (loginStatus === '') {
            // Ne rien faire, initialisation du formulaire
            return;
        }
        console.log(loginStatus);

        const passwordCorrect = await checkPassword(password);

        console.log(passwordCorrect);

        if (!passwordCorrect) {
            // Mot de passe incorrect, afficher un message d'erreur
            showErrorMessage(passwordInput, 'Mot de passe incorrect');
            return;
        }

        const updateSuccess = await updateLogin(newLogin, oldLogin, password);
        if (updateSuccess) {
            // Login mis à jour avec succès
            showSuccessMessage(loginInput, 'Login mis à jour avec succès');
            return;
        } else {
            // Erreur lors de la mise à jour du login
            showErrorMessage(loginInput, 'Erreur lors de la mise à jour du login');
        }
    } catch (error) {
        console.error(error);
    }
}

async function checkLogin(newLogin) {
    const oldLogin = loginInput.getAttribute("data-user");
    let loginValue = loginInput.value;
    if (loginValue == "") {
        loginInput.nextElementSibling.innerHTML = "Login requis";
        // change border color and background
        loginInput.style.borderColor = "red";
        loginInput.style.backgroundColor = "#fde2e2";
        // loginInput.style.backgroundColor = "#ff000063";
        validation = false;
    } else if (loginValue == oldLogin) {
        loginInput.nextElementSibling.innerHTML = "";
        // change border color and background
        loginInput.style.borderColor = "initial";
        loginInput.style.backgroundColor = "fafafa";
        validation = false;
    } else {
        loginInput.nextElementSibling.innerHTML = "";
        // change border color and background
        loginInput.style.borderColor = "initial";
        let data = new FormData();
        data.append("checkLogin", loginValue);

        try {
            const response = await fetch("/checkLogin", {
                method: "POST",
                headers: {
                    accept: "application/json",

                },
                body: data,
            });

            const responseData = await response.json();

            if (responseData.status === "indispo") {
                loginInput.nextElementSibling.innerHTML = "Login indisponible";
                // change border color and background
                loginInput.style.borderColor = "red";
                loginInput.style.backgroundColor = "#fde2e2";
                validation = false;
            } else if (responseData.status === "dispo") {
                loginInput.nextElementSibling.innerHTML = "Login disponible";
                // change border color and background
                loginInput.style.borderColor = "initial";
                loginInput.style.backgroundColor = "fafafa";
                validation = true;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

async function updateLogin(newLogin, oldLogin, password) {
    const response = await fetch('/updateLogin', {
        method: 'POST',
        body: JSON.stringify({ 
            newLogin, oldLogin, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.text();
    return response.ok && data === 'ok';
}

async function checkPassword(passwordInput) {
    const passwordValue = passwordInput.value;

    if (passwordValue === "") {
        showErrorMessage(passwordInput, 'Mot de passe requis');
        return false;
    } else {
        showSuccessMessage(passwordInput, ''); // Effacer le message s'il existe

        const response = await fetch('/checkPassword', {
            method: 'POST',
            body: 'password=' + encodeURIComponent(passwordValue),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const data = await response.text();
        return response.ok && data === 'ok';
    }
}

function checkNewPasswordConfirm() {
    const newPasswordValue = newPasswordInput.value;
    const newPasswordConfirmValue = newPasswordConfirmInput.value;

    if (newPasswordConfirmValue === "") {
        showErrorMessage(newPasswordConfirmInput, 'Mot de passe requis');
        return false;
    } else if (newPasswordValue !== newPasswordConfirmValue) {
        showErrorMessage(newPasswordConfirmInput, 'Mot de passe érroné');
        return false;
    } else {
        showSuccessMessage(newPasswordConfirmInput, ''); // Effacer le message s'il existe
        return true;
    }
}

/////////////////////////////////
// events for Input           //
////////////////////////////////
// login
loginInput.addEventListener("blur", checkLogin);

// password
passwordInput.addEventListener("blur", function (e) {
    checkPassword(passwordInput);
});

// old password
oldPasswordInput.addEventListener("blur", function (e) {
    checkPassword(oldPasswordInput);
});
    
// new password
newPasswordInput.addEventListener("blur", function (e) {
    checkPassword(newPasswordInput);
});
    
// new password confirm
newPasswordConfirmInput.addEventListener("keyup", checkNewPasswordConfirm);
    

/////////////////////////////////
// events for click           //
////////////////////////////////
// login form
// Gestionnaire d'événement pour le formulaire de connexion
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const newLoginInput = loginForm.querySelector(".newLogin");
    const newLogin = newLoginInput.value;
    const oldLogin = newLoginInput.getAttribute("data-user");
    const password = passwordInput.value;
    await modifLogin(newLogin, oldLogin, password);
});


// password form
// Gestionnaire d'événement pour le formulaire de modification du mot de passe
passwordForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    // Récupérez les valeurs des champs spécifiques au formulaire de modification du mot de passe
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const newPasswordConfirm = newPasswordConfirmInput.value;
    await modifPassword(oldPassword, newPassword, newPasswordConfirm);
});

/////////////////////////////////
// events for password          //
/////////////////////////////////

/* // password form
passwordButton.addEventListener("click", async function (e) {
    e.preventDefault();
    if (validation) {
        let data = new FormData(passwordForm);
        data.append("modifPass", "ok");
        try {
            const response = await fetch("/src/Controller/UserController.php", {
                method: "POST",
                body: data,
                headers: {
                    accept: "application/json",
                },
            });
    
            if (response.ok) {
                const responseData = await response.text();
                const trimmedResponse = responseData.trim();
    
                if (trimmedResponse === "ok") {
                    passwordButton.nextElementSibling.innerHTML = "Successful update";
                    // reset form
                    passwordForm.reset();
                    oldPasswordInput.nextElementSibling.innerHTML = "";
                    newPasswordInput.nextElementSibling.innerHTML = "";
                    newPasswordConfirmInput.nextElementSibling.innerHTML = "";
                } else if (trimmedResponse === "incorrect") {
                    oldPasswordInput.nextElementSibling.innerHTML = "Invalid password";
                    oldPasswordInput.style.borderColor = "red";
                    oldPasswordInput.style.backgroundColor = "#fde2e2";
                }
            } else {
            console.log("Une erreur s'est produite.");
            }
        } catch (error) {
            console.log(error);
        }
    }
}); */