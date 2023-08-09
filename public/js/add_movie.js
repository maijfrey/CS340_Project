// Get the add movie form
let addMovieForm = document.getElementById('add-movie-form-ajax');

// Add event listener for submission
addMovieForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get element via element ID
    let inputTitle = document.getElementById("input-title");
    let inputProductionCost = document.getElementById("input-productionCost");
    let inputGrossRevenue = document.getElementById("input-grossRevenue");
    let inputReleaseDate = document.getElementById("input-releaseDate");
    let inputDirector = document.getElementById("input-director");


    // Get values from input elements
    let titleValue = inputTitle.value;
    let productionCostValue = inputProductionCost.value;
    let grossRevenueValue = inputGrossRevenue.value;
    let releaseDateValue = inputReleaseDate.value;
    let directorValue = inputDirector.value;

    
    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        productionCost: productionCostValue,
        grossRevenue: grossRevenueValue,
        releaseDate: releaseDateValue,
        directorID: directorValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-movie-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data
            addRowToTable(xhttp.response);
            // Clear the inputs 
            inputTitle.value = '';
            inputProductionCost.value = '';
            inputGrossRevenue.value = '';
            inputReleaseDate.value = '';
            inputDirector.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Create new row for the Movies Table
addRowToTable = (data) => {
    // Movie Table reference
    let currentTable = document.getElementById("movies-table");


    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create new row 
    let row = document.createElement("TR");
    let deleteCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let productionCostCell = document.createElement("TD");
    let grossRevenueCell = document.createElement("TD");
    let releaseDateCell = document.createElement("TD");
    let directorCell = document.createElement("TD");


    // Fill row data
    titleCell.innerText = newRow.title;
    productionCostCell.innerText = newRow.productionCost;
    grossRevenueCell.innerText = newRow.grossRevenue;
    releaseDateCell.innerText = newRow.releaseDate;
    directorCell.innerText = newRow.directorID;

    // Create new delete button 
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteMovie(newRow.movieID);
    };

    // Add data to row
    row.appendChild(deleteCell);
    row.appendChild(titleCell);
    row.appendChild(productionCostCell);
    row.appendChild(grossRevenueCell);
    row.appendChild(releaseDateCell);
    row.appendChild(directorCell);

    row.setAttribute('data-value', newRow.movieID);
    
    // Add row to table
    currentTable.appendChild(row);


    let selectUpdate = document.getElementById("input-update-movie");
    let option = document.createElement("option");
    option.text = newRow.title;
    option.value = newRow.movieID;
    selectUpdate.add(option);

    
}