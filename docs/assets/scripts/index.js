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

/*
    <div class="tile is-3">
        <div class="card">
            <img src="placeholder" alt="book/movie-image"> 
            <h3>Title</h3>
            <h4>Author/Director</h4>
            <button class="add-favorite">add to my list</button>
        </div>
    </div>
*/
function DisplayResults(results){

    if (results.length != 0)
    {
        resultsEL.innerHTML = "";

        results.forEach(result => {
            if (result.Type != "Error")
            {
                let newTile = document.createElement("div");
                let newAddButton = document.createElement("button");

                newTile.textContent = result.Title;

                newAddButton.textContent = "Add to Favorites";
                newAddButton.classList.add("button");
                newAddButton.addEventListener("click", clickAddButton);

                newTile.appendChild(newAddButton);
        
                resultsEL.appendChild(newTile);
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