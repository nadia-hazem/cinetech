import { options, apiKey } from './script.js';
import { createMovieElement } from './script.js';

const itemDetail = document.querySelector("#movie-detail");
const similarMovies = document.querySelector("#similar-movies");

function createDetailElement(movie) {
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('detail','row','my-5','py-5');

    // container left
    const containerLeft = document.createElement('div');
    containerLeft.classList.add('col','col-md-6', 'justify-content-center', 'align-items-center');
    detailDiv.appendChild(containerLeft);

    // poster
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = movie.title;
    containerLeft.appendChild(posterImg);

    // containerRight
    const containerRight = document.createElement('div');
    containerRight.classList.add('col','col-md-6','justify-content-center','my-5','py-5');
    detailDiv.appendChild(containerRight);

    // title
    const titleHeading = document.createElement('h2');
    titleHeading.classList.add('title','mb-5');
    titleHeading.textContent = movie.title;
    containerRight.appendChild(titleHeading);

    // release date
    const releaseDate = document.createElement('div');
    releaseDate.classList.add('releaseDate');
    const releaseDateHeading = document.createElement('h4');
    releaseDateHeading.textContent = 'Date de sortie';
    const releaseDateParagraph = document.createElement('p');
    releaseDateParagraph.textContent = movie.release_date;
    releaseDate.appendChild(releaseDateHeading);
    releaseDate.appendChild(releaseDateParagraph);
    containerRight.appendChild(releaseDate);

    // overview
    const overview = document.createElement('div');
    overview.classList.add('overview');
    const overviewHeading = document.createElement('h4');
    overviewHeading.textContent = 'Synopsis';
    const overviewParagraph = document.createElement('p');
    overviewParagraph.textContent = movie.overview;
    overview.appendChild(overviewHeading);
    overview.appendChild(overviewParagraph);
    containerRight.appendChild(overview);

    // runtime
    const runtime = document.createElement('div');
    runtime.classList.add('runtime');
    const runtimeHeading = document.createElement('h4');
    runtimeHeading.textContent = 'Durée';
    const runtimeParagraph = document.createElement('p');
    runtimeParagraph.textContent = `${movie.runtime} minutes`;
    runtime.appendChild(runtimeHeading);
    runtime.appendChild(runtimeParagraph);
    containerRight.appendChild(runtime);

    // genres
    const genres = document.createElement('div');
    genres.classList.add('genres');
    const genresHeading = document.createElement('h4');
    genresHeading.textContent = 'Genres';
    const genresList = document.createElement('ul');
    movie.genres.forEach(genre => {
        const genreItem = document.createElement('li');
        genreItem.textContent = genre.name;
        genresList.appendChild(genreItem);
    });
    genres.appendChild(genresHeading);
    genres.appendChild(genresList);
    containerRight.appendChild(genres);

    // production companies
    const productionCompanies = document.createElement('div');
    productionCompanies.classList.add('productionCompanies');
    const productionCompaniesHeading = document.createElement('h4');
    productionCompaniesHeading.textContent = 'Production';
    const productionCompaniesList = document.createElement('ul');
    movie.production_companies.forEach(company => {
        const companyItem = document.createElement('li');
        companyItem.textContent = company.name;
        productionCompaniesList.appendChild(companyItem);
    });
    productionCompanies.appendChild(productionCompaniesHeading);
    productionCompanies.appendChild(productionCompaniesList);
    containerRight.appendChild(productionCompanies);

    return detailDiv;
}

async function fetchDetail(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`, options);
        const movie = await response.json();

        itemDetail.innerHTML = '';

        const detailDiv = createDetailElement(movie);
        itemDetail.appendChild(detailDiv);
    } catch (error) {
        console.error(error);
    }
}

/* async function fetchImages(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?language=fr-FR`, options);
        const imagesData = await response.json();

        const images = document.createElement('div');
        images.classList.add('images', 'd-flex', 'my-5', 'py-5');
        const imagesHeading = document.createElement('h4');
        imagesHeading.textContent = 'Images';
        const imagesList = document.createElement('ul');
        imagesData.backdrops.forEach(image => {
            const imageItem = document.createElement('li');
            const imageUrl = 'https://image.tmdb.org/t/p/w300' + image.file_path;
            const imageImg = document.createElement('img');
            imageImg.src = imageUrl;
            imageImg.alt = movie.title;
            imageItem.appendChild(imageImg);
            imagesList.appendChild(imageItem);
        });
        images.appendChild(imagesHeading);
        images.appendChild(imagesList);

    } catch (error) {
        console.error(error);
    }
}
 */

async function fetchSimilarMovies(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=fr-FR&page=1`, options);
        const similarMoviesData = await response.json();

        similarMovies.innerHTML = '';

        similarMoviesData.results.forEach(async function (item) {
            const itemDiv = await createMovieElement(item);
            similarMovies.appendChild(itemDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

const idParam = window.location.pathname.split('/').pop();
console.log(idParam); 
if (idParam) {

    fetchDetail(idParam);
    fetchSimilarMovies(idParam);
/*     fetchImages(idParam);
 */}
