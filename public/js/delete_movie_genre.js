// Delete Movie AJAX Request
function deleteMovieGenre(movieID,genreID) {
    // Data to send over
    let data = {
        movieID: movieID,
        genreID: genreID,
    };

    // AJAX Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-movie_genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Delete appropriate row
            deleteRow(movieID,genreID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(movieID,genreID){
    let table = document.getElementById("movies_genres-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("movie-value") == movieID &&
           table.rows[i].getAttribute("genre-value") == genreID) {
            table.deleteRow(i);
            break;
       }
    }
    
}