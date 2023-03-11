/*********************************************
 * Move Storage Functions
 *********************************************/
function addMoviesToLocalStorage(listMovies) {
    localStorage.setItem('listMovies', JSON.stringify(listMovies));
}

function getMoviesFromLocalStorage() {
    let movies = JSON.parse(localStorage.getItem('listMovies'));

    if (movies === null) {
        movies = [];
    }

    return movies;
}

function addMovie(movie) {
    removeFromMovieFavorites(movie.Title);
    let currentList = getMoviesFromLocalStorage();
    currentList.push(movie);
    addMoviesToLocalStorage(currentList);
}

function removeFromMovieFavorites(title) {
    let currentList = getMoviesFromLocalStorage();
    let index = currentList.findIndex(element => element.Title === title);

    if (index != -1) {
        currentList.splice(index, 1)
    }
    addMoviesToLocalStorage(currentList);
}

/**********************************************
 * Book Storage Functions
 **********************************************/
function addBooksToLocalStorage(listBooks) {
    localStorage.setItem('listBooks', JSON.stringify(listBooks));
}

function getBooksFromLocalStorage() {
    let books = JSON.parse(localStorage.getItem('listBooks'));

    if (books === null) {
        books = [];
    };

    return books;
}

function addBook(book) {
    removeFromBookFavorites(book.Title);
    let currentBookList = getBooksFromLocalStorage();
    currentBookList.push(book);
    addBooksToLocalStorage(currentBookList);
}

function removeFromBookFavorites(title) {
    let currentList = getBooksFromLocalStorage();
    let index = currentList.findIndex(element => element.Title === title);

    if (index != -1) {
        currentList.splice(index, 1)
    }
    addBooksToLocalStorage(currentList);
}