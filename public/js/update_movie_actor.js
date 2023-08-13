// All source code based on the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
// Last Updated: 8/13/2021

// Get form
let updateMovieActorForm = document.getElementById('update-movie_actor-form-ajax');

// Add event listener
updateMovieActorForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get elements
    let updateMovieID = document.getElementById("update-movie_actor-movieID");
    let updateActorID = document.getElementById("update-movie_actor-actorID");
    let updateInputCharacterName = document.getElementById("update-input-characterName");
    let updateOutputCharacterName = document.getElementById("update-output-characterName");

    // Get element values
    let movieIDValue = updateMovieID.value;
    let actorIDValue = updateActorID.value;
    let inputCharacterNameValue = updateInputCharacterName.value;
    let outputCharacterNameValue = updateOutputCharacterName.value;

    // Data to send (element values)
    let data = { 
        movieID: movieIDValue,
        actorID: actorIDValue,
        inputCharacterName: inputCharacterNameValue,
        outputCharacterName: outputCharacterNameValue
    };

    // AJAX PUT Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-movie_actor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        console.log("here");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, movieIDValue,actorIDValue,inputCharacterNameValue,outputCharacterNameValue);
            location.reload();
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
function updateRow(data, movieID, actorID, inputCharacterName, outputCharacterName) {
    let table = document.getElementById("movies_actors-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("movie-value") == movieID &&
            table.rows[i].getAttribute("actor-value") == actorID &&
            table.rows[i].getAttribute("character-value") == inputCharacterName) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of Character Name column
            let td = updateRowIndex.getElementsByTagName("td")[3];
            td.innerHTML = outputCharacterName;

            // Reassign Character Name to our value we updated to
            table.rows[i].setAttribute('character-value', outputCharacterName);            break;
        }
    }
}