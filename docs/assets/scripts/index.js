const resultsEL = document.querySelector("#results");

window.addEventListener("load", () => {
    resultsEL.innerHTML = "";
    document.querySelector("#search-button").addEventListener("click", clickedSearch);

    //check radio button
});

function clickedSearch(){
    let searchValue = document.querySelector("#search-input").value;
    
    if (searchValue.length < 1)
    {
        return;
    }

    if(SearchType() === "Movie"){
        DisplayResults(GetMovieWatchListFromLocalStorage());
    } else if (SearchType() === "Book") {

    } else {
        
    }
};

function SearchType(){
    return "Movie"
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
    results.forEach(result => {
        let newTile = document.createElement("div");
    });
};




//Prototype Functions
function GetMovieWatchListFromLocalStorage(){
    return [{Title: "Movie 1"}, {Title: "Movie 2"}, {Title: "Movie 3"}];
};

function GetBookReadListFRomLocalStorage(){
    return [{Title: "book 1"}, {Title: "book 2"}, {Title: "book 3"}];
}