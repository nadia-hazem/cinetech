import { options, apiKey } from './script.js';
import { createSerieElement } from './script.js';

const itemDetail = document.querySelector("#serie-detail");
const similarSeries = document.querySelector("#similar-series");

function createDetailElement(serie) {
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('detail','row','my-5','py-5');

    // container left
    const containerLeft = document.createElement('div');
    containerLeft.classList.add('col','col-md-6','justify-content-center','align-items-center');
    detailDiv.appendChild(containerLeft);

    // poster
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + serie.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = serie.title;
    detailDiv.appendChild(posterImg);

    // containerRight
    const containerRight = document.createElement('div');
    containerRight.classList.add('col','col-md-6','justify-content-center','my-5','py-5');
    detailDiv.appendChild(containerRight);

    // title
    const titleHeading = document.createElement('h2');
    titleHeading.classList.add('title','mb-5');
    titleHeading.textContent = serie.title;
    detailDiv.appendChild(titleHeading);
    
    // release date
    const releaseDate = document.createElement('div');
    releaseDate.classList.add('releaseDate');
    const releaseDateHeading = document.createElement('h4');
    releaseDateHeading.textContent = 'Date de sortie';
    const releaseDateParagraph = document.createElement('p');
    releaseDateParagraph.textContent = serie.release_date;
    releaseDate.appendChild(releaseDateHeading);
    releaseDate.appendChild(releaseDateParagraph);
    detailDiv.appendChild(releaseDate);

    // overview
    const overview = document.createElement('div');
    overview.classList.add('overview');
    const overviewHeading = document.createElement('h4');
    overviewHeading.textContent = 'Synopsis';
    const overviewParagraph = document.createElement('p');
    overviewParagraph.textContent = serie.overview;
    overview.appendChild(overviewHeading);
    overview.appendChild(overviewParagraph);
    containerRight.appendChild(overview);

    // runtime
    const runtime = document.createElement('div');
    runtime.classList.add('runtime');
    const runtimeHeading = document.createElement('h4');
    runtimeHeading.textContent = 'Durée';
    const runtimeParagraph = document.createElement('p');
    runtimeParagraph.textContent = `${serie.runtime} minutes`;
    runtime.appendChild(runtimeHeading);
    runtime.appendChild(runtimeParagraph);
    containerRight.appendChild(runtime);

    // genres
    const genres = document.createElement('div');
    genres.classList.add('genres');
    const genresHeading = document.createElement('h4');
    genresHeading.textContent = 'Genres';
    const genresList = document.createElement('ul');
    serie.genres.forEach(genre => {
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
    const productionCompaniesHeading = document.createElement('p');
    productionCompaniesHeading.textContent = 'Production';
    const productionCompaniesList = document.createElement('ul');
    serie.production_companies.forEach(company => {
        const companyItem = document.createElement('li');
        companyItem.textContent = company.name;
        productionCompaniesList.appendChild(companyItem);
    });
    productionCompanies.appendChild(productionCompaniesHeading);
    productionCompanies.appendChild(productionCompaniesList);
    containerRight.appendChild(productionCompanies);
/*****************/
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
        const serie = await response.json();
        
        itemDetail.innerHTML = '';
        const detailDiv = createDetailElement(serie);
        itemDetail.appendChild(detailDiv);
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

