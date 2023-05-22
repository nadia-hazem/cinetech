import { createItemElement } from './script.js';
import { createGridItemElement } from './script.js';
import { goToPreviousPage } from './script.js';
import { goToNextPage } from './script.js';
import { updatePaginationButtons } from './script.js';
import { options, apiKey } from './script.js';

const upcomingMovies = document.querySelector("#upcoming-movies");
const allMovies = document.querySelector("#all-movies");
const genreContainer = document.querySelector("#genre-container");

const itemsPerPage = 20; 

const prevPageBtn = document.querySelector("#prev-page-btn");
const nextPageBtn = document.querySelector("#next-page-btn");

const random = Math.floor(Math.random() * 500) + 1;

// affiche les films par page
async function fetchMoviesByPage(page) 
{
    const allMovies = document.querySelector("#all-movies");
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&poster_path!=null`, options);
        
        const moviesData = await response.json();
        
        allMovies.innerHTML = '';

        moviesData.results.forEach(async function (item) {
            const movieDiv = await createGridItemElement(item);
            allMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchUpcomingMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1&language=fr-FR' + random, options);
        const upcomingMoviesData = await response.json();

        upcomingMovies.innerHTML = '';
        upcomingMoviesData.results.forEach(async function (item) {
            const movieDiv = await createItemElement(item);
            upcomingMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

// liste des genres
async function fetchMovieGenres() 
{
    try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?include_adult=false&language=fr-FR&page=1&sort_by=popularity.desc&poster_path!=null', options);
        const genresData = await response.json();
        return genresData.genres;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function fetchAllMovies() {
    try {
        const totalMovies = 1000; // Nombre total de films à récupérer
        const totalPages = Math.ceil(totalMovies / itemsPerPage);

        allMovies.innerHTML = ''; // Efface le contenu actuel

        fetchMoviesByPage(1); // Récupère uniquement la première page initialement

        console.log(`Nombre total de films récupérés : ${totalMovies, totalPages, itemsPerPage}`);

        // Mettre à jour l'état des boutons de pagination
        updatePaginationButtons();
    } catch (error) {
        console.error(error);
    }
}

/*****************Event Listeners*******************/
genreContainer.addEventListener('change', function () {
    const selectedGenreId = genreSelect.value;

    fetchItemsByGenre(selectedGenreId);
});

/*****************Pagination************************/
prevPageBtn.addEventListener("click", goToPreviousPage);
nextPageBtn.addEventListener("click", goToNextPage);

/**************Appels de fonctions******************/
fetchUpcomingMovies();
fetchAllMovies();
fetchMovieGenres();