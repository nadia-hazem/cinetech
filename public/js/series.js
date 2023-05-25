import { options, apiKey } from './script.js';
import { createSerieElement } from './script.js';
import { createGridSerieElement } from './script.js';
import { initializePagination } from './pagination.js';

const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');
const paginationNumbers = document.getElementById('pagination-numbers');
const totalPages = 500;

const topRatedSeries = document.querySelector("#top-rated-series");
const allSeries = document.querySelector("#all-series");
const genreContainer = document.querySelector("#genre-container");

const itemsPerPage = 20;

const random = Math.floor(Math.random() * 500) + 1;

// affiche les series par page
async function fetchSeriesByPage(page)
{
    const allSeries = document.querySelector("#all-series");
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&poster_path!=null&page=1`, options);
        
        const seriesData = await response.json();

        allSeries.innerHTML = '';

        seriesData.results.forEach(async function (item) {
            const serieDiv = await createGridSerieElement(item);
            allSeries.appendChild(serieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

// affiche les series les mieux notées
async function fetchTopRatedSeries() 
{
    try {
        const response = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=fr-FR&include_adult=false&include_video=false&poster_path!=null&region=FR&page=1', options);
        const topRatedSeriesData = await response.json();

        topRatedSeries.innerHTML = '';
        
        topRatedSeriesData.results.forEach(async function (item) {
            const serieDiv = await createSerieElement(item);
            topRatedSeries.appendChild(serieDiv);
            });
            console.log(topRatedSeriesData);
    } catch (error) {
        console.error(error);
    }
}

// fetch de toutes les series
async function fetchAllSeries() {
    try {
        const totalSeries = 500; // Nombre total de series à récupérer
        const totalPages = Math.ceil(totalSeries / itemsPerPage);

        allSeries.innerHTML = ''; // Efface le contenu actuel

        fetchSeriesByPage(1); // Récupère uniquement la première page initialement

        console.log(`Nombre total de series récupérées : ${totalSeries, totalPages, itemsPerPage}`);

        // Mettre à jour l'état des boutons de pagination
        /* updatePaginationButtons(); */
    } catch (error) {
        console.error(error);
    }
}

// affiche les genres
async function fetchSeriesGenres() {
    try {
    const Response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?language=fr-FR`, options);
    const seriesGenresData = await Response.json();

    const seriesGenres = seriesGenresData.genres;

    const seriesGenresList = document.createElement('ul');
    seriesGenresList.classList.add('d-flex','flex-wrap','list-inline');

    // Ajouter un lien pour afficher tous les genres
    const allGenresLink = document.createElement('a');
    allGenresLink.textContent = "Tous";
    allGenresLink.classList.add('list-inline-item');
    allGenresLink.href = `#`;
    allGenresLink.addEventListener('click', function(e) {
        e.preventDefault();
        fetchAllSeries(); 
    });
    const allGenresItem = document.createElement('li');
    allGenresItem.appendChild(allGenresLink);
    seriesGenresList.appendChild(allGenresItem);

    seriesGenres.forEach(genre => {
        const genreItem = document.createElement('li');
        const genreLink = document.createElement('a');
        genreLink.textContent = genre.name;
        genreLink.classList.add('list-inline-item');
        genreLink.href = `#`;

        genreLink.addEventListener('click', function(e) {
        e.preventDefault();
        fetchItemsByGenre(genre.id, 'tv');

        // Ajouter la classe "active" au lien actuellement sélectionné
        const activeLink = document.querySelector('.active');
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        genreLink.classList.add('active');
        });

        genreItem.appendChild(genreLink);
        seriesGenresList.appendChild(genreItem);
    });

    genreContainer.appendChild(seriesGenresList);
    } catch (error) {
    console.error(error);
    }
}

// affiche les series par genre
async function fetchItemsByGenre(genreId, mediaType) {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?with_genres=${genreId}&language=fr-FR`, options);
    const itemsData = await response.json();
    
    let itemsSection;
    if (mediaType === 'movie') {
        itemsSection = allMovies;
    } else if (mediaType === 'tv') {
        itemsSection = allSeries;
    }

    // Clear previous items
    itemsSection.innerHTML = '';
    
    const items = itemsData.results;

    items.forEach(async item => {
        let itemElement;
        if (mediaType === 'movie') {
        itemElement = await createMovieElement(item);
        } else if (mediaType === 'tv') {
        itemElement = await createSerieElement(item);
        }
        itemsSection.appendChild(itemElement);
    });
    } catch (error) {
    console.error(error);
    }
}

// Appels de fonctions
initializePagination(fetchSeriesByPage, totalPages, prevPageBtn, nextPageBtn, paginationNumbers);
fetchSeriesGenres(); 
fetchTopRatedSeries();
fetchAllSeries();