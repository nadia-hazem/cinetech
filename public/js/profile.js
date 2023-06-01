// variables
let validation = false;
// login
const loginForm = document.querySelector("#loginForm");
let loginInput = loginForm.querySelector(".login");
let passwordInput = loginForm.querySelector(".password");
const loginButton = loginForm.querySelector("#btnModifLogin");
let user = loginInput.value;

// password
const passwordForm = document.querySelector("#passwordForm");
let oldPasswordInput = passwordForm.querySelector("#oldPassword");
let newPasswordInput = passwordForm.querySelector("#newPassword");
let newPasswordConfirmInput = passwordForm.querySelector("#newPassword2");
const passwordButton = passwordForm.querySelector("#btnModifPass");

/////////////////////////////////////
// Functions for login and password //
////////////////////////////////////

async function checkLogin() {
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
            const response = await fetch("../../src/Controller/UserController.php", {
                method: "POST",
                headers: {
                    accept: "application/json",

                },
                body: data,
            });

            const responseData = await response.text();  // get the response text

            if (responseData == "indispo") {   // use responseData instead of data
                loginInput.nextElementSibling.innerHTML = "Login not available";
                // change border color and background
                loginInput.style.borderColor = "red";
                loginInput.style.backgroundColor = "#fde2e2";
                validation = false;
            } else if (responseData == "dispo") {  // use responseData instead of data
                loginInput.nextElementSibling.innerHTML = "Login available";
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

async function modifLogin(newLogin, oldLogin, password) {
    try {
        const response = await fetch("../../src/Controller/UserController.php?updateLogin=1", {
            method: "POST",
            body: JSON.stringify({newLogin: newLogin, oldLogin: oldLogin, password: password}),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.text();
        console.log(data);
        console.log(response);
        console.log(response.ok);
        console.log(response.status);
        
        if(!response.ok) {
            throw new Error("Erreur lors de la modification du login");
        }

        if (data === "ok") {
            console.log("Login a été modifié avec succès");
            loginInput.nextElementSibling.innerHTML = "Login a été modifié avec succès";
            loginInput.style.borderColor = "initial";
            loginInput.style.backgroundColor = "fafafa";
        } else if (data === "incorrect") {
            console.log("Le mot de passe est incorrect");
            passwordInput.nextElementSibling.innerHTML = "Le mot de passe est incorrect";
            passwordInput.style.borderColor = "red";
            passwordInput.style.backgroundColor = "#fde2e2";
        } else {
            console.log("Erreur lors de la modification du login");
            passwordInput.nextElementSibling.innerHTML = "Erreur lors de la modification du login";
        }
    } catch (error) {
        console.log(error);
        passwordInput.nextElementSibling.innerHTML = "Erreur, la modification du login a échoué";
    }
}

// function to check if the password is valid
async function checkPassword(pass) {
    let passwordValue = pass.value;
    if (passwordValue == "") {
        pass.nextElementSibling.innerHTML = "Password required";
        // change border color and background
        pass.style.borderColor = "red";
        pass.style.backgroundColor = "#fde2e2";
        validation = false;
    } else {
        pass.nextElementSibling.innerHTML = "";
        // change border color and background
        pass.style.borderColor = "initial";
        pass.style.backgroundColor = "#fafafa";
        validation = true;
    }
}

// function to check if the new password confirm is valid
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
// events for login             //
/////////////////////////////////
// login
loginInput.addEventListener("blur", checkLogin);

// password
passwordInput.addEventListener("blur", function (e) {
checkPassword(passwordInput);
});

// login form
loginButton.addEventListener("click", async function (e) {
    e.preventDefault();

    // Get the new login, old login, and password values from the form
    const newLogin = loginInput.value;
    const oldLogin = user;
    const password = passwordInput.value;

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
            const response = await fetch("../../src/Controller/UserController.php", {
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