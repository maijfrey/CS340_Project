// Citation for the following the functions on the page: 
// Date: 08-10-2023
// Adapted from: This module was adapted from the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 

let updateDirectorForm = document.getElementById('update-director-form-ajax');

updateDirectorForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let updateDirector = document.getElementById("update-director-name");
    let updateMovieCount = document.getElementById("update-director-movieCount");

    let directorValue = updateDirector.value;
    let movieCountValue = updateMovieCount.value;

    let data = { 
        directorID: directorValue,
        movieCount: movieCountValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-director-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, directorValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

function updateRow(data, directorID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("directors-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == directorID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].movieCount; 
       }
    }
}