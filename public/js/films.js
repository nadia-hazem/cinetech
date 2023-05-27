import { options, apiKey } from './script.js';
import { createMovieElement } from './script.js';
import { createGridMovieElement } from './script.js';
import { initializePagination } from './pagination.js';

// pagination
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');
const paginationNumbers = document.getElementById('pagination-numbers');

// variables pour les films
const upcomingMovies = document.querySelector("#upcoming-movies");
const allMovies = document.querySelector("#all-movies");
const genreContainer = document.querySelector("#genre-container");

const totalPages = 500;
const itemsPerPage = 20;
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

        // mettre à jour les informations de pagination
        /* updatePaginationButtons(); */
    } catch (error) {
        console.log(error);
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

    // Ajouter un lien pour afficher tous les genres
    const allGenresLink = document.createElement('a');
    allGenresLink.textContent = "Tous";
    allGenresLink.classList.add('list-inline-item');
    allGenresLink.href = `#`;
    allGenresLink.addEventListener('click', function(e) {
        e.preventDefault();
        fetchAllMovies(); 
    });
    const allGenresItem = document.createElement('li');
    allGenresItem.appendChild(allGenresLink);
    movieGenresList.appendChild(allGenresItem);

    movieGenres.forEach(genre => {
        const genreItem = document.createElement('li');
        const genreLink = document.createElement('a');
        genreLink.textContent = genre.name;
        genreLink.classList.add('list-inline-item');
        genreLink.href = `#`;

        genreLink.addEventListener('click', function(e) {
        e.preventDefault();
        fetchItemsByGenre(genre.id, 'movie');

        // Ajouter la classe "active" au lien actuellement sélectionné
        const activeLink = document.querySelector('.active');
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        genreLink.classList.add('active');
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

// Appels de fonctions
initializePagination(fetchMoviesByPage, totalPages, prevPageBtn, nextPageBtn, paginationNumbers);
fetchMoviesGenres();
fetchUpcomingMovies();
fetchAllMovies();
