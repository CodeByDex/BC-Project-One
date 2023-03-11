window.addEventListener("load", () => {
    LoadMovies();
    LoadBooks();
});

async function LoadMovies() {
    const movies = getMoviesFromLocalStorage();
    const movieEL = document.querySelector("#My-Movies");

    LoadCards(movieEL, movies, "Movie");
};

async function LoadBooks() {
    const books = getBooksFromLocalStorage();
    const booksEL = document.querySelector("#My-Books");

    LoadCards(booksEL, books, "Book");
};

function LoadCards(movieEL, movies, type) {

    if (movies.length === 0) {
        return;
    }

    movieEL.innerHTML = "";

    movies.forEach(mov => {
        let newDiv = document.createElement("div");
        let newImg = document.createElement("img");
        let newTitle = document.createElement("h3");
        let newAuthor = document.createElement("h4");
        let newButton = document.createElement("button");

        newDiv.classList.add("box");
        newDiv.classList.add("container")

        newImg.setAttribute("alt", "Movie Image");
        newImg.setAttribute("src", mov.ImageURL);

        newTitle.textContent = mov.Title;
        newTitle.classList.add("title");
        newTitle.classList.add("3")

        newAuthor.textContent = mov.Subtitle;
        newAuthor.classList.add("subtitle");
        newAuthor.classList.add("4")

        newButton.textContent = "Remove From List";
        newButton.classList.add("button");
        newButton.classList.add("is-dark");
        newButton.dataset.Type = type;
        newButton.addEventListener("click", RemoveItem);

        movieEL.appendChild(newDiv);
        newDiv.appendChild(newImg);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newAuthor);
        newDiv.appendChild(newButton);
    });
};

/***************************************
 * Event Handler
 ****************************************/
function RemoveItem(event) {
    const cardDiv = event.target.parentNode;
    const title = cardDiv.querySelector("h3").textContent;

    if (event.target.dataset.Type === "Book") {
        removeFromBookFavorites(title);
    } else {
        removeFromMovieFavorites(title);
    }

    cardDiv.parentNode.removeChild(cardDiv);
};