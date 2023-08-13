// Citation for the following the functions on the page: 
// Date: 08-01-2023
// Adapted from: This module was adapted from the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 

// Delete Movie AJAX Request
function deleteMovie(movieID) {
    // Data to send over
    let data = {
        movieID: movieID
    };

    // AJAX Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-movie-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Delete appropriate row
            deleteRow(movieID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            // Error handling
            console.log("There was an error with the input.")
        }
    }
    // Send the request
    xhttp.send(JSON.stringify(data));
}


// Delete given movie 
function deleteRow(movieID){
    let table = document.getElementById("movies-table");
    // Run loop until given movieID is found
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == movieID) {
            // Delete row at specified movieID
            table.deleteRow(i);
            break;
       }
    }
}