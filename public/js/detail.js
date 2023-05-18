const movieDetail = document.querySelector("#movie-detail");
const similarMovies = document.querySelector("#similar-movies");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTAyMzUyYjNiNmEyNWFhMGFjYzMzMjdmM2EyMWZkZiIsInN1YiI6IjY0NjFmNDY3NmUwZDcyMDBlMzFkNWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQupnjWOqDsMJQt1hWsEREsbFODpbc8TFxE4ULFhhNY'
    }
};

async function fetchDetail(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR&debug=${movieId}`, options);
        const detailData = await response.json();
        
        movieDetail.innerHTML = '';
        const detailDiv = createDetailElement(detailData);
        movieDetail.appendChild(detailDiv);
    } catch (error) {
        console.error(error);
    }
}

function createDetailElement(movie) {
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('detail', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = movie.title;
    detailDiv.appendChild(titleHeading);

    const posterUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = movie.title;
    detailDiv.appendChild(posterImg);

    const pitch = document.createElement('div');
    pitch.classList.add('pitch');
    const pitchParagraph = document.createElement('p');
    pitchParagraph.textContent = movie.overview;
    pitch.appendChild(pitchParagraph);
    detailDiv.appendChild(pitch);

    const releaseDate = document.createElement('div');
    releaseDate.classList.add('releaseDate');
    const releaseDateParagraph = document.createElement('p');
    releaseDateParagraph.textContent = movie.release_date;
    releaseDate.appendChild(releaseDateParagraph);
    detailDiv.appendChild(releaseDate);

    const voteAverage = document.createElement('div');
    voteAverage.classList.add('voteAverage');
    const voteAverageParagraph = document.createElement('p');
    voteAverageParagraph.textContent = movie.vote_average;
    voteAverage.appendChild(voteAverageParagraph);
    detailDiv.appendChild(voteAverage);

    const voteCount = document.createElement('div');
    voteCount.classList.add('voteCount');
    const voteCountParagraph = document.createElement('p');
    voteCountParagraph.textContent = movie.vote_count;
    voteCount.appendChild(voteCountParagraph);
    detailDiv.appendChild(voteCount);

    const genres = document.createElement('div');
    genres.classList.add('genres');
    const genresParagraph = document.createElement('p');
    genresParagraph.textContent = movie.genres.map(genre => genre.name).join(', ');
    genres.appendChild(genresParagraph);
    detailDiv.appendChild(genres);

    const productionCompanies = document.createElement('div');
    productionCompanies.classList.add('productionCompanies');
    const productionCompaniesParagraph = document.createElement('p');
    productionCompaniesParagraph.textContent = movie.production_companies.map(company => company.name).join(', ');
    productionCompanies.appendChild(productionCompaniesParagraph);
    detailDiv.appendChild(productionCompanies);

    const productionCountries = document.createElement('div');
    productionCountries.classList.add('productionCountries');
    const productionCountriesParagraph = document.createElement('p');
    productionCountriesParagraph.textContent = movie.production_countries.map(country => country.name).join(', ');
    productionCountries.appendChild(productionCountriesParagraph);
    detailDiv.appendChild(productionCountries);

    const spokenLanguages = document.createElement('div');
    spokenLanguages.classList.add('spokenLanguages');
    const spokenLanguagesParagraph = document.createElement('p');
    spokenLanguagesParagraph.textContent = movie.spoken_languages.map(language => language.name).join(', ');
    spokenLanguages.appendChild(spokenLanguagesParagraph);
    detailDiv.appendChild(spokenLanguages);

    const status = document.createElement('div');
    status.classList.add('status');
    const statusParagraph = document.createElement('p');
    statusParagraph.textContent = movie.status;
    status.appendChild(statusParagraph);
    detailDiv.appendChild(status);

    return detailDiv;
}

const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');
if (idParam) {
    fetchDetail(idParam);
}

async function fetchSimilarMovies(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=fr-FR&page=1`, options);
        const similarMoviesData = await response.json();

        similarMovies.innerHTML = '';
        similarMoviesData.results.forEach(function (movie) {
            const movieDiv = createMovieElement(movie);
            similarMovies.appendChild(movieDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

