const itemsPerPage = 20; // Nombre de films par page

const allMovies = document.querySelector("#all-movies");
const allSeries = document.querySelector("#all-series");
const genreContainer = document.querySelector("#genre-container");
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
export async function createMovieElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);

    // Ajout du lien vers la page de détail
    const itemLink = document.createElement('a');
    itemLink.href = "#";

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
            window.location.href = `film-detail/${itemId}`;
        });
    return itemDiv;
}

export async function createSerieElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);

    // Ajout du lien vers la page de détail
    const itemLink = document.createElement('a');
    itemLink.href = "#";

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
            window.location.href = `serie-detail/${itemId}`;
    });

    return itemDiv;
}

// gridItem
export async function createGridMovieElement(item) {
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
    
    // ajout du code pour activer les liens vers les détails du film
    itemLink.href = "/film-detail/"+item.id;

    /* itemLink.addEventListener('click', function (e) { */
        /* e.preventDefault(); */
        /* const itemId = item.id; 

        if (item.media_type === 'tv') {
            window.location.href = `serie-detail/${itemId}`;
        } else if (item.media_type === 'movie') {
            window.location.href = `film-detail/${itemId}`;
        }
    }); */

    return itemDiv;
}

export async function createGridSerieElement(item) {
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
    
    // ajout du code pour activer les liens vers les détails de la série
        itemLink.href = "serie-detail/"+item.id;

    return itemDiv;
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

