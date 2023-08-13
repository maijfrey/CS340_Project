let updateMovieGenreForm = document.getElementById('update-movie_genre-form-ajax');

updateMovieGenreForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let updateMovieID = document.getElementById("update-movie_genre-movieID");
    let updateInputGenreID = document.getElementById("update-input-movie_genre-genreID");
    let updateOutputGenreID = document.getElementById("update-output-movie_genre-genreID");

    let movieIDValue = updateMovieID.value;
    let inputGenreIDValue = updateInputGenreID.value;
    let outputGenreIDValue = updateOutputGenreID.value;


    let data = { 
        movieID: movieIDValue,
        inputGenreID: inputGenreIDValue,
        outputGenreID: outputGenreIDValue
    };

    console.log(data)
    
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
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

function updateRow(data, movieIDValue,inputGenreIDValue,outputGenreIDValue) {
    let table = document.getElementById("movies_genres-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("movie-value") == movieIDValue &&
            table.rows[i].getAttribute("genre-value") == inputGenreIDValue) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[2];
            td.innerHTML = outputGenreIDValue;

            table.rows[i].setAttribute('genre-value', outputGenreIDValue);

            break;
        }
    }
}