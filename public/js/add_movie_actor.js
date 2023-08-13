// Get the add movie form
let addMovieActorForm = document.getElementById('add-movie_actor-form-ajax');

// Add event listener for submission
addMovieActorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get element via element ID
    let inputTitle = document.getElementById("input-movieTitle");
    let inputActor = document.getElementById("input-actorName");
    let inputCharacterName= document.getElementById("input-characterName");


    // Get values from input elements
    let titleValue = inputTitle.value;
    let actorValue = inputActor.value;
    let characterNameValue = inputCharacterName.value;


    // Put our data we want to send in a javascript object
    let data = {
        movieID: titleValue,
        actorID: actorValue,
        characterName: characterNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-movie_actor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data
            addRowToTable(xhttp.response);

            // Clear the inputs 
            inputTitle.value = '';
            inputActor.value = '';
            inputCharacterName.value = '';
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
    let currentTable = document.getElementById("movies_actors-table");

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create new row 
    let row = document.createElement("TR");
    let deleteCell = document.createElement("TD");
    let movieCell = document.createElement("TD");
    let actorCell = document.createElement("TD");
    let characterCell = document.createElement("TD");

    // Fill row data
    movieCell.innerText = newRow.movieID;
    actorCell.innerText = newRow.actorID;
    characterCell.innerText = newRow.characterName;

    // Create new delete button 
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteMovieActor(newRow.movieID,newRow.actorID);
    };

    // Add data to row
    row.appendChild(deleteCell);
    row.appendChild(movieCell);
    row.appendChild(actorCell);
    row.appendChild(characterCell);

    row.setAttribute('actor-value', newRow.actorID);
    row.setAttribute('movie-value', newRow.movieID);
    row.setAttribute('character-value', newRow.characterName);

    // Add row to table
    currentTable.appendChild(row);

    location.reload();
}