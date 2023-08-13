let updateMovieActorForm = document.getElementById('update-movie_actor-form-ajax');

updateMovieActorForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let updateMovieID = document.getElementById("update-movie_actor-movieID");
    let updateActorID = document.getElementById("update-movie_actor-actorID");
    let updateInputCharacterName = document.getElementById("update-input-characterName");
    let updateOutputCharacterName = document.getElementById("update-output-characterName");

    let movieIDValue = updateMovieID.value;
    let actorIDValue = updateActorID.value;
    let inputCharacterNameValue = updateInputCharacterName.value;
    let outputCharacterNameValue = updateOutputCharacterName.value;

    let data = { 
        movieID: movieIDValue,
        actorID: actorIDValue,
        inputCharacterName: inputCharacterNameValue,
        outputCharacterName: outputCharacterNameValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-movie_actor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, movieID,actorID,inputCharacterName,outputCharacterName);
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

function updateRow(data, movieID, actorID, inputCharacterName, outputCharacterName) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("movies_actors-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("movie-value") == movieID &&
            table.rows[i].getAttribute("actor-value") == actorID &&
            table.rows[i].getAttribute("character-value") == inputCharacterName) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of character name value
            let td = updateRowIndex.getElementsByTagName("td")[3];
            td.innerHTML = outputCharacterName;

            table.rows[i].setAttribute('character-value', outputCharacterName);

            break;
        }
    }
}