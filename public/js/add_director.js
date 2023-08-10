let addDirectorForm = document.getElementById('add-director-form-ajax');

addDirectorForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get elements
    let inputName = document.getElementById('input-director-name');
    let inputBirthdate = document.getElementById('input-director-birthdate');
    let inputGender = document.getElementById('input-director-gender');
    let inputMovieCount = document.getElementById('input-director-movieCount');

    // Get element values
    let nameValue = inputName.value;
    let birthdateValue = inputBirthdate.value;
    let genderValue = inputGender.value;
    let movieCountValue = inputMovieCount.value;

    // Data to send 
    let data = {
        name: nameValue,
        birthdate: birthdateValue,
        gender: genderValue,
        movieCount: movieCountValue
    };

    // POST Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-director-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new data
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

    xhttp.send(JSON.stringify(data));
});

addRowToTable = (data) => {
    // Director Table reference
    let currentTable = document.getElementById("directors-table");

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
        deleteMovie(newRow.directorID);
    };

    // Add data to row
    row.appendChild(deleteCell);
    row.appendChild(nameCell);
    row.appendChild(birthdateCell);
    row.appendChild(genderCell);
    row.appendChild(movieCountCell);

    row.setAttribute('data-value', newRow.directorID);
    
    // Add row to table
    currentTable.appendChild(row);

    location.reload();
    
};