import { options, apiKey } from './script.js';
import { createMovieElement } from './template.js';

const itemDetail = document.querySelector("#movie-detail");
const similarMovies = document.querySelector("#similar-movies");

function createDetailElement(movie) {
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('detail', 'd-flex', 'flex-wrap', 'justify-content-center', 'my-5');

    // container left
    //************************************************* */
    const containerLeft = document.createElement('div');
    containerLeft.classList.add('col','col-md-6', 'justify-content-center');
    detailDiv.appendChild(containerLeft);

    // poster
    //************************************************* */
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    const posterImg = document.createElement('img');
    posterImg.classList.add('poster');
    posterImg.src = posterUrl;
    posterImg.alt = movie.title;
    containerLeft.appendChild(posterImg);

    // containerRight
    //************************************************* */
    const containerRight = document.createElement('div');
    containerRight.classList.add('containerRight', 'justify-content-center', 'col','col-md-6','py-2');
    detailDiv.appendChild(containerRight);

    // title
    //************************************************* */
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container', 'd-flex', 'justify-content-center');
    const titleHeading = document.createElement('h2');
    titleHeading.classList.add('title','mb-4');
    titleHeading.textContent = movie.title;
    containerRight.appendChild(titleHeading);
    containerRight.appendChild(titleContainer);

     // original title
    //************************************************* */
    const titleOriginalContainer = document.createElement('div');
    titleOriginalContainer.classList.add('title-original', 'd-flex');
    const titleOriginalHeading = document.createElement('p');
    titleOriginalHeading.classList.add('subject', 'my-1');
    titleOriginalHeading.textContent = 'Titre original : ';
    const titleOriginalParagraph = document.createElement('p');
    titleOriginalParagraph.textContent = movie.original_title;
    titleOriginalContainer.appendChild(titleOriginalHeading);
    titleOriginalContainer.appendChild(titleOriginalParagraph);
    containerRight.appendChild(titleOriginalContainer);

    // original language
    //************************************************* */
    const languageContainer = document.createElement('div');
    languageContainer.classList.add('language', 'd-flex');
    const languageHeading = document.createElement('p');
    languageHeading.classList.add('subject', 'my-1');
    languageHeading.textContent = 'Langue originale : ';
    const languageParagraph = document.createElement('p');
    languageParagraph.textContent = movie.original_language;
    languageContainer.appendChild(languageHeading);
    languageContainer.appendChild(languageParagraph);
    containerRight.appendChild(languageContainer);

    // overview
    //************************************************* */
    const overview = document.createElement('div');
    overview.classList.add('overview');
    const overviewHeading = document.createElement('p');
    overviewHeading.textContent = 'Synopsis';
    overviewHeading.classList.add('subject', 'my-1');
    const overviewParagraph = document.createElement('p');
    overviewParagraph.textContent = movie.overview;
    overview.appendChild(overviewHeading);
    overview.appendChild(overviewParagraph);
    containerRight.appendChild(overview);
    
    // separator
    //************************************************* */
    const separator = document.createElement('hr');
    separator.classList.add('my-5');
    containerRight.appendChild(separator);

    // genres
    //************************************************* */
    const genres = document.createElement('div');
    genres.classList.add('genres', 'd-flex');
    const genresHeading = document.createElement('p');
    genresHeading.classList.add('subject', 'my-1');
    genresHeading.textContent = 'Genres';
    const genresParagraph = document.createElement('p');
    genresParagraph.textContent = movie.genres.map(genres => genres.name).join(', ');
    genres.appendChild(genresHeading);
    genres.appendChild(genresParagraph);
    containerRight.appendChild(genres);

    // runtime
    //************************************************* */
    const runtime = document.createElement('div');
    runtime.classList.add('runtime', 'd-flex');
    const runtimeHeading = document.createElement('p');
    runtimeHeading.classList.add('subject', 'my-1');
    runtimeHeading.textContent = 'Durée';
    const runtimeParagraph = document.createElement('p');
    runtimeParagraph.textContent = `${movie.runtime} minutes`;
    runtime.appendChild(runtimeHeading);
    runtime.appendChild(runtimeParagraph);
    containerRight.appendChild(runtime);

    // release date
    //************************************************* */
    const releaseDate = document.createElement('div');
    releaseDate.classList.add('releaseDate', 'd-flex');
    const releaseDateHeading = document.createElement('p');
    releaseDateHeading.classList.add('subject', 'my-1');
    releaseDateHeading.textContent = 'Date de sortie';
    const releaseDateParagraph = document.createElement('p');
    releaseDateParagraph.textContent = movie.release_date;
    releaseDate.appendChild(releaseDateHeading);
    releaseDate.appendChild(releaseDateParagraph);
    containerRight.appendChild(releaseDate);

    // credits
    //*************************************************** */
    const creditsContainer = document.createElement('div');
    creditsContainer.classList.add('credits-container');
    // créer le div pour les informations de distribution
    const castContainer = document.createElement('div');
    castContainer.classList.add('credits');
    // ajouter les crédits de la distribution
    const castHeading = document.createElement('p');
    castHeading.classList.add('subject', 'my-1');
    castHeading.textContent = 'Distribution';
    castContainer.appendChild(castHeading);

    const castList = document.createElement('ul');
    movie.credits.cast.slice(0, 5).forEach(credit => {
        const castItem = document.createElement('li');
        castItem.classList.add('list-unstyled', 'my-1');
        castItem.textContent = credit.name;
        castList.appendChild(castItem);
    });

    castContainer.appendChild(castList);
    creditsContainer.appendChild(castContainer);

    // créer le div pour les informations de l'équipe
    const crewContainer = document.createElement('div');
    crewContainer.classList.add('credits');
    // ajouter les crédits de l'équipe
    const crewHeading = document.createElement('p');
    crewHeading.classList.add('subject', 'my-1');
    crewHeading.textContent = 'Équipe';
    crewContainer.appendChild(crewHeading);

    const crewList = document.createElement('ul');

    const directors = movie.credits.crew.filter(member => member.job === 'Director');
    const actors = movie.credits.crew.filter(member => member.job === 'Actor');

    directors.slice(0, 2).forEach(director => {
        const crewItem = document.createElement('li');
        crewItem.classList.add('list-unstyled', 'my-1');
        crewItem.textContent = director.name + ' (réalisateur)';
        crewList.appendChild(crewItem);
    });

    actors.slice(0, 3).forEach(actor => {
        const crewItem = document.createElement('li');
        crewItem.classList.add('list-unstyled', 'my-1');
        crewItem.textContent = actor.name;
        crewList.appendChild(crewItem);
    });

    crewContainer.appendChild(crewList);
    creditsContainer.appendChild(crewContainer);

    containerRight.appendChild(creditsContainer);

    // production companies
    //*************************************************** */
    const productionCompanies = document.createElement('div');
    productionCompanies.classList.add('productionCompanies');
    const productionCompaniesHeading = document.createElement('p');
    productionCompaniesHeading.classList.add('subject', 'my-1');
    productionCompaniesHeading.textContent = 'Production';
    const productionCompaniesList = document.createElement('ul');
    movie.production_companies.forEach(company => {
        const companyItem = document.createElement('li');
        companyItem.classList.add('list-unstyled');
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
        const response = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '?language=fr-FR&append_to_response=credits', options);
        const movie = await response.json();

        console.log(movie);
        itemDetail.innerHTML = '';

        const detailDiv = createDetailElement(movie);
        itemDetail.appendChild(detailDiv);
    } catch (error) {
        console.error(error);
    }
}

async function fetchSimilarMovies(movieId) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/similar?language=fr-FR&poster_path!=null&page=1', options);
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
if (idParam) {
    fetchDetail(idParam);
    fetchSimilarMovies(idParam);
}