import { options, apiKey } from './script.js';
import { createItemElement } from './script.js';
console.log('film-detail.js');

const itemDetail = document.querySelector("#item-detail");

async function fetchDetail(itemId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${itemId}?language=fr-FR&debug=${itemId}`, options);
        const detailData = await response.json();
        console.log(detailData);
        
        itemDetail.innerHTML = '';

        const detailDiv = createDetailElement(itemId);
        itemDetail.appendChild(detailDiv);
    } catch (error) {
        console.error(error);
    }
}

function createDetailElement(item) {
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('detail', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
    // title
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = item.title;
    detailDiv.appendChild(titleHeading);
    // poster
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    detailDiv.appendChild(posterImg);
    // pitch
    const pitch = document.createElement('div');
    pitch.classList.add('pitch');
    const pitchParagraph = document.createElement('p');
    pitchParagraph.textContent = item.overview;
    pitch.appendChild(pitchParagraph);
    detailDiv.appendChild(pitch);
    // release date
    const releaseDate = document.createElement('div');
    releaseDate.classList.add('releaseDate');
    const releaseDateParagraph = document.createElement('p');
    releaseDateParagraph.textContent = item.release_date;
    releaseDate.appendChild(releaseDateParagraph);
    detailDiv.appendChild(releaseDate);
    // vote average
    const voteAverage = document.createElement('div');
    voteAverage.classList.add('voteAverage');
    const voteAverageParagraph = document.createElement('p');
    voteAverageParagraph.textContent = item.vote_average;
    voteAverage.appendChild(voteAverageParagraph);
    detailDiv.appendChild(voteAverage);
    // vote count
    const voteCount = document.createElement('div');
    voteCount.classList.add('voteCount');
    const voteCountParagraph = document.createElement('p');
    voteCountParagraph.textContent = item.vote_count;
    voteCount.appendChild(voteCountParagraph);
    detailDiv.appendChild(voteCount);
    // genres
    const genres = document.createElement('div');
    genres.classList.add('genres');
    const genresParagraph = document.createElement('p');
    genresParagraph.textContent = item.genres.map(genre => genre.name).join(', ');
    genres.appendChild(genresParagraph);
    detailDiv.appendChild(genres);
    // original language
    const spokenLanguages = document.createElement('div');
    spokenLanguages.classList.add('spokenLanguages');
    const spokenLanguagesParagraph = document.createElement('p');
    spokenLanguagesParagraph.textContent = item.spoken_languages.map(language => language.name).join(', ');
    spokenLanguages.appendChild(spokenLanguagesParagraph);
    detailDiv.appendChild(spokenLanguages);
    // status
    const status = document.createElement('div');
    status.classList.add('status');
    const statusParagraph = document.createElement('p');
    statusParagraph.textContent = item.status;
    status.appendChild(statusParagraph);
    detailDiv.appendChild(status);

    return detailDiv;
}

const similarMovies = document.querySelector("#similar-movies");
async function fetchSimilarMovies(itemId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${itemId}/similar?language=fr-FR&page=1`, options);
        const similarMoviesData = await response.json();

        similarMovies.innerHTML = '';
        similarMoviesData.results.forEach(async function (item) {
            const itemDiv = await createItemElement(item);
            similarMovies.appendChild(itemDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');
if (idParam) {
    fetchDetail(idParam);
    fetchSimilarMovies(idParam);
}
