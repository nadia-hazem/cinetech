import { options, apiKey } from './script.js';
import { createSerieElement } from './template.js';

const itemDetail = document.querySelector("#serie-detail");
const similarSeries = document.querySelector("#similar-series");


function createDetailElement(serie) {
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('detail','row','justify-content-center','flex-wrap','my-5');

    // container left
    //*************************************************** */
    const containerLeft = document.createElement('div');
    containerLeft.classList.add('col', 'col-md-6', 'justify-content-center', 'align-items-center');
    detailDiv.appendChild(containerLeft);

    // poster
    //*************************************************** */
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + serie.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = serie.title;
    containerLeft.appendChild(posterImg);

    // containerRight
    //*************************************************** */
    const containerRight = document.createElement('div');
    containerRight.classList.add('col', 'col-md-6', 'justify-content-center', 'mt-0', 'mb-5', 'py-5');
    detailDiv.appendChild(containerRight);

    // title
    //*************************************************** */
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container', 'd-flex', 'justify-content-center');
    const titleHeading = document.createElement('h2');
    titleHeading.classList.add('title', 'mb-4');
    titleHeading.textContent = serie.name;
    titleContainer.appendChild(titleHeading);
    containerRight.appendChild(titleContainer);
    
    // original title
    //*************************************************** */
    const titleOriginalContainer = document.createElement('div');
    titleOriginalContainer.classList.add('title-original', 'd-flex');
    const titleOriginalHeading = document.createElement('p');
    titleOriginalHeading.classList.add('subject', 'my-1');
    titleOriginalHeading.textContent = 'Titre original : ';
    const titleOriginalParagraph = document.createElement('p');
    titleOriginalParagraph.textContent = serie.original_name;
    titleOriginalContainer.appendChild(titleOriginalHeading);
    titleOriginalContainer.appendChild(titleOriginalParagraph);
    containerRight.appendChild(titleOriginalContainer);

    // overview
    //*************************************************** */
    const overview = document.createElement('div');
    overview.classList.add('overview');
    const overviewHeading = document.createElement('p');
    overviewHeading.classList.add('subject', 'my-1');
    overviewHeading.textContent = 'Synopsis';
    const overviewParagraph = document.createElement('p');
    overviewParagraph.textContent = serie.overview;
    overview.appendChild(overviewHeading);
    overview.appendChild(overviewParagraph);
    containerRight.appendChild(overview);
    
    // separator
    //*************************************************** */
    const separator = document.createElement('hr');
    separator.classList.add('my-5');
    containerRight.appendChild(separator);
    
    // genre
    //*************************************************** */
    const genre = document.createElement('div');
    genre.classList.add('genre', 'd-flex', 'justify-content-start');
    const genreHeading = document.createElement('p');
    genreHeading.classList.add('subject', 'my-1');
    genreHeading.textContent = 'Genre';
    const genreParagraph = document.createElement('p');
    genreParagraph.textContent = serie.genres.map(genre => genre.name).join(', ');
    genre.appendChild(genreHeading);
    genre.appendChild(genreParagraph);
    containerRight.appendChild(genre);

    // runtime 
    //*************************************************** */
    const runtime = document.createElement('div');
    runtime.classList.add('runtime', 'd-flex', 'justify-content-start');
    const runtimeHeading = document.createElement('p');
    runtimeHeading.classList.add('subject', 'my-1');
    runtimeHeading.textContent = 'Durée';
    const runtimeParagraph = document.createElement('p');
    runtimeParagraph.textContent = serie.episode_run_time + ' minutes';
    runtime.appendChild(runtimeHeading);
    runtime.appendChild(runtimeParagraph);
    containerRight.appendChild(runtime);

    // created by
    //*************************************************** */
    const createdBy = document.createElement('div');
    createdBy.classList.add('createdBy', 'd-flex', 'justify-content-start');
    const createdByHeading = document.createElement('p');
    createdByHeading.classList.add('subject', 'my-1');
    createdByHeading.textContent = 'Créé par';
    const createdByParagraph = document.createElement('p');
    createdByParagraph.textContent = serie.created_by.map(creator => creator.name).join(', ');
    createdBy.appendChild(createdByHeading);
    createdBy.appendChild(createdByParagraph);
    containerRight.appendChild(createdBy);

    // original country
    //*************************************************** */
    const originalCountry = document.createElement('div');
    originalCountry.classList.add('originalCountry', 'd-flex', 'justify-content-start');
    const originalCountryHeading = document.createElement('p');
    originalCountryHeading.classList.add('subject', 'my-1');
    originalCountryHeading.textContent = 'Pays d\'origine';
    const originalCountryParagraph = document.createElement('p');
    originalCountryParagraph.textContent = serie.origin_country;
    originalCountry.appendChild(originalCountryHeading);
    originalCountry.appendChild(originalCountryParagraph);
    containerRight.appendChild(originalCountry);

    // first air date
    //*************************************************** */
    const releaseDate = document.createElement('div');
    releaseDate.classList.add('releaseDate', 'd-flex', 'justify-content-start');
    const releaseDateHeading = document.createElement('p');
    releaseDateHeading.classList.add('subject', 'my-1');
    releaseDateHeading.textContent = 'Date de sortie';
    const releaseDateParagraph = document.createElement('p');
    releaseDateParagraph.textContent = serie.first_air_date;
    releaseDate.appendChild(releaseDateHeading);
    releaseDate.appendChild(releaseDateParagraph);
    containerRight.appendChild(releaseDate);

    // last air date
    //*************************************************** */
    const lastAirDate = document.createElement('div');
    lastAirDate.classList.add('lastAirDate', 'd-flex', 'justify-content-start');
    const lastAirDateHeading = document.createElement('p');
    lastAirDateHeading.classList.add('subject', 'my-1');
    lastAirDateHeading.textContent = 'Date de fin';
    const lastAirDateParagraph = document.createElement('p');
    lastAirDateParagraph.textContent = serie.last_air_date;
    lastAirDate.appendChild(lastAirDateHeading);
    lastAirDate.appendChild(lastAirDateParagraph);
    containerRight.appendChild(lastAirDate);

    // networks
    //*************************************************** */
    const networks = document.createElement('div');
    networks.classList.add('networks', 'd-flex', 'justify-content-start');
    const networksHeading = document.createElement('p');
    networksHeading.classList.add('subject', 'my-1');
    networksHeading.textContent = 'Réseaux';
    const networksParagraph = document.createElement('p');
    networksParagraph.textContent = serie.networks.map(network => network.name).join(', ');
    networks.appendChild(networksHeading);
    networks.appendChild(networksParagraph);
    containerRight.appendChild(networks);

    // number of saisons
    //*************************************************** */
    const seasonsContainer = document.createElement('div');
    seasonsContainer.classList.add('seasons', 'd-flex', 'justify-content-start');
    const seasonsHeadingSubject = document.createElement('p');
    seasonsHeadingSubject.classList.add('subject', 'my-1', 'inline-flex');
    seasonsHeadingSubject.textContent = 'Saisons : ';
    const seasonsHeading = document.createElement('p');
    seasonsHeading.classList.add('my-1');
    let numberOfSeasons = serie.number_of_seasons;
    seasonsHeading.textContent = numberOfSeasons;
    seasonsContainer.appendChild(seasonsHeadingSubject);
    seasonsContainer.appendChild(seasonsHeading);
    containerRight.appendChild(seasonsContainer);

    
    // number of episodes
    const episodesContainer = document.createElement('div');
    episodesContainer.classList.add('episodes', 'd-flex', 'justify-content-start');
    const episodesHeadingSubject = document.createElement('p');
    episodesHeadingSubject.classList.add('subject', 'my-1');
    episodesHeadingSubject.textContent = 'Épisodes : ';
    const episodesHeading = document.createElement('p');
    let numberOfEpisodes = serie.number_of_episodes;
    episodesHeading.textContent = numberOfEpisodes;
    episodesContainer.appendChild(episodesHeadingSubject);
    episodesContainer.appendChild(episodesHeading);
    containerRight.appendChild(episodesContainer);

    // div for seasons
    //*************************************************** */
    const containerSeasons = document.createElement('div');
    containerSeasons.classList.add('containerSeasons', 'd-flex', 'flex-wrap');
    const seasons = serie.seasons;
    const SeasonsContainer = document.createElement('div');
    SeasonsContainer.classList.add('seasons', 'col', 'd-flex', 'flex-column');
    const SeasonsHeading = document.createElement('p');
    SeasonsHeading.classList.add('subject', 'mb-5');
    SeasonsHeading.textContent = 'Saisons';
    SeasonsContainer.appendChild(SeasonsHeading);
    containerSeasons.appendChild(SeasonsContainer);
    
    const seasonsList = document.createElement('ul');
    seasonsList.classList.add('seasonsList', 'd-flex', 'flex-wrap');
    
    if (seasons && seasons.length) {
        for (let i = 0; i < seasons.length; i++) {
            const currentSeason = seasons[i];
            const seasonItem = document.createElement('li');
            seasonItem.classList.add('list-unstyled');
        
            const seasonTitle = document.createElement('p');
            seasonTitle.textContent = currentSeason.name;
            seasonItem.appendChild(seasonTitle);
        
            const episodesList = document.createElement('ul');
            episodesList.classList.add('episodesList');
        
            if (currentSeason.episodes && currentSeason.episodes.length) {
                for (let j = 0; j < currentSeason.episodes.length; j++) {
                    const episodeItem = document.createElement('li');
                    const episodeTitle = document.createElement('p');
                    episodeTitle.textContent = currentSeason.episodes[j].episode_number + ' - ' + currentSeason.episodes[j].name + ' - ' + currentSeason.episodes[j].overview;
                    episodeItem.appendChild(episodeTitle);
                    episodesList.appendChild(episodeItem);
                }
            }
        
            seasonItem.appendChild(episodesList);
        
            // Ajouter l'image de la saison
            const seasonImage = document.createElement('img');
            seasonImage.classList.add('seasonImage');
            seasonImage.src = `https://image.tmdb.org/t/p/w500${currentSeason.poster_path}`; 
            seasonImage.alt = currentSeason.name;
            
            seasonItem.appendChild(seasonImage);
            seasonsList.appendChild(seasonItem);
        }
    }
    
    containerSeasons.appendChild(seasonsList);
    detailDiv.appendChild(containerSeasons);
    
    return detailDiv;
}

async function fetchDetail(serieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?append_to_response=credits%252Csaisons&language=fr-FR&page=1`, options);
        const data = await response.json();
        
        itemDetail.innerHTML = '';
        
        const detailDiv = createDetailElement(data);
        itemDetail.appendChild(detailDiv);
    } catch (error) {
        console.error(error);
    }
}

async function fetchSimilarseries(serieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/similar?language=fr-FR&poster_path!=null&page=1`, options);
        const similarSeriesData = await response.json();

        similarSeries.innerHTML = '';

        similarSeriesData.results.forEach(async function (item) {
            const itemDiv = await createSerieElement(item);
            similarSeries.appendChild(itemDiv);
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