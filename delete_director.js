// Delete Movie AJAX Request
function deleteDirector(directorID) {
    // Data to send over
    let data = {
        directorID: directorID
    };

    // AJAX Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-director-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Delete appropriate row
            deleteRow(directorID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(directorID){
    let table = document.getElementById("directors-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == directorID) {
            table.deleteRow(i);
            break;
       }
    }
    
}