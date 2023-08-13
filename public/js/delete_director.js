// Citation for the following the functions on the page: 
// Date: 08-10-2023
// Adapted from: This module was adapted from the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 

// Delete Movie AJAX Request
function deleteDirector(directorID) {
    // Data to send over
    let data = {
        directorID: directorID
    };

    // AJAX Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-director-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Delete appropriate row
            deleteRow(directorID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            // error handling
            console.log("There was an error with the input.")
        }
    }
    // Send data and request
    xhttp.send(JSON.stringify(data));
}

// Function to deleteRow with the specified directorID
function deleteRow(directorID){
    let table = document.getElementById("directors-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // Run loop until correct directorID is identified
       if (table.rows[i].getAttribute("data-value") == directorID) {
            // Delete row at specified directorID
            table.deleteRow(i);
            break;
       }
    }
    
}