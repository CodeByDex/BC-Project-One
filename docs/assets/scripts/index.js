const resultsEL = document.querySelector("#results");
const booksCheck = document.querySelector("#Books");
const moviesCheck = document.querySelector("#Movies");
const searchInputEL = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const backgroundImage = document.querySelector("#mainContent");

window.addEventListener("load", () => {
    resultsEL.innerHTML = "";
    searchButton.addEventListener("click", clickedSearch);
    booksCheck.addEventListener("click", clearSearchResults);
    moviesCheck.addEventListener("click", clearSearchResults);
    searchInputEL.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            clickedSearch();
            searchButton.style.backgroundColor = 'lightblue'
        }
    })
    searchInputEL.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            searchButton.style.backgroundColor = 'white'
        }
    })

    booksCheck.addEventListener("click", () => {
        backgroundImage.style.backgroundImage = "url('./assets/images/bookcase.jpg')";
    })

    moviesCheck.addEventListener("click", () => {
        backgroundImage.style.backgroundImage = "url('./assets/images/movieTheater.jpg')";
    }
    )

    booksCheck.checked = true;
});

/**********************************************
 * Event Handlers
 **********************************************/
function clickImage(event) {
    let src = event.target.getAttribute("src");
    let alt = event.target.getAttribute("alt");
    openModalWithImage(src, alt);
}


function clickedSearch() {
    let searchValue = searchInputEL.value;

    if (searchValue.length < 1) {
        let pEL = document.createElement("p");
        pEL.textContent = "Please Enter A Value";

        openModal(pEL);

        return;
    }

    searchButton.setAttribute("disabled", "");

    if (SearchType() === "Movie") {
        findMoviesByTitle(searchValue, DisplayResults);
    } else if (SearchType() === "Book") {
        FindBooksByTitle(searchValue, DisplayResults);
    }
};

function clickAddButton(event) {
    let clickedCard = event.target.parentNode.parentNode.parentNode;
    let title = clickedCard.querySelector("h3").textContent;
    let subtitle = clickedCard.querySelector("h4").textContent;
    let imageURL = clickedCard.querySelector("img").getAttribute("src");

    if (event.target.dataset.Type === "Book") {
        if (event.target.dataset.Mode === "Add") {
            addBook({ Title: title, Subtitle: subtitle, ImageURL: imageURL })
        } else {
            removeFromBookFavorites(title);
        }
    } else {
        if (event.target.dataset.Mode === "Add") {
            addMovie({ Title: title, Subtitle: subtitle, ImageURL: imageURL })
        } else {
            removeFromMovieFavorites(title);
        }
    }

    if (event.target.dataset.Mode === "Add") {
        event.target.dataset.Mode = "Remove";
        event.target.textContent = "Remove from List";
    } else {
        event.target.dataset.Mode = "Add";
        event.target.textContent = "Add to my List";
    }
};


/**********************************************
 * DOM Functions
 *********************************************/

function SearchType() {
    if (booksCheck.checked) {
        return "Book";
    } else {
        return "Movie";
    }
};

function DisplayResults(results) {

    if (results.length != 0) {
        clearSearchResults();

        results.forEach(result => {
            if (result.Type != "Error") {
                CreateResultCard(result);
            } else {
                let pEL = document.createElement("p");
                pEL.textContent = result.ErrorMessage;

                openModal(pEL);
            }
        });
    } else {
        let pEL = document.createElement("p");
        pEL.textContent = "No Results Found";

        openModal(pEL);
    }

    searchInputEL.value = "";
    searchButton.removeAttribute("disabled");

};

function clearSearchResults() {
    resultsEL.innerHTML = "";
}

async function CreateResultCard(result) {
    let newDivTile = document.createElement("div");
    newDivTile.classList.add("tile")
    newDivTile.classList.add("is-4")
    newDivTile.classList.add("p-2")

    let newCard = document.createElement("div");
    newCard.classList.add("card")
    newCard.classList.add("p-4")

    let newCardImage = document.createElement("div");
    newCardImage.classList.add("card-image")
    newCardImage.classList.add("has-text-centered")

    let newFigure = document.createElement("figure");
    newFigure.classList.add("img")
    newFigure.classList.add("is-3by4")

    let newImage = document.createElement("img");
    newImage.setAttribute("src", result.ImageURL)
    newImage.setAttribute("alt", result.Title + " " + result.Type + " Cover Photo");
    newImage.addEventListener("click", clickImage)

    let newDivContent = document.createElement("div");
    newDivContent.classList.add("card-content")
    newDivContent.classList.add("p-3")
    newDivContent.classList.add('has-text-centered')

    let newContentTitle = document.createElement("h3")
    newContentTitle.classList.add("title")
    newContentTitle.classList.add("is-4")
    newContentTitle.textContent = result.Title;

    let newContentSubtitle = document.createElement("h4");
    newContentSubtitle.classList.add("subtitle");
    newContentSubtitle.classList.add("is-5");
    newContentSubtitle.textContent = result.Subtitle;

    let newCardFooter = document.createElement("div");
    newCardFooter.classList.add("card-footer");

    let newAddListButton = document.createElement("a");
    newAddListButton.classList.add("add-favorite");
    newAddListButton.classList.add("card-footer-item");
    newAddListButton.classList.add("button");
    newAddListButton.classList.add('is-dark')
    newAddListButton.classList.add("is-fullwidth");
    newAddListButton.textContent = "Add to my List";
    newAddListButton.dataset.Type = result.Type;

    let existingList;

    if (result.Type === "Movie") {
        existingList = getMoviesFromLocalStorage();
    } else {
        existingList = getBooksFromLocalStorage();
    }

    if (existingList.findIndex(x => x.Title === result.Title) >= 0) {
        newAddListButton.textContent = "Remove from List";
        newAddListButton.dataset.Mode = "Remove";
        newAddListButton.addEventListener("click", clickAddButton);

    } else {
        newAddListButton.textContent = "Add to my List";
        newAddListButton.dataset.Mode = "Add";
        newAddListButton.addEventListener("click", clickAddButton);
    }


    newDivTile.appendChild(newCard);
    newCard.appendChild(newCardImage);
    newCardImage.appendChild(newFigure);
    newFigure.appendChild(newImage);
    newCard.appendChild(newDivContent);
    newDivContent.appendChild(newContentTitle);
    newDivContent.appendChild(newContentSubtitle);
    newDivContent.appendChild(newCardFooter);
    newCardFooter.appendChild(newAddListButton);
    resultsEL.appendChild(newDivTile);
}
