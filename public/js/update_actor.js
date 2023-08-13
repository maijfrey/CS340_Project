let updateActorForm = document.getElementById('update-actor-form-ajax');

updateActorForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let updateActor = document.getElementById("update-actor-name");
    let updateMovieCount = document.getElementById("update-actor-movieCount");

    let actorValue = updateActor.value;
    let movieCountValue = updateMovieCount.value;

    let data = { 
        actorID: actorValue,
        movieCount: movieCountValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-actor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, actorValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

function updateRow(data, actorID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("actors-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == actorID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].movieCount; 
       }
    }
}