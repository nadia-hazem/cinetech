import { isFavorite, getCurrentUser, isLogged } from './script.js';

// éléments du DOM
const favButtons = document.querySelectorAll('.fav-button');

/* console.log(userData.id, userData.login, userData.email); */
console.log(currentUser);
console.log(currentUser.id, currentUser.login, currentUser.email);

// eventListener favoris
favButtons.forEach(async (button) => {
    button.addEventListener("click", async function (e) {
        const id = button.dataset.id;
        const type = button.dataset.type;
        const userId = button.dataset.userId;

        try {
            const response = await fetch("/toggleFav", {
                method: "POST",
                /* body: JSON.stringify({ id, type, userId }), */
                body: {
                    id: id,
                    type: type,
                    userId: userId,
                },
                /* body: JSON.stringify({ id, type, userId: userId }),
                headers: {
                    "Content-Type": "application/json",
                }, */
            });
            const data = await response.text();

            // Traiter la réponse
            if (data.success) {
                if (button.classList.contains("active")) {
                    button.classList.remove("active");
                } else {
                    button.classList.add("active");
                }
                console.log(id, type, userId);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    });
});

////////////////////////////////////////////////////////////////////
// élément de film
///////////////////////////////////////////////////////////////////
export async function createMovieElement(item, userId) {
    const divItem = document.createElement("div");
    divItem.classList.add("item");

    // Titre
    const titleHeading = document.createElement("h6");
    titleHeading.textContent = item.title;
    divItem.appendChild(titleHeading);

    // Image
    const posterUrl = "https://image.tmdb.org/t/p/w300" + item.poster_path;
    const posterImg = document.createElement("img");
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute("data-item-id", item.id);

    // Ajout du lien vers la page de détail
    const itemLink = document.createElement("a");
    itemLink.href = "/film-detail/" + item.id;
    itemLink.appendChild(posterImg);
    divItem.appendChild(itemLink);

    // Overlay
    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add("item-overlay");
    const summaryParagraph = document.createElement("p");
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    divItem.appendChild(overlayDiv);

    const currentUser = await getCurrentUser();
    console.log(currentUser);
    const isUserLogged = !!currentUser;
    

    if (isUserLogged) {
        const userId = currentUser.id;
        const login = currentUser.login;
        const email = currentUser.email;

        console.log("Utilisateur connecté - ID :", userId);
        console.log("Nom d'utilisateur :", login);
        console.log("Email :", email);

        // ajout du bouton favoris
        const divFav = document.createElement('div');
        divFav.classList.add('div-fav');
        const favButton = document.createElement('button');
        favButton.classList.add('fav-button', 'btn', 'btn-dark', 'rounded-0');
        favButton.setAttribute('data-id', item.id);
        favButton.setAttribute('data-type', 'movie');
        favButton.setAttribute('data-user-id', userId);
        favButton.textContent = 'Ajouter aux favoris';

        const isFav = await isFavorite(item.id, 'movie', userId);

        // Définir le texte du bouton en fonction de l'état du favori
        if (isFav) {
            favButton.textContent = 'Supprimer des favoris';
        } else {
            favButton.textContent = 'Ajouter aux favoris';
        }
        
        divFav.appendChild(favButton);
        divItem.appendChild(divFav);

    } else {
        console.log("Aucun utilisateur connecté.");
        /* favButtons.style.display = "none";   */      
    }

    const favorite = await isFavorite();
    if (Array.isArray(favorite)) {
        // Boucle pour afficher les favoris
        favorite.forEach(item => {
            
            const userId = item.dataset.userId;

            let favoriteItem;
            if (item.type === 'movie') {
                favoriteItem = createGridMovieElement(favorite);
            } else if (item.type === 'serie') {
                favoriteItem = createGridSerieElement(favorite);
            } else {
                console.error('Type de favori inconnu');
            return;
            }

            // Ajouter l'élément favori à la liste des favoris
            const favoritesContainer = document.querySelector('#favorites');
            favoritesContainer.appendChild(favoriteItem);
        });
    }

    // page de Détail item
    itemLink.addEventListener('click', function (e) {
        e.preventDefault();
        const itemId = item.id;
        window.location.href = `/film-detail/${itemId}`;
    });
    return divItem;
}

////////////////////////////////////////////////////////////////////
// élément de serie
///////////////////////////////////////////////////////////////////

export async function createSerieElement(item, userId) {
    const divItem = document.createElement('div');
    divItem.classList.add('item');
    
    // title
    const titleHeading = document.createElement('h6');
    titleHeading.textContent = item.title;
    divItem.appendChild(titleHeading);

    // img
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);

    // Ajout du lien vers la page de détail
    const itemLink = document.createElement('a');
    itemLink.href = "/serie-detail/" + item.id;
    itemLink.appendChild(posterImg);
    divItem.appendChild(itemLink);

    // overlay
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('item-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    divItem.appendChild(overlayDiv);

    const currentUser = await getCurrentUser();
    const isUserLogged = !!currentUser;

    if (isUserLogged) {
        const userId = currentUser.id;
        const login = currentUser.login;
        const email = currentUser.email;

        console.log("Utilisateur connecté - ID :", userId);
        console.log("Nom d'utilisateur :", login);
        console.log("Email :", email);

        // ajout du bouton favoris
        const divFav = document.createElement('div');
        divFav.classList.add('div-fav');
        const favButton = document.createElement('button');
        favButton.classList.add('fav-button', 'btn', 'btn-dark', 'rounded-0');
        favButton.setAttribute('data-id', item.id);
        favButton.setAttribute('data-type', 'serie');
        favButton.setAttribute('data-user-id', userId);
        favButton.textContent = 'Ajouter aux favoris';

        const isFav = await isFavorite(item.id, 'serie', userId);

        // Définir le texte du bouton en fonction de l'état du favori
        if (isFav) {
            favButton.textContent = 'Supprimer des favoris';
        } else {
            favButton.textContent = 'Ajouter aux favoris';
        }
    
        divFav.appendChild(favButton);
        divItem.appendChild(divFav);

    } else {
        console.log("Aucun utilisateur connecté.");
        /* favButtons.style.display = "none"; */
    }

    const favorite = await isFavorite();
    if (Array.isArray(favorite)) {
        // Boucle pour afficher les favoris
        favorite.forEach(item => {

            const userId = item.dataset.userId;
            
            let favoriteItem;
            if (item.type === 'movie') {
                favoriteItem = createGridMovieElement(favorite);
            } else if (item.type === 'serie') {
                favoriteItem = createGridSerieElement(favorite);
            } else {
                console.error('Type de favori inconnu');
            return;
            }

            const favoritesContainer = document.querySelector('#favorites');
            favoritesContainer.appendChild(favoriteItem);
        });
    }

    // EventListener page de détail item
    itemLink.addEventListener('click', function (e) {
        e.preventDefault();
        const itemId = item.id;
        window.location.href = `/serie-detail/${itemId}`;
    });

    return divItem;
}

////////////////////////////////////////////////////
// grid film
////////////////////////////////////////////////////
export async function createGridMovieElement(item, userId, favButtons) {
    const divItem = document.createElement('div');
    divItem.classList.add('item');
    
        // title
        const titleHeading = document.createElement('h6');
        titleHeading.textContent = item.title;
        divItem.appendChild(titleHeading);

    // img
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);

    // Ajout du lien vers la page de détail
    const itemLink = document.createElement('a');
    itemLink.appendChild(posterImg);
    divItem.appendChild(itemLink);

    // overlay
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('item-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    divItem.appendChild(overlayDiv);

    // activer les liens vers les détails du film
    itemLink.href = "/film-detail/"+item.id;

    /* itemLink.addEventListener('click', function (e) { */
        /* e.preventDefault(); */
        /* const itemId = item.id; 

        if (item.media_type === 'tv') {
            window.location.href = `serie-detail/${itemId}`;
        } else if (item.media_type === 'movie') {
            window.location.href = `film-detail/${itemId}`;
        }
    }); */

    const currentUser = await getCurrentUser();
    const isFav = await isFavorite(item.id, 'movie', userId);    
    const isUserLogged = !!currentUser;

    if (isUserLogged) {
        const userId = currentUser.id;
        // ajout du bouton favoris
        const divFav = document.createElement('div');
        divFav.classList.add('div-fav');
        const favButton = document.createElement('button');
        favButton.classList.add('fav-button', 'btn', 'btn-dark', 'rounded-0');
        favButton.setAttribute('data-id', item.id);
        favButton.setAttribute('data-type', 'movie');
        // Définir le texte du bouton en fonction de l'état du favori
        if (isFav) {
            favButton.textContent = 'Supprimer des favoris';
        } else {
            favButton.textContent = 'Ajouter aux favoris';
        }

        divFav.appendChild(favButton);
        divItem.appendChild(divFav);
        
    } else {
        console.log("Aucun utilisateur connecté.");
        /* favButtons.style.display = "none"; */
    }

    return divItem;
}

/////////////////////////////////////////////////////
// grid serie
////////////////////////////////////////////////////
export async function createGridSerieElement(item, userId, favButtons) {
    const divItem = document.createElement('div');
    divItem.classList.add('item');
    
    // title
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = item.title;
    divItem.appendChild(titleHeading);

    // img
    const posterUrl = 'https://image.tmdb.org/t/p/w300' + item.poster_path;
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = item.title;
    posterImg.setAttribute('data-item-id', item.id);

    // Ajout du lien vers la page de détail
    const itemLink = document.createElement('a');
    itemLink.appendChild(posterImg);
    divItem.appendChild(itemLink);

    // overlay
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('item-overlay');
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = item.overview;
    overlayDiv.appendChild(summaryParagraph);
    divItem.appendChild(overlayDiv);

    // ajout du code pour activer les liens vers les détails de la série
    itemLink.href = "serie-detail/"+item.id;

    const currentUser = await getCurrentUser();
    const isFav = await isFavorite(item.id, 'movie', userId);
    const isUserLogged = !!currentUser;

    if (isUserLogged) {
        const userId = currentUser.id;
        // ajout du bouton favoris
        const divFav = document.createElement('div');
        divFav.classList.add('div-fav');
        const favButton = document.createElement('button');
        favButton.classList.add('fav-button', 'btn', 'btn-dark', 'rounded-0');
        favButton.setAttribute('data-id', item.id);
        favButton.setAttribute('data-type', 'serie');
        
        // Définir le texte du bouton en fonction de l'état du favori
        if (isFav) {
            favButton.textContent = 'Supprimer des favoris';
        } else {
            favButton.textContent = 'Ajouter aux favoris';
        }

        divFav.appendChild(favButton);
        divItem.appendChild(divFav);

    } else {
        console.log("Aucun utilisateur connecté.");
        /* favButtons.style.display = "none"; */
    }

    return divItem;
}