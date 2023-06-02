// path : public\js\favorites.js

import { createGridMovieElement, createGridSerieElement } from './script.js';

const divFav = document.querySelector("#favorites");
const favButton = document.querySelector(".fav-button");

// Fonction pour récupérer les favoris depuis le contrôleur
export async function getFavorites() {
    try {
        const response = await fetch('/favorites');

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
    const favoritesGrid = document.getElementById('favorites-grid');
    favoritesGrid.innerHTML = '';
    if (favorites.length === 0) {
        const noFavoritesParagraph = document.createElement('p');
        noFavoritesParagraph.textContent = 'Aucun favori pour le moment';
        favoritesGrid.appendChild(noFavoritesParagraph);
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

        favoritesGrid.appendChild(favoriteItem);
    });
}

// Fonction pour ajouter un favori
export async function addFavorite(item) {
    try {
        const response = await fetch('/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (!response.ok) {
            throw new Error('Impossible d\'ajouter le favori');
        }

        const favorites = await response.json();
        // Les favoris sont stockés dans un tableau JSON

        return favorites;

    } catch (error) {
        console.error(error);
    }
}