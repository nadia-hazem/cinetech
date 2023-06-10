export const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTAyMzUyYjNiNmEyNWFhMGFjYzMzMjdmM2EyMWZkZiIsInN1YiI6IjY0NjFmNDY3NmUwZDcyMDBlMzFkNWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQupnjWOqDsMJQt1hWsEREsbFODpbc8TFxE4ULFhhNY";
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey
    }
};

// éléments du DOM
const itemsPerPage = 20; // Nombre de films par page
const favButtons = document.querySelectorAll('.fav-button');
const favorites = document.querySelectorAll('#favorites');

// Définir les informations de l'utilisateur connecté
const currentUser = await getCurrentUser();

/**************Fonctions de display******************/

export async function getCurrentUser() {
    try {
        const response = await fetch("/getCurrentUser");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function isFavorite(id, type, userId) {
    let data = new FormData();
    data.append("id", id);
    data.append("type", type);
    data.append("userId", userId);

    try {
        const response = await fetch("/isFav", {
            method: "POST",
            body: data,
        });
    
        console.log(response);
        
        const responseData = await response.json();
        return responseData.isFavorite;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function isLogged() {
    try {
        const response = await fetch("/isLogged");
        const data = await response.json();
        return data;
    
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function showErrorMessage(inputElement, message) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.innerHTML = message;
    errorElement.style.color = 'red';
    inputElement.style.borderColor = 'red';
    inputElement.style.backgroundColor = '#fde2e2';
}

export function showSuccessMessage(inputElement, message) {
    const successElement = inputElement.nextElementSibling;
    successElement.innerHTML = message;
    successElement.style.color = 'green';
    inputElement.style.borderColor = 'green';
    inputElement.style.backgroundColor = '#e2fde2';
}
