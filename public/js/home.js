import { createItemElement } from './script.js';
import { options, apiKey } from './script.js';

const nowPlayingMovies = document.querySelector("#now-playing-movies");
const popularMovies = document.querySelector("#popular-movies");
const latestSeries = document.querySelector("#latest-series");
const popularSeries = document.querySelector("#popular-series");

const itemsPerPage = 20;

const prevPageBtn = document.querySelector("#prev-page-btn");
const nextPageBtn = document.querySelector("#next-page-btn");

const random = Math.floor(Math.random() * 500) + 1;

/**************Fonctions spécifiques******************/

async function fetchNowPlaying() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&poster_path!=null&page=1', options);
        const nowPlayingMoviesData = await response.json();

        nowPlayingMovies.innerHTML = '';
        nowPlayingMoviesData.results.forEach(async function (movie) {
            const movieDiv = await createItemElement(movie);
            nowPlayingMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchPopularMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&include_adult=false&include_video=false&poster_path!=null&page=1&vote_count.gte=50' + random, options);
        const popularMoviesData = await response.json();

        popularMovies.innerHTML = '';

        popularMoviesData.results.forEach(async function (movie) {
        const movieDiv = await createItemElement(movie);
        popularMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchLatestSeries() 
{
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc&poster_path!=null' + random, options);
        const latestSeriesData = await response.json();

        latestSeries.innerHTML = '';
        latestSeriesData.results.forEach(async function (item) {
        const itemDiv = await createItemElement(item);
        latestSeries.appendChild(itemDiv);
        });

    } catch (error) {
        console.error(error);
    }
}

async function fetchPopularSeries() 
{
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc&poster_path!=null' + random, options);
        const popularSeriesData = await response.json();

        popularSeries.innerHTML = '';
        popularSeriesData.results.forEach(async function (item) {
        const itemDiv = await createItemElement(item);
        popularSeries.appendChild(itemDiv);
        });

    } catch (error) {
        console.error(error);
    }
}

/****************Appel des fonctions*********************/
fetchNowPlaying();
fetchPopularMovies();
fetchLatestSeries();
fetchPopularSeries();