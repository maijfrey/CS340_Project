// All source code based on the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
// Last Updated: 8/13/2021

// Get form
let updateActorForm = document.getElementById('update-actor-form-ajax');

// Add event listener
updateActorForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get elements
    let updateActor = document.getElementById("update-actor-name");
    let updateMovieCount = document.getElementById("update-actor-movieCount");

    // Get element values
    let actorValue = updateActor.value;
    let movieCountValue = updateMovieCount.value;

    // Data to send (element values)
    let data = { 
        actorID: actorValue,
        movieCount: movieCountValue
    };

    // AJAX PUT Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-actor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the new data to the table
            updateRow(xhttp.response, actorValue);

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
function updateRow(data, actorID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("actors-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == actorID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of Movie Count column
            let td = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign Movie Count to our value we updated to
            td.innerHTML = parsedData[0].movieCount; 
       }
    }
}