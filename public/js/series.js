import { createSerieElement } from './script.js';
import { createGridSerieElement } from './script.js';
import { goToPreviousPage } from './script.js';
import { goToNextPage } from './script.js';
import { updatePaginationButtons } from './script.js';
import { options, apiKey } from './script.js';

const topRatedSeries = document.querySelector("#top-rated-series");
const allSeries = document.querySelector("#all-series");
const genreContainer = document.querySelector("#genre-container");

const itemsPerPage = 20;

const prevPageBtn = document.querySelector("#prev-page-btn");
const nextPageBtn = document.querySelector("#next-page-btn");

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
        updatePaginationButtons();
    } catch (error) {
        console.error(error);
    }
}

// affiche les genres
async function fetchSeriesGenres() {
    try {
    const seriesGenresResponse = await fetch(`https://api.themoviedb.org/3/genre/tv/list?language=fr-FR`, options);
    const seriesGenresData = await seriesGenresResponse.json();

    const seriesGenres = seriesGenresData.genres;

    const seriesGenresList = document.createElement('ul');
    seriesGenresList.classList.add('d-flex','flex-wrap','list-inline');

    seriesGenres.forEach(genre => {
        const genreItem = document.createElement('li');
        const genreLink = document.createElement('a');
        genreLink.textContent = genre.name;
        genreLink.classList.add('list-inline-item');
        genreLink.href = `#`;
        genreLink.addEventListener('click', function(e) {
        e.preventDefault();
        fetchItemsByGenre(genre.id, 'tv');
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

// Pagination
prevPageBtn.addEventListener("click", goToPreviousPage);
nextPageBtn.addEventListener("click", goToNextPage);

// Appels de fonctions
fetchSeriesGenres(); 
fetchTopRatedSeries();
fetchAllSeries();