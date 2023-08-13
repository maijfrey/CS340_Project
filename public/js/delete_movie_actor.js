// All source code based on the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
// Last Updated: 8/13/2021

// Delete Movie_Actor AJAX Request
function deleteMovieActor(movieID,actorID,characterName) {
    // Data to send over
    let data = {
        movieID: movieID,
        actorID: actorID,
        characterName: characterName
    };

    // AJAX Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-movie_actor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Delete appropriate row
            deleteRow(movieID,actorID,characterName);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

// HTML Table Row deletion functionality
function deleteRow(movieID,actorID,characterName){
    let table = document.getElementById("movies_actors-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("movie-value") == movieID &&
           table.rows[i].getAttribute("actor-value") == actorID &&
            table.rows[i].getAttribute("character-value") == characterName) {
            table.deleteRow(i);
            break;
       }
    }
    
}