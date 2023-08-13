let updateGenreForm = document.getElementById('update-genre-form-ajax');

updateGenreForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let updateInputName = document.getElementById("update-genre-input-name");
    let updateName = document.getElementById("update-genre-output-name");

    let updateInputNameValue = updateInputName.value;
    let updateNameValue = updateName.value;

    let data = { 
        genreID: updateInputNameValue,
        name: updateNameValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, updateInputNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

function updateRow(data, genreID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("genres-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == genreID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign homeworld to our value we updated to
            td.textContent = parsedData[0].name; 
       }
    }
}