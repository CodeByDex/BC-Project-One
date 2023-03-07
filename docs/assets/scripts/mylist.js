window.addEventListener("load", () => {
    LoadMovies();
    LoadBooks();
});

async function LoadMovies(){
    const movies = GetMovieWatchListFromLocalStorage();
    const movieEL = document.querySelector("#My-Movies");

    LoadCards(movieEL, movies);
};

function LoadCards(movieEL, movies) {
    movieEL.innerHTML = "";

    movies.forEach(mov => {
        let newDiv = document.createElement("div");
        let newImg = document.createElement("img");
        let newTitle = document.createElement("h3");
        let newAuthor = document.createElement("h4");
        let newButton = document.createElement("button");

        newImg.setAttribute("alt", "Movie Image");
        newTitle.textContent = mov.Title;
        newAuthor.textContent = "Author Name";
        newButton.textContent = "Remove From List";
        newButton.addEventListener("click", RemoveItem);

        movieEL.appendChild(newDiv);
        newDiv.appendChild(newImg);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newAuthor);
        newDiv.appendChild(newButton);
    });
}

async function LoadBooks(){
    const books = GetBookReadListFRomLocalStorage();
    const booksEL = document.querySelector("#My-Books");

    LoadCards(booksEL, books);
};

function RemoveItem(event){
    const cardDiv = event.target.parentNode;

    cardDiv.parentNode.removeChild(cardDiv);
}

//Prototype Functions
function GetMovieWatchListFromLocalStorage(){
    return [{Title: "Movie 1"}, {Title: "Movie 2"}, {Title: "Movie 3"}];
};

function GetBookReadListFRomLocalStorage(){
    return [{Title: "book 1"}, {Title: "book 2"}, {Title: "book 3"}];
}