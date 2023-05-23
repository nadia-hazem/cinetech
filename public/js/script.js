const itemsPerPage = 20; // Nombre de films par page

const prevPageBtn = document.querySelector("#prev-page-btn");
const nextPageBtn = document.querySelector("#next-page-btn");

let currentPage = 1;
let totalPages = 0;

export const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTAyMzUyYjNiNmEyNWFhMGFjYzMzMjdmM2EyMWZkZiIsInN1YiI6IjY0NjFmNDY3NmUwZDcyMDBlMzFkNWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQupnjWOqDsMJQt1hWsEREsbFODpbc8TFxE4ULFhhNY";
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey
    }
};

/**************Fonctions de display******************/
// item
export async function createItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);

    const itemLink = document.createElement('a');
    itemLink.href = '#';
    itemLink.appendChild(posterImg);
    itemDiv.appendChild(itemLink);

    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('item-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    itemDiv.appendChild(overlayDiv);

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = item.title;
    itemDiv.appendChild(titleHeading);

    // Ajout du gestionnaire d'événements pour les liens vers la page de détail
    itemLink.addEventListener('click', function (e) {
        e.preventDefault();
        const itemId = item.id;
        window.location.href = `src/View/film-detail.php?id=${itemId}`;
    });

    return itemDiv;
}

// gridItem
export async function createGridItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);

    const itemLink = document.createElement('a');
    itemLink.appendChild(posterImg);
    itemDiv.appendChild(itemLink);

    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('item-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    itemDiv.appendChild(overlayDiv);

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = item.title;
    itemDiv.appendChild(titleHeading);
    
    // ajout du code pour activer les liens vers les détails du film ou de la série
    itemLink.addEventListener('click', function (e) {
        e.preventDefault();
        const itemId = item.id; 

        if (item.media_type === 'tv') {
        window.location.href = `src/View/serie-detail.php?id=${itemId}`;
        } else if (item.media_type === 'movie') {
        window.location.href = `src/View/film-detail.php?id=${itemId}`;
        }
    });

    return itemDiv;
}

// Créer les options du select de genre
export async function populateGenre() {
    const pageTitle = document.title;
    let fetchFunction;

    if (pageTitle.includes("Films")) {
    fetchFunction = fetchMovieGenres;
    } else if (pageTitle.includes("Séries")) {
    fetchFunction = fetchSerieGenres;
    } else {
    console.error('Invalid page title');
    return;
    }
    const genres = await fetchFunction();

    const genreContainer = document.querySelector("#genre-container");

    genres.forEach(function (genre) {
        const genreLink = document.createElement('a');
        genreLink.href = "#"; // Ajoutez ici l'URL appropriée pour chaque genre
        genreLink.textContent = genre.name;
        genreLink.addEventListener('click', function () {

            fetchItemsByGenre(genre.id);
        });

    genreContainer.appendChild(genreLink);

    /* genres.forEach(function (genre) {
    const option = document.createElement('option');
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option); */
    });
}
/* async function fetchMoviesOrSeries(itemsPerPage) {
    try {
        const totalItems = 1000; // Nombre total de films à récupérer
        totalPages = Math.ceil(totalItems / itemsPerPage);

        if (allSeries) {
            allSeries.innerHTML = ''; 
            fetchSeriesByPage(1); // Récupère uniquement la première page initialement
        } else if (allMovies) {
            allMovies.innerHTML = '';
            fetchMoviesByPage(1); // Récupère uniquement la première page initialement
        }     
        // Mettre à jour l'état des boutons de pagination
        updatePaginationButtons();
    } catch (error) {
        console.error(error);
    }
} */

// Afficher par catégorie (films ou séries)
export async function fetchItemsByCat(genreId, itemType) {
    let url = '';
    if (itemType === 'movies') {
        url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&poster_path!=null';
    } else if (itemType === 'series') {
        url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&poster_path!=null';
    } else {
        console.error('Invalid item type');
        return;
    }

    if (genreId) {
        url += '&with_genres=' + genreId;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
    
        if (itemType === 'movies') {
            allMovies.innerHTML = '';
            data.results.forEach(function (movie) {
            const movieDiv = createGridItemElement(movie);
            allMovies.appendChild(movieDiv);
            });
        } else if (itemType === 'series') {
            allSeries.innerHTML = '';
            data.results.forEach(function (series) {
            const seriesDiv = createGridItemElement(series);
            allSeries.appendChild(seriesDiv);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

/*****************Pagination************************/
export function goToPreviousPage(currentPage) {
    if (currentPage > 1) {
        currentPage--;
        fetchMoviesByPage(currentPage);
        allMovies.scrollIntoView({ behavior: "smooth", block: "start" });
        updatePaginationButtons();
    } else if(currentPage === 1) {
        prevPageBtn.disabled = true;
    }
}

export function goToNextPage(currentPage) {
    if (currentPage < totalPages) {
        currentPage++;
        fetchMoviesByPage(currentPage);
        allMovies.scrollIntoView({ behavior: "smooth", block: "start" });
        updatePaginationButtons();
    } else if (currentPage === totalPages) {
        nextPageBtn.disabled = true;
    }
}

export async function updatePaginationButtons() {
    if (currentPage === 1) {
        prevPageBtn.disabled = true;
    } else {
        prevPageBtn.disabled = false;
    }

    if (currentPage === totalPages) {
        nextPageBtn.disabled = true;
    } else {
        nextPageBtn.disabled = false;
        prevPageBtn.disabled = false;
    }
}
