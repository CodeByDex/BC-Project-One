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

function LoadEmptyListMessage(listEL, message){
    let newDiv = document.createElement("div");
    let newMessage = document.createElement("p");

    newDiv.classList.add("box");
    newDiv.classList.add("container")

    newMessage.textContent = message;

    newDiv.appendChild(newMessage);

    listEL.appendChild(newDiv);
}

function LoadCards(movieEL, movies, type) {

    if (movies.length === 0) {
        LoadEmptyListMessage(movieEL, `You've not added anything to your ${type} list yet!`)
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
        newDiv.classList.add('has-text-centered')




        newImg.setAttribute("alt", mov.Title + " " + type + " Cover Photo");
        newImg.setAttribute("src", mov.ImageURL);

        newImg.addEventListener("click", clickImage)

        newTitle.textContent = mov.Title;
        newTitle.classList.add("title");
        newTitle.classList.add("3")

        newAuthor.textContent = mov.Subtitle;
        newAuthor.classList.add("subtitle");
        newAuthor.classList.add("4")

        newButton.textContent = "Remove From List";
        newButton.classList.add('is-fullwidth')
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
    const listDiv = cardDiv.parentNode;
    const title = cardDiv.querySelector("h3").textContent;

    if (event.target.dataset.Type === "Book") {
        removeFromBookFavorites(title);
    } else {
        removeFromMovieFavorites(title);
    }

    listDiv.removeChild(cardDiv);

    if (listDiv.childNodes.length === 0)
    {
        LoadEmptyListMessage(listDiv, "You've finished all your items! Go to Search to add more!")
    }
};

function clickImage(event) {
    let src = event.target.getAttribute("src");
    let alt = event.target.getAttribute("alt");
    openModalWithImage(src, alt);
}