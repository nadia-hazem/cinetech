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

console.log(currentUser);

/**************Fonctions de display******************/

export async function getCurrentUser() {
    try {
        const response = await fetch("/getCurrentUser");
        const data = await response.text();
        return data;

    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function isFavorite(id, type, userId) {
    try {
        const response = await fetch("/isFav", {
            method: "POST",
            body: JSON.stringify({ id, type, userId }),
            headers: {
            "Content-Type": "application/json",
            },
        });
    
        const data = await response.text();
    
        return data.isFavorite;

    } catch (error) {
        console.error(error);
    return false;
    }
}