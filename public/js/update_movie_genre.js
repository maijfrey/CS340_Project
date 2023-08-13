// All source code based on the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
// Last Updated: 8/13/2021

// Get form
let updateMovieGenreForm = document.getElementById('update-movie_genre-form-ajax');

// Add event listener
updateMovieGenreForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get elements
    let updateMovieID = document.getElementById("update-movie_genre-movieID");
    let updateInputGenreID = document.getElementById("update-input-movie_genre-genreID");
    let updateOutputGenreID = document.getElementById("update-output-movie_genre-genreID");

    // Get element values
    let movieIDValue = updateMovieID.value;
    let inputGenreIDValue = updateInputGenreID.value;
    let outputGenreIDValue = updateOutputGenreID.value;

    // Data to send (element values)
    let data = { 
        movieID: movieIDValue,
        inputGenreID: inputGenreIDValue,
        outputGenreID: outputGenreIDValue
    };
    
    // AJAX PUT Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-movie_genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, movieIDValue,inputGenreIDValue,outputGenreIDValue);
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            // error handling
            console.log("There was an error with the input.")
        }
    }

    // Send data and request
    xhttp.send(JSON.stringify(data));

});

// Update the HTML Table row
function updateRow(data, movieIDValue,inputGenreIDValue,outputGenreIDValue) {
    let table = document.getElementById("movies_genres-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("movie-value") == movieIDValue &&
            table.rows[i].getAttribute("genre-value") == inputGenreIDValue) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of Genre Name Column
            let td = updateRowIndex.getElementsByTagName("td")[2];
            td.innerHTML = outputGenreIDValue;

            // Reassign Genre Name Column
            table.rows[i].setAttribute('genre-value', outputGenreIDValue);

            break;
        }
    }
}