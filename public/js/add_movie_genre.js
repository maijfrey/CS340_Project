// All source code based on the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
// Last Updated: 8/13/2021

// Get the form
let addMovieGenreForm = document.getElementById('add-movie_genre-form-ajax');

// Add event listener for submission
addMovieGenreForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get elements
    let inputTitle = document.getElementById("input-movieTitle");
    let inputGenre = document.getElementById("input-genreName");


    // Get element values
    let titleValue = inputTitle.value;
    let genreValue = inputGenre.value;


    // Data to send (element values)
    let data = {
        movieID: titleValue,
        genreID: genreValue,
    }
    
    // AJAX POST Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-movie_genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new data
            addRowToTable(xhttp.response);
            // Clear the inputs 
            inputTitle.value = '';
            inputGenre.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            // error handling
            console.log("There was an error with the input.")
        }
    }

    // Send data and request
    xhttp.send(JSON.stringify(data));

})


// Create new row for the table
addRowToTable = (data) => {

    // Table reference
    let currentTable = document.getElementById("movies_genres-table");

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create new row 
    let row = document.createElement("TR");
    let deleteCell = document.createElement("TD");
    let movieCell = document.createElement("TD");
    let genreCell = document.createElement("TD");

    // Fill row data
    movieCell.innerText = newRow.movieID;
    genreCell.innerText = newRow.genreID;

    // Create new delete button 
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteMovieGenre(newRow.movieID,newRow.genreID);
    };

    // Add data to row
    row.appendChild(deleteCell);
    row.appendChild(movieCell);
    row.appendChild(genreCell);

    row.setAttribute('genre-value', newRow.genreID);
    row.setAttribute('movie-value', newRow.movieID);

    // Add row to table
    currentTable.appendChild(row);

    location.reload();
}