// All source code based on the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
// Last Updated: 8/13/2021

// Get form
let updateGenreForm = document.getElementById('update-genre-form-ajax');

// Add event listener
updateGenreForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get elements
    let updateInputName = document.getElementById("update-genre-input-name");
    let updateName = document.getElementById("update-genre-output-name");
    
    // Get element values
    let updateInputNameValue = updateInputName.value;
    let updateNameValue = updateName.value;

    // Data to send (element values)
    let data = { 
        genreID: updateInputNameValue,
        name: updateNameValue
    };

    // AJAX PUT Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, updateInputNameValue);
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
function updateRow(data, genreID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("genres-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == genreID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of Genre Name
            let td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign Genre Name to our value we updated to
            td.textContent = parsedData[0].name; 
       }
    }
}