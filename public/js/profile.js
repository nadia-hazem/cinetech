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
    const newLogin = loginInput.value;
    const oldLogin = loginInput.getAttribute("data-user");
    const password = passwordInput.value;

    try {
    const loginAvailable = await checkLogin(newLogin);
    if (!loginAvailable) {
        // Login non disponible, afficher un message d'erreur
        showErrorMessage(loginInput, 'Login indisponible');
        return;
    }

    const passwordCorrect = await checkPassword();
    if (!passwordCorrect) {
        // Mot de passe incorrect, afficher un message d'erreur
        showErrorMessage(passwordInput, 'Mot de passe incorrect');
        return;
    }

    const updateSuccess = await updateLogin(newLogin, oldLogin, password);
    if (updateSuccess) {
        console.log('Le login a été mis à jour dans la base de données');
        // Réinitialiser le formulaire
        loginForm.reset();
        loginInput.nextElementSibling.innerHTML = "";
        passwordInput.nextElementSibling.innerHTML = "";
    } else {
        console.log('Erreur lors de la mise à jour du login dans la base de données');
    }
    } catch (error) {
    console.log('Erreur lors de la modification du login', error);
    }
}

async function checkLogin() {
    let user = loginInput.getAttribute("data-user");
    let loginValue = loginInput.value;
    if (loginValue == "") {
        loginInput.nextElementSibling.innerHTML = "Login requis";
        // change border color and background
        loginInput.style.borderColor = "red";
        loginInput.style.backgroundColor = "#fde2e2";
        // loginInput.style.backgroundColor = "#ff000063";
        validation = false;
    } else if (loginValue == user) {
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
        data.append("checkLogin", loginValue ); // add the login value to FormData

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
                loginInput.nextElementSibling.innerHTML = "Login non disponible";
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

async function checkPassword(password) {
    let passwordValue = password.value;
    if (passwordValue == "") {
        password.nextElementSibling.innerHTML = "Password required";
        // change border color and background
        password.style.borderColor = "red";
        password.style.backgroundColor = "#fde2e2";
        validation = false;
    } else {
        password.nextElementSibling.innerHTML = "";
        // change border color and background
        password.style.borderColor = "initial";
        password.style.backgroundColor = "fafafa";
        validation = true;
    }

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

async function updateLogin(newLogin, oldLogin, password) {
    const response = await fetch('/updateLogin', {
        method: 'POST',
        body: JSON.stringify({ newLogin, oldLogin, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.text();
    return response.ok && data === 'ok';
}

function showErrorMessage(inputElement, message) {
    inputElement.nextElementSibling.innerHTML = message;
    inputElement.style.borderColor = 'red';
    inputElement.style.backgroundColor = '#fde2e2';
}

async function checkNewPasswordConfirm() {
    let newPasswordValue = newPasswordInput.value;
    let newPasswordConfirmValue = newPasswordConfirmInput.value;
    if (newPasswordConfirmValue == "") {
        newPasswordConfirmInput.nextElementSibling.innerHTML =
        "Password required";
        // change border color and background
        newPasswordConfirmInput.style.borderColor = "red";
        newPasswordConfirmInput.style.backgroundColor = "#fde2e2";
        validation = false;
    } else if (newPasswordConfirmValue != newPasswordValue) {
        newPasswordConfirmInput.nextElementSibling.innerHTML =
        "Password does not match";
        // change border color and background
        newPasswordConfirmInput.style.borderColor = "red";
        newPasswordConfirmInput.style.backgroundColor = "#fde2e2";
        validation = false;
    } else {
        newPasswordConfirmInput.nextElementSibling.innerHTML = "";
        // change border color and background
        newPasswordConfirmInput.style.borderColor = "initial";
        newPasswordConfirmInput.style.backgroundColor = "#fafafa";
        validation = true;
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

/////////////////////////////////
// events for click           //
////////////////////////////////
// login form
loginButton.addEventListener("click", async function (e) {
    e.preventDefault();

    // Get the new login, old login, and password values from the form
    let user = loginInput.getAttribute("data-user");
    const newLogin = loginInput.value;
    const oldLogin = user;
    const password = passwordInput.value;

    console.log(newLogin, oldLogin, password);

    // Call the updateLogin function with the new login, old login, and password values
    await modifLogin(newLogin, oldLogin, password);
});

/////////////////////////////////
// events for password          //
/////////////////////////////////
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

// password form
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
});