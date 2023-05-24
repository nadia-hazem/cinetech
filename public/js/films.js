import { createMovieElement } from './script.js';
import { createGridMovieElement } from './script.js';
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
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&poster_path!=null&region=FR`, options);
        
        const moviesData = await response.json();
        
        allMovies.innerHTML = '';

        moviesData.results.forEach(async function (item) {
            const movieDiv = await createGridMovieElement(item);
            allMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

// affiche les films à venir
async function fetchUpcomingMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&include_adult=false&poster_path!=null&region=FR&page=1', options);
        const upcomingMoviesData = await response.json();

        upcomingMovies.innerHTML = '';

        console.log(upcomingMoviesData.results);
        upcomingMoviesData.results.forEach(async function (item) {
            const movieDiv = await createMovieElement(item);
            upcomingMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

// fetch de tous les films
async function fetchAllMovies() {
    try {
        const totalMovies = 500; // Nombre total de films à récupérer
        const totalPages = Math.ceil(totalMovies / itemsPerPage);

        allMovies.innerHTML = ''; // Efface le contenu actuel

        fetchMoviesByPage(1); // Récupère uniquement la première page initialement

        console.log(`Nombre total de films récupérées : ${totalMovies, totalPages, itemsPerPage}`);

        // Mettre à jour l'état des boutons de pagination
        updatePaginationButtons();
    } catch (error) {
        console.error(error);
    }
}

// affiche les genres
async function fetchMoviesGenres() {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=fr-FR`, options);
    const movieGenresData = await response.json();

    const movieGenres = movieGenresData.genres;

    const movieGenresList = document.createElement('ul');
    movieGenresList.classList.add('d-flex','flex-wrap','list-inline');

    movieGenres.forEach(genre => {
        const genreItem = document.createElement('li');
        const genreLink = document.createElement('a');
        genreLink.textContent = genre.name;
        genreLink.classList.add('list-inline-item');
        genreLink.href = `#`;
        genreLink.addEventListener('click', function(e) {
        e.preventDefault();
        fetchItemsByGenre(genre.id);
        });
        genreItem.appendChild(genreLink);
        movieGenresList.appendChild(genreItem);
    });

    genreContainer.appendChild(movieGenresList);
    } catch (error) {
    console.error(error);
    }
}

// affiche les films par genre
async function fetchItemsByGenre(genreId) {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=fr-FR`, options);
    const itemsData = await response.json();
    
    // Clear previous items
    allMovies.innerHTML = '';
    
    const items = itemsData.results;

    items.forEach(async item => {
        const itemElement = await createMovieElement(item);
        allMovies.appendChild(itemElement);
    });
    } catch (error) {
    console.error(error);
    }
}

// Pagination
prevPageBtn.addEventListener("click", goToPreviousPage);
nextPageBtn.addEventListener("click", goToNextPage);

// Appels de fonctions
fetchMoviesGenres();
fetchUpcomingMovies();
fetchAllMovies();
