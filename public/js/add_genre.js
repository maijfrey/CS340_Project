// All source code based on the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
// Last Updated: 8/13/2021

// Get the form
let addGenreForm = document.getElementById('add-genre-form-ajax');

// Add event listener for submission
addGenreForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get elements
    let inputName = document.getElementById("input-genre-name");

    // Get element values
    let nameValue =  inputName.value;

    // Data to send (element values)
    let data = {
        name: nameValue,
    }
    
    // AJAX POST Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new data
            addRowToTable(xhttp.response);
            // Clear the inputs 
            inputName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})


// Create new row for the table
addRowToTable = (data) => {

    // Table reference
    let currentTable = document.getElementById("genres-table");

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create new row 
    let row = document.createElement("TR");
    let deleteCell = document.createElement("TD");
    let nameCell = document.createElement("TD");

    // Fill row data
    nameCell.innerText = newRow.name;

    // Create new delete button 
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteGenre(newRow.genreID);
    };

    // Add data to row
    row.appendChild(deleteCell);
    row.appendChild(nameCell);

    row.setAttribute('data-value', newRow.genreID);
    
    // Add row to table
    currentTable.appendChild(row);

    location.reload();
}