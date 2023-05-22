import { createItemElement } from './script.js';
import { createGridItemElement } from './script.js';
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
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&poster_path!=null`, options);
        
        const seriesData = await response.json();

        allSeries.innerHTML = '';

        seriesData.results.forEach(async function (item) {
            const serieDiv = await createGridItemElement(item);
            allSeries.appendChild(serieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchTopRatedSeries() 
{
    try {
        const response = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=fr-FR&include_adult=false&include_video=false&poster_path!=null&page=1&vote_count.gte=50' + random, options);
        const topRatedSeriesData = await response.json();

        topRatedSeries.innerHTML = '';
        
        topRatedSeriesData.results.forEach(async function (item) {
            const serieDiv = await createItemElement(item);
            topRatedSeries.appendChild(serieDiv);
            });
            console.log(topRatedSeriesData);
    } catch (error) {
        console.error(error);
    }
}

// liste des genres
async function fetchSerieGenres() 
{
    try {
        const response = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=fr-FR', options);
        const genresData = await response.json();
        return genresData.genres;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function fetchAllSeries() {
    try {
        const totalSeries = 1000; // Nombre total de series à récupérer
        const totalPages = Math.ceil(totalSeries / itemsPerPage);

        allSeries.innerHTML = ''; // Efface le contenu actuel

        fetchSeriesByPage(1); // Récupère uniquement la première page initialement

        console.log(`Nombre total de series récupérés : ${totalSeries, totalPages, itemsPerPage}`);

        // Mettre à jour l'état des boutons de pagination
        updatePaginationButtons();
    } catch (error) {
        console.error(error);
    }
}

/*****************Event Listeners*******************/
genreContainer.addEventListener('change', function () {
    const selectedGenreId = genreSelect.value;

    fetchSerieGenres(selectedGenreId);
});

/*****************Pagination************************/
prevPageBtn.addEventListener("click", goToPreviousPage);
nextPageBtn.addEventListener("click", goToNextPage);

/**************Appels de fonctions******************/
/* fetchTopRatedSeries();
fetchAllSeries();
fetchSerieGenres(); */
document.addEventListener('DOMContentLoaded', function() {
    fetchTopRatedSeries();
    fetchAllSeries();
    fetchSerieGenres(); 
});