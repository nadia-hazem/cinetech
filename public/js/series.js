// Variables globales
const upcomingSeries = document.querySelector("#upcoming-series");
const series = document.querySelector("#series");

const prevPageBtn = document.querySelector("#prev-page-btn");
const nextPageBtn = document.querySelector("#next-page-btn");

let currentPage = 1;
let totalPages = 0;

$random = Math.floor(Math.random() * 500) + 1;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:  apiKey
    }
};

/**************Fonction générique******************/