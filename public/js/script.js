export const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTAyMzUyYjNiNmEyNWFhMGFjYzMzMjdmM2EyMWZkZiIsInN1YiI6IjY0NjFmNDY3NmUwZDcyMDBlMzFkNWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQupnjWOqDsMJQt1hWsEREsbFODpbc8TFxE4ULFhhNY";
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey
    }
};
import { addFavorite } from './favorites.js';
import { getFavorites } from './favorites.js';
import { showFavorites } from './favorites.js';

const itemsPerPage = 20; // Nombre de films par page

/**************Fonctions de display******************/
// item film
export async function createMovieElement(item) {
    const divItem = document.createElement('div');
    divItem.classList.add('item');
    // img
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);
    // Ajout du lien vers la page de détail
    const itemLink = document.createElement('a');
    itemLink.href = "#";
    itemLink.appendChild(posterImg);
    divItem.appendChild(itemLink);
    // overlay
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('item-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    divItem.appendChild(overlayDiv);
    // title
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = item.title;
    divItem.appendChild(titleHeading);
    // ajout du bouton favoris
    const divFav = document.createElement('div');
    divFav.classList.add('div-fav');
    const favButton = document.createElement('button');
    favButton.classList.add('fav-button btn btn-dark rounded-0');
    favButton.setAttribute('data-item-id', item.id);
    favButton.textContent = 'Ajouter aux favoris';
    divFav.appendChild(favButton);
    divItem.appendChild(divFav);

    // Gestionnaire d'événements du bouton "Ajouter aux favoris"
    favButton.addEventListener('click', () => {
        addFavorite(item);
    });

    // Ajout du gestionnaire d'événements pour les liens vers la page de détail
    itemLink.addEventListener('click', function (e) {
        e.preventDefault();
        const itemId = item.id;
            window.location.href = `/film-detail/${itemId}`;
        });
    return divItem;
}

// item serie
export async function createSerieElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    // img
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);

    // Ajout du lien vers la page de détail
    const itemLink = document.createElement('a');
    itemLink.href = "#";

    itemLink.appendChild(posterImg);
    itemDiv.appendChild(itemLink);
    // overlay
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('item-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    itemDiv.appendChild(overlayDiv);
    // title
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = item.title;
    itemDiv.appendChild(titleHeading);
    // ajout du bouton favoris
    const divFav = document.createElement('div');
    divFav.classList.add('div-fav');
    const favButton = document.createElement('button');
    favButton.classList.add('fav-button btn btn-dark rounded-0');
    favButton.setAttribute('data-item-id', item.id);
    favButton.textContent = 'Ajouter aux favoris';
    divFav.appendChild(favButton);
    itemDiv.appendChild(divFav);


    // Gestionnaire d'événements du bouton "Ajouter aux favoris"
    favButton.addEventListener('click', () => {
        addFavorite(item);
    });

    return itemDiv;
}

// grid film
export async function createGridMovieElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    // img
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);
    // Ajout du lien vers la page de détail
    const itemLink = document.createElement('a');
    itemLink.appendChild(posterImg);
    itemDiv.appendChild(itemLink);
    // overlay
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('item-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    itemDiv.appendChild(overlayDiv);
    // title
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = item.title;
    itemDiv.appendChild(titleHeading);
    // ajout du code pour activer les liens vers les détails du film
    itemLink.href = "/film-detail/"+item.id;

    /* itemLink.addEventListener('click', function (e) { */
        /* e.preventDefault(); */
        /* const itemId = item.id; 

        if (item.media_type === 'tv') {
            window.location.href = `serie-detail/${itemId}`;
        } else if (item.media_type === 'movie') {
            window.location.href = `film-detail/${itemId}`;
        }
    }); */

    return itemDiv;
}

// grid serie
export async function createGridSerieElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    // img
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);
    // Ajout du lien vers la page de détail
    const itemLink = document.createElement('a');
    itemLink.appendChild(posterImg);
    itemDiv.appendChild(itemLink);
    // overlay
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('item-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    itemDiv.appendChild(overlayDiv);
    // title
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = item.title;
    itemDiv.appendChild(titleHeading);
    // ajout du code pour activer les liens vers les détails de la série
        itemLink.href = "serie-detail/"+item.id;

    return itemDiv;
}
