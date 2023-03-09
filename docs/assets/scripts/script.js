// Begin Movie Local Storage
function addMoviesToLocalStorage(listMovies) {
    localStorage.setItem('listMovies', JSON.stringify(listMovies));
}    

function getMoviesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('listMovies'));
}    

function addMovie (movie) {
    removeFromMovieFavorites(movie.Title);
    let currentList = getMoviesFromLocalStorage();
    currentList.push(movie);
    addMoviesToLocalStorage(currentList);
}

function removeFromMovieFavorites(title) {
    let currentList = getMoviesFromLocalStorage();
    let index = currentList.findIndex(element => element.Title === title);
    console.log(index)
    if (index != -1 ) {
        currentList.splice(index, 1)
    }
    addMoviesToLocalStorage(currentList);
}

// Begin Books Local Storage
function addBooksToLocalStorage(listBooks) {
    localStorage.setItem('listBooks', JSON.stringify(listBooks));
}    

function getBooksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('listBooks'));
}    

function addBook (book) {
    removeFromBookFavorites(book.Title);
    let currentBookList = getBooksFromLocalStorage();
    currentBookList.push(book);
    addBooksToLocalStorage(currentBookList);
}

function removeFromBookFavorites(title) {
    let currentList = getBookFromLocalStorage();
    let index = currentList.findIndex(element => element.Title === title);
    console.log(index)
    if (index != -1 ) {
        currentList.splice(index, 1)
    }
    addBooksToLocalStorage(currentList);
}

// End Local Storage 
