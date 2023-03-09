const resultsEL = document.querySelector("#results");
const booksCheck = document.querySelector("#Books");
const moviesCheck = document.querySelector("#Movies");

window.addEventListener("load", () => {
    resultsEL.innerHTML = "";
    document.querySelector("#search-button").addEventListener("click", clickedSearch);

    booksCheck.checked = true;
});

function clickedSearch(){
    let searchValue = document.querySelector("#search-input").value;
    
    if (searchValue.length < 1)
    {
        return;
    }

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

};

function clickAddButton(event) {
    console.log(event.target.parentNode);
};