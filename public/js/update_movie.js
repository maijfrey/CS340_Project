// Citation for the following the functions on the page: 
// Date: 08-11-2023
// Adapted from: This module was adapted from the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 

// Get form
let updateMovieForm = document.getElementById('update-movie-form');

updateMovieForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get input elements with update information
    let updateMovie = document.getElementById("update-movie-title");
    let updateDirector = document.getElementById("update-movie-director");

    // Get element values 
    let movieValue = updateMovie .value;
    let directorValue = updateDirector.value;

    // Data to send (element values)
    let data = { 
        movieID: movieValue,
        directorID: directorValue
    };

    // AJAX PUT request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-movie-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, movieValue, directorValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            // error handling
            console.log("There was an error with the input.")
        }
    }

    // Send data and request
    xhttp.send(JSON.stringify(data));

});

// Update a specified row in the Movies table
function updateRow(data, movieID, directorValue){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("movies-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == movieID) {
            // Get row with specified movieID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get directorID column of current row
            let td = updateRowIndex.getElementsByTagName("td")[5];

            // Updated directorI value
            if (directorValue != "") {
                td.innerHTML = parsedData[0].directorID; 
            }
       }
    }
    location.reload();
}