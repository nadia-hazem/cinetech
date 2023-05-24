import { createSerieElement } from './script.js';
import { options, apiKey } from './script.js';

const serieDetail = document.querySelector("#serie-detail");
const similarSeries = document.querySelector("#similar-series");

/* const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:  apiKey
    }
}; */


function createDetailElement(serie) {
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('detail', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = serie.title;
    detailDiv.appendChild(titleHeading);

    const posterUrl = 'https://image.tmdb.org/t/p/w300' + serie.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = serie.title;
    detailDiv.appendChild(posterImg);

    const pitch = document.createElement('div');
    pitch.classList.add('pitch');
    const pitchParagraph = document.createElement('p');
    pitchParagraph.textContent = serie.overview;
    pitch.appendChild(pitchParagraph);
    detailDiv.appendChild(pitch);

    const releaseDate = document.createElement('div');
    releaseDate.classList.add('releaseDate');
    const releaseDateParagraph = document.createElement('p');
    releaseDateParagraph.textContent = serie.release_date;
    releaseDate.appendChild(releaseDateParagraph);
    detailDiv.appendChild(releaseDate);

    const voteAverage = document.createElement('div');
    voteAverage.classList.add('voteAverage');
    const voteAverageParagraph = document.createElement('p');
    voteAverageParagraph.textContent = serie.vote_average;
    voteAverage.appendChild(voteAverageParagraph);
    detailDiv.appendChild(voteAverage);

    const voteCount = document.createElement('div');
    voteCount.classList.add('voteCount');
    const voteCountParagraph = document.createElement('p');
    voteCountParagraph.textContent = serie.vote_count;
    voteCount.appendChild(voteCountParagraph);
    detailDiv.appendChild(voteCount);

    const genres = document.createElement('div');
    genres.classList.add('genres');
    const genresParagraph = document.createElement('p');
    genresParagraph.textContent = serie.genres.map(genre => genre.name).join(', ');
    genres.appendChild(genresParagraph);
    detailDiv.appendChild(genres);

    const productionCompanies = document.createElement('div');
    productionCompanies.classList.add('productionCompanies');
    const productionCompaniesParagraph = document.createElement('p');
    productionCompaniesParagraph.textContent = serie.production_companies.map(company => company.name).join(', ');
    productionCompanies.appendChild(productionCompaniesParagraph);
    detailDiv.appendChild(productionCompanies);

    const productionCountries = document.createElement('div');
    productionCountries.classList.add('productionCountries');
    const productionCountriesParagraph = document.createElement('p');
    productionCountriesParagraph.textContent = serie.production_countries.map(country => country.name).join(', ');
    productionCountries.appendChild(productionCountriesParagraph);
    detailDiv.appendChild(productionCountries);

    const spokenLanguages = document.createElement('div');
    spokenLanguages.classList.add('spokenLanguages');
    const spokenLanguagesParagraph = document.createElement('p');
    spokenLanguagesParagraph.textContent = serie.spoken_languages.map(language => language.name).join(', ');
    spokenLanguages.appendChild(spokenLanguagesParagraph);
    detailDiv.appendChild(spokenLanguages);

    const status = document.createElement('div');
    status.classList.add('status');
    const statusParagraph = document.createElement('p');
    statusParagraph.textContent = serie.status;
    status.appendChild(statusParagraph);
    detailDiv.appendChild(status);

    return detailDiv;
}

async function fetchDetail(serieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?language=fr-FR`, options);
        const detailData = await response.json();
        
        serieDetail.innerHTML = '';
        const detailDiv = createDetailElement(detailData);
        serieDetail.appendChild(detailDiv);
    } catch (error) {
        console.error(error);
    }
}

async function fetchSimilarseries(serieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/similar?language=fr-FR&page=1`, options);
        const similarSeriesData = await response.json();

        similarSeries.innerHTML = '';
        similarSeriesData.results.forEach(async function (serie) {
            const serieDiv = await createSerieElement(serie);
            similarSeries.appendChild(serieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}
const idParam = window.location.pathname.split('/').pop();
if (idParam) {
    fetchDetail(idParam);
    fetchSimilarseries(idParam);
}

