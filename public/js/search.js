const search = document.getElementById("searchInput");
const matchList = document.querySelector("#matchList");
const matchList2 = document.querySelector("#matchList2");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: apiKey
    }
};

const searchItem = async (searchText) => {
    if (searchText.length === 0) {
        matchList.innerHTML = "";
        matchList2.innerHTML = "";
        return;
    }
    
    const search = document.getElementById('searchInput');

    search.addEventListener('input', () => {
        const searchText = search.value;
        searchItem(searchText);
    });

    const url = fetch(`https://api.themoviedb.org/3/search/multi?query=${searchText}&include_adult=false&language=fr-FR&page=1`, options);
    const response = await fetch(url, options);
    const data = await response.json();
    const items = data.results;

    // check if searchText has a correspondance in db
    let matches = product.filter((title) => {
        // first proposal ( ^ is for first caracter of the string)
        const regex = new RegExp(`^${searchText}`, "gi");
        // first argument is the regex, second is the flag (g = global, i = case insensitive)
        return title.title.match(regex);
    });
    // second proposal
    let matches2 = product.filter((title) => {
        const regex = new RegExp(`${searchText}`, "gi");
        return title.title.match(regex);
    });
    // if searchText is empty, hide the list
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
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
                    <li class="card card-body bg-dark mb-1">
                        <a class="text-decoration-none link-light" href="search.php?id=${match.id}">${match.title}</a>
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
                <li class="card card-body text-white bg-secondary mb-1">
                    <a class="text-decoration-none link-light" href="product.php?id=${match.id}">${match.title}</a>
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

// Ecoute l'évènement keyup
search.addEventListener("keyup", () => searchItem(search.value));

// Ecoute l'évènement keydown pour détecter la touche "Entrée"
search.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
    window.location.href = "search.php?search=" + search.value;
    }
});

search.addEventListener("blur", () => {
    setTimeout(() => {
    hideLists();
    }, 500);
});
