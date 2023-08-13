// All source code based on the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
// Last Updated: 8/13/2021

// Get the form
let addActorForm = document.getElementById('add-actor-form-ajax');

// Add event listener for submission
addActorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get elements
    let inputName = document.getElementById("input-actor-name");
    let inputBirthdate = document.getElementById("input-actor-birthdate");
    let inputGender = document.getElementById("input-actor-gender");
    let inputMovieCount = document.getElementById("input-actor-movieCount");

    // Get element values
    let nameValue =  inputName.value;
    let birthdateValue = inputBirthdate.value;
    let genderValue = inputGender.value;
    let movieCountValue = inputMovieCount.value;


    // Data to send (element values)
    let data = {
        name: nameValue,
        birthdate: birthdateValue,
        gender: genderValue,
        movieCount: movieCountValue,
    }
    
    // AJAX POST Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-actor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new row/data
            addRowToTable(xhttp.response);
            // Clear the inputs 
            inputName.value = '';
            inputBirthdate.value = '';
            inputGender.value = '';
            inputMovieCount.value = '';
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
    let currentTable = document.getElementById("actors-table");

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create new row 
    let row = document.createElement("TR");
    let deleteCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let birthdateCell = document.createElement("TD");
    let genderCell = document.createElement("TD");
    let movieCountCell = document.createElement("TD");


    // Fill row data
    nameCell.innerText = newRow.name;
    birthdateCell.innerText = newRow.birthdate;
    genderCell.innerText = newRow.gender;
    movieCountCell.innerText = newRow.movieCount;

    // Create new delete button 
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteActor(newRow.actorID);
    };

    // Add data to row
    row.appendChild(deleteCell);
    row.appendChild(nameCell);
    row.appendChild(birthdateCell);
    row.appendChild(genderCell);
    row.appendChild(movieCountCell);

    row.setAttribute('data-value', newRow.actorID);
    
    // Add row to table
    currentTable.appendChild(row);

    location.reload();
}