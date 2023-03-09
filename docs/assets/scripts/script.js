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

const storageInput = document.querySelector('.storage');
const text = document.querySelector('.search-input'); 
const button = document.querySelector('.add-favorite');

if(storageInput) {
    text.textContent = storedFavorites;
}

const myFavoriteMovies = [{Title: "Lord of the Rings", Director: "Director X"}, {Title: "Titanic", Director: "Director Y"}];
  addMoviesToLocalStorage(myFavoriteMovies);
  addMovie({Title: "Next Movie", Director: "Director H"}); 

button.addEventListener('click', movieAddClick)

function movieAddClick(event) {
    let title = event.target.parentNode.querySelector('h3').textContent;
    let author = event.target.parentNode.querySelector('h4').textContent;
    let newEntry = {
        Title: title,
        Director: director
    }
    addMovie(JSON.stringify(newEntry));
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

removeFromMovieFavorites("Lord of the Rings")

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

if(storageInput) {
    text.textContent = storedFavorites;
}

const myFavoriteBooks = [{Title: "Lord of the Rings", Author: "Author X"}, {Title: "Titanic", Author: "Director Y"}];
  addBooksToLocalStorage(myFavoriteBooks);
  addBook({Title: "Next Book", Author: "Author H"}); 

button.addEventListener('click', bookAddClick)

function bookAddClick(event) {
    let title = event.target.parentNode.querySelector('h3').textContent;
    let author = event.target.parentNode.querySelector('h4').textContent;
    let newEntry = {
        Title: title,
        author: author
    }
    addBook(JSON.stringify(newEntry));
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

removeFromBookFavorites("Lord of the Rings")

// End Local Storage 
