import { options } from './script.js';

// variables
const search = document.getElementById("searchInput");
const matchList = document.querySelector("#matchList");
const matchList2 = document.querySelector("#matchList2");

const searchItem = async (searchText) => {
    if (searchText.length === 0) {
        matchList.innerHTML = "";
        matchList2.innerHTML = "";
        return;
    }

    const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchText}&include_adult=false&language=fr-FR&page=1`, options);
    const data = await response.json();
    const items = data.results;

    // check if searchText has a correspondance in db
    let matches = items.filter((item) => {
        if (item.title) {
            const regex = new RegExp(`^${searchText}`, "gi");
            return item.title.match(regex);
        }
    });
        
    let matches2 = items.filter((item) => {
        if (item.title) {
            const regex = new RegExp(`${searchText}`, "gi");
            return item.title.match(regex);
        }
    });

    // if searchText is empty, hide the list
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
        matches2 = [];
        matchList2.innerHTML = "";
    }
    // generate the html for each value
    outputHtml(matches);
    outputHtml2(matches2);
};

// send the html to the DOM
const outputHtml = (matches) => {
    if (matches.length > 0) {
    // limit the number of proposals to 5
        const html = matches
            .slice(0, 5)
            .map(
            (match) => `
                    <li class="card card-body  mb-1">
                        <a class="text-decoration-none link-light" href="/search.php?id=${match.id}">${match.title}</a>
                    </li>
                `
            )
            .join("");
        matchList.innerHTML = html;
    }
};

const outputHtml2 = (matches) => {
    if (matches.length > 0) {
    const html = matches
        .slice(0, 5)
        .map(
        (match) => `
                <li class="card card-body text-white bg-secondary ">
                    <a class="text-decoration-none link-light" href="/search.php?id=${match.id}">${match.title}</a>
                </li>
            `
        )
        .join("");
    matchList2.innerHTML = html;
    }
};

const hideLists = () => {
    matchList.innerHTML = "";
    matchList2.innerHTML = "";
};

/* search.addEventListener('input', () => {
    const searchText = search.value;
    searchItem(searchText);
}); */

// Ecoute l'évènement keyup
search.addEventListener("keyup", () => searchItem(search.value));

// Ecoute l'évènement keydown pour détecter la touche "Entrée"
search.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
    window.location.href = "/search.php?search=" + search.value;
    }
});
// Ecoute l'évènement blur pour cacher la liste des suggestions
search.addEventListener("blur", () => {
    setTimeout(() => {
    hideLists();
    }, 500);
});

// Pagination
const pagination = async (page) => {
    const searchText = search.value;
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchText}&include_adult=false&language=fr-FR&page=${page}`, options);
    const data = await response.json();
    const items = data.results;
    let matches = items.filter((item) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return item.title.match(regex);
    });
    let matches2 = items.filter((item) => {
        const regex = new RegExp(`${searchText}`, "gi");
        return item.title.match(regex);
    });
    outputHtml(matches);
    outputHtml2(matches2);
}
pagination(1);