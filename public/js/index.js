const nowPlaying = document.querySelector("#now-playing");
const latestSeries = document.querySelector("#latest-series");
const popularMovies = document.querySelector("#popular-movies");
const popularSeries = document.querySelector("#popular-series");

$random = Math.floor(Math.random() * 1000) + 1;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTAyMzUyYjNiNmEyNWFhMGFjYzMzMjdmM2EyMWZkZiIsInN1YiI6IjY0NjFmNDY3NmUwZDcyMDBlMzFkNWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQupnjWOqDsMJQt1hWsEREsbFODpbc8TFxE4ULFhhNY'
    }
};

/**************Fonction générique******************/

function createMovieElement(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const posterUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = movie.title;
    movieDiv.appendChild(posterImg);

    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('movie-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = movie.overview;
    overlayDiv.appendChild(summaryParagraph);
    movieDiv.appendChild(overlayDiv);

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = movie.title;
    movieDiv.appendChild(titleHeading);

    return movieDiv;
}

/**************Fonctions spécifiques******************/

async function fetchNowPlaying() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&poster_path!=null&page=1',  options);
        const nowPlayingData = await response.json();

        nowPlaying.innerHTML = '';
        nowPlayingData.results.forEach(function (movie) {
            const movieDiv = createMovieElement(movie);
            nowPlaying.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchPopularMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&include_adult=false&include_video=false&poster_path!=null&page=1&vote_count.gte=50', options);
        const popularMoviesData = await response.json();

        popularMovies.innerHTML = '';
        popularMoviesData.results.forEach(function (movie) {
        const movieDiv = createMovieElement(movie);
        popularMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchLatestSeries() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc&poster_path!=null' + $random, options);
        const latestSeriesData = await response.json();

        latestSeries.innerHTML = '';
        latestSeriesData.results.forEach(function (movie) {
        const movieDiv = createMovieElement(movie);
        latestSeries.appendChild(movieDiv);
        });

    } catch (error) {
        console.error(error);
    }
}

async function fetchPopularSeries() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc&poster_path!=null' + $random, options);
        const popularSeriesData = await response.json();

        popularSeries.innerHTML = '';
        popularSeriesData.results.forEach(function (movie) {
        const movieDiv = createMovieElement(movie);
        popularSeries.appendChild(movieDiv);
        });

    } catch (error) {
        console.error(error);
    }
}

fetchNowPlaying();
fetchPopularMovies();
fetchLatestSeries();
fetchPopularSeries();