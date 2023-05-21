// Variables globales
const upcomingMovies = document.querySelector("#upcoming-movies");
const allMovies = document.querySelector("#all-movies");
const genreSelect = document.getElementById('genre-select');
const moviesPerPage = 20; // Nombre de films par page

const prevPageBtn = document.querySelector("#prev-page-btn");
const nextPageBtn = document.querySelector("#next-page-btn");

let currentPage = 1;
let totalPages = 0;



/**************Fonctions génériques******************/

function createMovieElement(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const posterUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = movie.title;
    posterImg.setAttribute('data-id', movie.id);

    const movieLink = document.createElement('a');
    movieLink.href = `detail.php?id=${movie.id}`;
    movieLink.appendChild(posterImg);
    movieDiv.appendChild(movieLink);

    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('movie-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = movie.overview;
    overlayDiv.appendChild(summaryParagraph);
    movieDiv.appendChild(overlayDiv);

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = movie.title;
    movieDiv.appendChild(titleHeading);

    posterImg.addEventListener('click', function() {
        const movieId = this.getAttribute('data-id');
        fetchDetail(movieId);
    });
    return movieDiv;
    
}

function createGridMovieElement(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const posterUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = movie.title;
    posterImg.setAttribute('data-movie-id', movie.id);

    const movieLink = document.createElement('a');
    movieLink.href = '#';
    movieLink.appendChild(posterImg);
    movieDiv.appendChild(movieLink);

    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('movie-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = movie.overview;
    overlayDiv.appendChild(summaryParagraph);
    movieDiv.appendChild(overlayDiv);

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = movie.title;
    movieDiv.appendChild(titleHeading);
    
    // ajout du code pour activer les liens vers les détails du film
    const link = movieLink;
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const movieId = this.firstChild.getAttribute('data-movie-id');
        window.location.href = `detail.php?id=${movieId}`;
    });

    return movieDiv;
}

/**************Fonctions spécifiques******************/

async function fetchUpcomingMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1&language=fr-FR', options);
        const upcomingMoviesData = await response.json();

        upcomingMovies.innerHTML = '';
        upcomingMoviesData.results.forEach(function (movie) {
            const movieDiv = createMovieElement(movie);
            upcomingMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchMoviesByPage(page) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&poster_path!=null`, options);
        const moviesData = await response.json();

        allMovies.innerHTML = '';

        moviesData.results.forEach(function (movie) {
            const movieDiv = createGridMovieElement(movie);
            allMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchAllMovies() {
    try {
        const totalMovies = 1000; // Nombre total de films à récupérer
        totalPages = Math.ceil(totalMovies / moviesPerPage);

        allMovies.innerHTML = ''; // Efface le contenu actuel

        fetchMoviesByPage(1); // Récupère uniquement la première page initialement

        console.log(`Nombre total de films récupérés : ${totalMovies}`);

        // Mettre à jour l'état des boutons de pagination
        updatePaginationButtons();
    } catch (error) {
        console.error(error);
    }
}

/*****************Pagination************************/

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchMoviesByPage(currentPage);
        allMovies.scrollIntoView({ behavior: "smooth", block: "start" });
        updatePaginationButtons();
    }
}

function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        fetchMoviesByPage(currentPage);
        allMovies.scrollIntoView({ behavior: "smooth", block: "start" });
        updatePaginationButtons();
    }
}

/*************Movies by genre******************/

async function fetchGenres() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr-FR', options);
        const genresData = await response.json();
        return genresData.genres;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function populateGenreSelect() {
    const genres = await fetchGenres();

    genres.forEach(function (genre) {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

async function fetchMoviesByGenre(genreId) {
    try {
        let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&poster_path!=null';

        if (genreId) {
            url += '&with_genres=' + genreId;
        }

        const response = await fetch(url, options);
        const moviesData = await response.json();

        allMovies.innerHTML = '';
        moviesData.results.forEach(function (movie) {
            const movieDiv = createGridMovieElement(movie);
            allMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

/*****************Event Listeners*******************/

genreSelect.addEventListener('change', function () {
    const selectedGenreId = genreSelect.value;

    fetchMoviesByGenre(selectedGenreId);
});


prevPageBtn.addEventListener("click", goToPreviousPage);
nextPageBtn.addEventListener("click", goToNextPage);

/**************Appels de fonctions******************/

fetchUpcomingMovies();
fetchAllMovies();
populateGenreSelect();
