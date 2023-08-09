// Update Form reference
let updateMovieForm = document.getElementById('update-movie-form-ajax');
let updateCategory = document.getElementById('input-update-category'); 
let updateSelect = document.getElementById('input-update-text');

// # of column to update
let column;

updateCategory.addEventListener("click", function() {
    // Update select type based on attribnute to change
    updateCategory.addEventListener("change", function() {
        if (updateCategory.value == "title") {
            updateSelect.type="text";
            updateSelect.name="update-title";
            updateSelect.id="update-title";
            column = 1;
        }
        else if (updateCategory.value == "productionCost") {
            updateSelect.type="number"
            updateSelect.name="update-productionCost"
            updateSelect.id="update-productionCost"
            column = 2;
        }
        else if (updateCategory.value == "grossRevenue") {
            updateSelect.type="number"
            updateSelect.name="update-grossRevenue"
            updateSelect.id="update-grossRevenue"
            column = 3;
        }
        else if (updateCategory.value == "releaseDate") {
            updateSelect.type="date";
            updateSelect.name="update-releaseDate";
            updateSelect.id="update-releaseDate";
            column = 4;
        } else {
            updateSelect.type="text";
            updateSelect.name="update-director";
            updateSelect.id="update-director";
            column = 5;
        }
    })
});



updateMovieForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();    
    let updateMovie = document.getElementById('input-update-movie');

    let updateMovieValue = updateMovie.value;
    let updateCategoryValue = updateCategory.value;
    let updateSelectValue = updateSelect.value;

    
    let data = {
        movie: updateMovieValue,
        category: updateCategoryValue,
        select: updateSelectValue
    };

    console.log(data);

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-movie-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update Table
            updateRow(xhttp.response, updateMovieValue, column);

            // Clear the select for another transaction
            updateSelect.type='';
            updateSelect.name='';
            updateSelect.id='';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
});


updateRow = (data, movieID, column) => {
    let parsedData = JSON.parse(data);
    let movieTable = document.getElementById("movies-table");
    let name;
    if (column == 1) {
        name = 'title';
    } else if (column == 2) {
        name = 'productionCost';
    } else if (column == 3) {
        name = 'grossRevenue';
    } else if (column == 4) {
        name = 'releaseDate';
    } else {
        name = 'directorID';
    }

    for (let i = 0, row; row = movieTable.rows[i]; i++) {
        //Iterate through rows until we find the correct movie to update
        if (movieTable.rows[i].getAttribute("data-value") == movieID) {
             // Get row of movieID match
             let updateRowIndex = table.getElementsByTagName("tr")[i];
 
             // Get td
            let td = updateRowIndex.getElementsByTagName("td")[column];
            td.innerHTML = parsedData[0].name; 
        }
     }

}
