/*******************************************************
 * 
 * https://openlibrary.org/search.json?q=the+lord+of+the+rings
 * https://openlibrary.org/search.json?title=the+lord+of+the+rings
 * https://openlibrary.org/search.json?author=tolkien&sort=new
 * https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=2
 * https://openlibrary.org/search/authors.json?q=twain
 * 
 *******************************************************/

function FindBookByTitle(titleText, someFunction){};
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
                        PublishYear: book.first_publish_year,
                        CoverLink: "https://covers.openlibrary.org/b/id/" + book.cover_i + "-L.jpg" 
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