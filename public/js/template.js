import { isFavorite, getCurrentUser } from './script.js';


//////////////////////////////////////////////////
// élément de film
//////////////////////////////////////////////////
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

        console.log('data-id', item.id);
        console.log('data-type', 'movie');
        console.log('data-user-id', userId);

        const isFav = await isFavorite(item.id, 'movie', userId);

        // Définir le texte du bouton en fonction de l'état du favori
        if (isFav) {
            favButton.textContent = 'Supprimer des favoris';
        } else {
            favButton.textContent = 'Ajouter aux favoris';
        }

        // EventListener bouton favori
        favButton.addEventListener("click", async function (e) {
            const id = favButton.dataset.id;
            const type = favButton.dataset.type;
            const userId = favButton.dataset.userId;

            try {
                const response = await fetch("/toggleFav", {
                    method: "POST",
                    body: JSON.stringify({ id, type, userId }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            
                if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        // Réponse JSON
                        const data = await response.json();
                        // Traiter la réponse JSON
                        if (data.isFavorite) {
                            favButton.textContent = 'Supprimer des favoris';
                        } else {
                            favButton.textContent = 'Ajouter aux favoris';
                        }
                    } else {
                        // Réponse non JSON
                        const text = await response.text();
                        // Traiter la réponse non JSON
                        console.log('Réponse non JSON:', text);
                    }
                } else {
                    // Réponse avec erreur HTTP
                    console.error('Erreur HTTP:', response.status);
                }
            } catch (error) {
                // Erreur de la requête
                console.error('Erreur de la requête:', error);
            }
        });
        
        divFav.appendChild(favButton);
        divItem.appendChild(divFav);

    } else {
        console.log("Aucun utilisateur connecté.");
        /* favButtons.style.display = "none";   */      
    }
    if (Array.isArray(item)) {
        // Boucle pour afficher les favoris
        item.forEach(item => {
            
            const userId = item.dataset.userId;
    
            let favoriteItem;
            if (item.type === 'movie') {
                favoriteItem = createGridMovieElement(item);
            } else if (item.type === 'serie') {
                favoriteItem = createGridSerieElement(item);
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

///////////////////////////////////////////////////
// élément de serie
///////////////////////////////////////////////////

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


        const isFav = await isFavorite(item.id, 'serie', userId);

        // Définir le texte du bouton en fonction de l'état du favori
        if (isFav) {
            favButton.textContent = 'Supprimer des favoris';
        } else {
            favButton.textContent = 'Ajouter aux favoris';
        }

        // EventListener bouton favori
        favButton.addEventListener("click", async function (e) {
            const id = favButton.dataset.id;
            const type = favButton.dataset.type;
            const userId = favButton.dataset.userId;

            try {
                const response = await fetch("/toggleFav", {
                    method: "POST",
                    body: JSON.stringify({ id, type, userId }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                // Traiter la réponse
                if (response.ok) {
                    if (data.isFavorite) {
                        favButton.textContent = 'Supprimer des favoris';
                    } else {
                        favButton.textContent = 'Ajouter aux favoris';
                    }
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error(error);
            }
        });

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

/////////////////////////////////////////////////////
// eventListerner favoris
////////////////////////////////////////////////////
/* const favButtons = document.querySelectorAll('.fav-button');

favButtons.forEach(async (button) => {
    button.addEventListener("click", async function (e) {
        const id = button.dataset.id;
        const type = button.dataset.type;
        const userId = button.dataset.userId;


        try {
            const response = await fetch("/toggleFav", {
                method: "POST",
                body: JSON.stringify({ id, type, userId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            // Traiter la réponse
            if (response.ok) {
                if (data.isFavorite) {
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                }
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    });
}); */