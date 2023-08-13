// Get the add movie form
let addGenreForm = document.getElementById('add-genre-form-ajax');

// Add event listener for submission
addGenreForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get element via element ID
    let inputName = document.getElementById("input-genre-name");

    // Get values from input elements
    let nameValue =  inputName.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
    }
    
    // Setup our AJAX request
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
    console.log(JSON.stringify(data));

    xhttp.send(JSON.stringify(data));

})


// Create new row for the Movies Table
addRowToTable = (data) => {

    // Movie Table reference
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