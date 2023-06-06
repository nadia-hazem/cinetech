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
            /* body: JSON.stringify({ id, type, userId }), */
            body: {
                id: id,
                type: type,
                userId: userId,
            },
        });
    
        const data = await response.text();
    
        return data.isFavorite;

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

