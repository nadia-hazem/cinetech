export function initializePagination(
    fetchMoviesByPage,
    totalPages,
    prevPageBtn,
    nextPageBtn,
    paginationNumbers
) {
    const itemsPerPage = 20; // Nombre d'éléments par page
    let currentPage = 1; // Page actuelle

    // Fonction pour afficher les chiffres de pagination
    function displayPaginationNumbers() {
        paginationNumbers.innerHTML = '';

        // Calcul des bornes de chiffres
        let start = Math.max(currentPage - 2, 1);
        let end = Math.min(currentPage + 2, totalPages);

        // Affichage des chiffres de pagination
        for (let i = start; i <= end; i++) {
            const pageNumber = document.createElement('button');
            pageNumber.textContent = i;
            pageNumber.classList.add('pagination-btn');
            if (i === currentPage) {
            pageNumber.classList.add('active');
            }
            paginationNumbers.appendChild(pageNumber);
        }
    }

    // Fonction pour aller à la page spécifiée
    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            fetchMoviesByPage(currentPage);
            displayPaginationNumbers();
            updatePaginationButtons();
        }
    }

    // Fonction pour aller à la page précédente
    function goToPreviousPage() {
        // cacher le bouton précédent à la page 1
        if (currentPage === 1) {
            prevPageBtn.style.display = 'none';
        } else {
            prevPageBtn.style.display = 'block';
        }
        goToPage(currentPage - 1);
        // Positionne la vue de la fenêtre en haut de la page
        window.scrollTo(0, 0);
    }

    // Fonction pour aller à la page suivante
    function goToNextPage() {
        // cacher le bouton suivant à la dernière page
        if (currentPage === totalPages) {
            nextPageBtn.style.display = 'none';
        } else {
            nextPageBtn.style.display = 'block';
        }
        goToPage(currentPage + 1);
        // Positionne la vue de la fenêtre en haut de la page
        window.scrollTo(0, 0);
    }


    // Gestionnaire d'événement pour les chiffres de pagination
    paginationNumbers.addEventListener('click', function (event) {
        if (event.target.classList.contains('pagination-btn')) {
            const page = parseInt(event.target.textContent);
            goToPage(page);
        window.scrollTo(0, 0);
        }
    });

    // Gestionnaire d'événement pour le bouton "Précédent"
    prevPageBtn.addEventListener('click', function () {
        goToPreviousPage();
        window.scrollTo(0, 0);
    });

    // Gestionnaire d'événement pour le bouton "Suivant"
    nextPageBtn.addEventListener('click', function () {
        goToNextPage();
        window.scrollTo(0, 0);
    });

    // Fonction pour mettre à jour l'état des boutons de pagination
    function updatePaginationButtons() {
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }
}
