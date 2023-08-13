// Citation for the following the functions on the page: 
// Date: 08-11-2023
// Adapted from: This module was adapted from the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 

let updateMovieForm = document.getElementById('update-movie-form');

updateMovieForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let updateMovie = document.getElementById("update-movie-title");
    let updateDirector = document.getElementById("update-movie-director");

    let movieValue = updateMovie .value;
    let directorValue = updateDirector.value;

    let data = { 
        movieID: movieValue,
        directorID: directorValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-movie-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, movieValue, directorValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

function updateRow(data, movieID, directorValue){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("movies-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == movieID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td 
            let td = updateRowIndex.getElementsByTagName("td")[5];

            console.log(directorValue);
            // Updated Value
            if (directorValue != "") {
                td.innerHTML = parsedData[0].directorID; 
            }
       }
    }
    location.reload();
}