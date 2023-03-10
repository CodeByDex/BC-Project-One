const resultsEL = document.querySelector("#results");
const booksCheck = document.querySelector("#Books");
const moviesCheck = document.querySelector("#Movies");
const searchInputEL = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

window.addEventListener("load", () => {
    resultsEL.innerHTML = "";
    searchButton.addEventListener("click", clickedSearch);

    booksCheck.checked = true;
});

function clickedSearch(){
    let searchValue = searchInputEL.value;
    
    if (searchValue.length < 1)
    {
        return;
    }

    searchButton.setAttribute("disabled", "");

    if(SearchType() === "Movie"){
        findMoviesByTitle(searchValue, DisplayResults);
    } else if (SearchType() === "Book") {
        FindBooksByTitle(searchValue, DisplayResults);
    } else {
        
    }
};

function SearchType(){
    if(booksCheck.checked) {
        return "Book";
    } else
    {
        return "Movie";
    }
};

function DisplayResults(results){

    if (results.length != 0)
    {
        resultsEL.innerHTML = "";

        results.forEach(result => {
            if (result.Type != "Error")
            {
                let newDivTile = document.createElement("div");
                    newDivTile.classList.add("tile")
                    newDivTile.classList.add("is-3")

                let newCard = document.createElement("div");
                    newCard.classList.add("card")

                let newCardImage = document.createElement("div");
                    newCardImage.classList.add("card-image")

                let newFigure = document.createElement("figure");
                    newFigure.classList.add("img")
                    newFigure.classList.add("is-4by3")

                let newImage = document.createElement("img");
                    newImage.setAttribute("src", "https://placekitten.com/200")
                    newImage.setAttribute("alt", "Movie Title Alt")

                let newDivContent = document.createElement("div");
                    newDivContent.classList.add("card-content")
                    newDivContent.classList.add("p-3")

                let newContentTitle = document.createElement("h3")
                    newContentTitle.classList.add("title")
                    newContentTitle.classList.add("is-4")
                    newContentTitle.textContent = result.Title;

                let newContentSubtitle = document.createElement("h4");
                    newContentSubtitle.classList.add("subtitle");
                    newContentSubtitle.classList.add("is-5");
                    newContentSubtitle.textContent = "Subtitle";

                let newCardFooter = document.createElement("div");
                    newCardFooter.classList.add("card-footer");
                    
                let newAddListButton = document.createElement("a");
                    newAddListButton.classList.add("add-favorite"); // Check class type
                    newAddListButton.classList.add("card-footer-item");
                    newAddListButton.classList.add("button");
                    newAddListButton.classList.add("is-fullwidth");
                    newAddListButton.textContent = "Add to my List";
                newAddListButton.addEventListener("click", clickAddButton)
                
                
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

            } else {
                resultsEL.textContent = result.ErrorMessage;
            }
        });
    } else {
        results.textContent = "No Results Found";
    }

    searchInputEL.value = "";
    searchButton.removeAttribute("disabled");

};

function clickAddButton(event) {
    console.log(event.target.parentNode);
};