// path : public\js\favorites.js

import { createGridMovieElement, createGridSerieElement } from './template.js';
import { isFavorite } from './script.js';

const divFav = document.querySelector("#favorites");
const favButton = document.querySelector(".fav-button");

// Utiliser les valeurs récupérées
console.log('User ID:', userId);
console.log('User Login:', userLogin);

// Fonction pour récupérer les favoris depuis le contrôleur
export async function getFavorites() {
    try {
        const response = await fetch('/profile/favorites');

        if (!response.ok) {
            throw new Error('Impossible de récupérer les favoris');
        }

        const favorites = await response.json();
        // Les favoris sont stockés dans un tableau JSON

        return favorites;

    } catch (error) {
        console.error(error);
    }
}

// Fonction pour afficher les favoris dans l'interface utilisateur
export function showFavorites(favorites) {
    const sectionFav = document.getElementById('favorites');
    sectionFav.innerHTML = '';
    if (favorites.length === 0) {
        const noFavoritesParagraph = document.createElement('p');
        noFavoritesParagraph.textContent = 'Aucun favori pour le moment';
        sectionFav.appendChild(noFavoritesParagraph);
    }
    favorites.forEach(favorite => {
        let favoriteItem;
        if (favorite.type === 'movie') {
            favoriteItem = createGridMovieElement(favorite);
        } else if (favorite.type === 'serie') {
            favoriteItem = createGridSerieElement(favorite);
        } else {
            console.error('Type de favori inconnu');
        }

        sectionFav.appendChild(favoriteItem);
    });
}

// Fonction pour ajouter un favori
export async function addFavorite(item) {
    try {
        const response = await fetch('/addFavorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (!response.ok) {
            throw new Error('Impossible d\'ajouter le favori');
        }

        const favorites = await response.text();
        // Les favoris sont stockés dans un tableau JSON

        return favorites;

    } catch (error) {
        console.error(error);
    }
}

// Fonction pour supprimer un favori
export async function deleteFavorite(itemId) {
    try {
        const response = await fetch('/delete/' + itemId, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Impossible de supprimer le favori');
        }

        const favorites = await response.text();

        return favorites;

    } catch (error) {
        console.error(error);
    }
}


