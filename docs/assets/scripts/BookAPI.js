let movieAPILink = "http://www.omdbapi.com/?apikey=";
let movieAPIKey = "ab6fe753";

function FindBookByTitle(titleText){};
function FindBookByTitle(titleText){};
function GetBookWatchListFromLocalStorage(){};
function AddBookToWatchList(Result){};
function RemoveBookFromReadList(Result){};

function findMovieByTitle(titleText, callback){
    fetch(movieAPILink + movieAPIKey + "&t=" + titleText)
    .then(response => response.json())
    .then(data => {
        callback(data);
    })   
}

findMovieByTitle("Inception", response => {
    console.log(response);
})