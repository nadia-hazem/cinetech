const promise = await fetch(
    "https://api.themoviedb.org/3/discover/movie?page=" + randomPage,
    options
);
const movies = await promise.json();