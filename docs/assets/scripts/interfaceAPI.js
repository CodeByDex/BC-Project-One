let movieAPILink = "https://www.omdbapi.com/?apikey=";
let movieAPIKey = "ab6fe753";

/*******************************************************
 * 
 * https://openlibrary.org/search.json?q=the+lord+of+the+rings
 * https://openlibrary.org/search.json?title=the+lord+of+the+rings
 * https://openlibrary.org/search.json?author=tolkien&sort=new
 * https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=2
 * https://openlibrary.org/search/authors.json?q=twain
 * 
 *******************************************************/

function FindBookByTitle(titleText, someFunction){
    FindBooksByTitle(titleText, (results) => {
        someFunction(results[0]);
    })
};
function FindBooksByTitle(titleText, someFunction){
    let params = new URLSearchParams();

    params.append("q", titleText);

    let booksFound = [];

    fetch("https://openlibrary.org/search.json?"+params.toString())
        .then(response => {
            if(response.ok)
            {
                return response.json();
            } else {
                booksFound.push({
                    Type: "Error",
                    ErrorMessage: "Response Error: " + response.status
                });
            }

            someFunction(booksFound);
        })
        .then(results => {
            if (results.numFound > 0)
            {
                results.docs.forEach(book => {
                    booksFound.push({
                        Type: "Book",
                        Title: book.title,
                        Author: book.author_name,
                        Subtitle: "Released in " + book.first_publish_year,
                        ImageURL: "https://covers.openlibrary.org/b/id/" + book.cover_i + "-L.jpg" 
                    });
                });
            } else {
                booksFound.push({
                    Type: "Error",
                    ErrorMessage: "No Results Found"
                });
            }

            someFunction(booksFound);
        });
};

// FindBooksByTitle("The Hobbit", (results) => {
//     console.log(results)
// });

function findMovieByTitle(titleText, callback){
    fetch(movieAPILink + movieAPIKey + "&t=" + titleText)
    .then(response => {
        if(response.ok){
            return response.json()
        } else {
            return response.status;
        }
    })
    .then(data => {
        if(!data.Error){
            callback(data);
        } else {
            callback(data.Error);
        }
    })   
}

function findMoviesByTitle(titleText, callback){
    let foundMovies = [];
    fetch(movieAPILink + movieAPIKey + "&s=" + titleText)
    .then(response => {
        if(response.ok){
            return response.json();
        } else {
            return response.status;
        }
    })
    .then(data => {
        if(!data.Error){
            data.Search.forEach(movie => {
                foundMovies.push({
                    Type: "Movie",
                    Title: movie.Title,
                    Subtitle: "Released in " + movie.Year,
                    ImageURL: movie.Poster
                })
            })
            callback(foundMovies);
        } else {
            foundMovies.push({
                Type: "Error",
                    ErrorMessage: data.Error
            })
            callback(foundMovies);
        }
    })
}

// findMoviesByTitle("Lord of the Rings", results => console.log(results));
// findMovieByTitle("Lord of the Rings", results => console.log(results));
