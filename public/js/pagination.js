export function pagination(currentPage, totalPages, prevPageBtn, nextPageBtn, fetchMoviesByPage, allMovies) {
    function goToPreviousPage() {
        if (currentPage > 1) {
            currentPage--;
            fetchMoviesByPage(currentPage);
            allMovies.scrollIntoView({ behavior: "smooth", block: "start" });
            updatePaginationButtons();
        }
    }

    function goToNextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            fetchMoviesByPage(currentPage);
            allMovies.scrollIntoView({ behavior: "smooth", block: "start" });
            updatePaginationButtons();
        }
    }

    prevPageBtn.addEventListener("click", goToPreviousPage);
    nextPageBtn.addEventListener("click", goToNextPage);

    function updatePaginationButtons() {
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }
}