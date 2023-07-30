
//Shows current tab and sets the activity to present proper color
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    for (const tab of tabs) {
      if (tab.id === tabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    }
  
    const tabButtons = document.querySelectorAll('.tab');
    for (const button of tabButtons) {
      if (button.textContent.toLowerCase() === tabId.replace('-', ' ').toLowerCase()) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    }
  }

  //------------------------------------------------------------------------------------------------------------------------------------------
function updateSortOptions() {
    const sortCategorySelect = document.getElementById('sort-category');
    const sortBySelect = document.getElementById('sort-by');

    sortBySelect.innerHTML = ''; // Clear previous options

    if (sortCategorySelect.value === 'movies') {
    addOption(sortBySelect, 'Title', 'title');
    addOption(sortBySelect, 'Release', 'release');
    addOption(sortBySelect, 'Gross', 'gross');
    } else if (sortCategorySelect.value === 'actors' || sortCategorySelect.value === 'directors') {
    addOption(sortBySelect, 'Name', 'name');
    addOption(sortBySelect, 'Movie Count', 'movie-count');
    addOption(sortBySelect, 'Birthdate', 'birthdate');
    } else if (sortCategorySelect.value === 'genres') {
    addOption(sortBySelect, 'Name', 'name');
    }
}

function submitSort() {
    const sortCategory = document.getElementById('sort-category').value;
    const sortBy = document.getElementById('sort-by').value;
    const sortOrder = document.querySelector('input[name="sort-order"]:checked').value;

        // For now, display the selected options in the output box

    const outputBox = document.getElementById('sort-output');
    outputBox.textContent = `Category: ${sortCategory}, Sort By: ${sortBy}, Sort Order: ${sortOrder}`;
}

  //------------------------------------------------------------------------------------------------------------------------------------------
function updateSearchOptions() {
    const searchCategorySelect = document.getElementById('search-category');
    const searchBySelect = document.getElementById('search-by');
    const searchOrderBySelect = document.getElementById('search-order-by');

    searchOrderBySelect.innerHTML = ''; // Clear previous options

    if (searchCategorySelect.value === 'movies') {
    addOption(searchBySelect, 'Movie Title', 'movie-title');
    addOption(searchBySelect, 'Actor Name', 'actor-name');
    addOption(searchBySelect, 'Character Name', 'character-name');
    addOption(searchBySelect, 'Director Name', 'director-name');
    addOption(searchBySelect, 'Genre Name', 'genre-name');

    addOption(searchOrderBySelect, 'Title', 'title');
    addOption(searchOrderBySelect, 'Release Date', 'release-date');
    addOption(searchOrderBySelect, 'Revenue', 'revenue');
    } else if (searchCategorySelect.value === 'actors') {
    addOption(searchBySelect, 'Actor Name', 'actor-name');
    addOption(searchBySelect, 'Character Name', 'character-name');
    addOption(searchBySelect, 'Movie Name', 'movie-name');

    addOption(searchOrderBySelect, 'Name', 'name');
    addOption(searchOrderBySelect, 'Birthdate', 'birthdate');
    addOption(searchOrderBySelect, 'Movie Count', 'movie-count');
    } else if (searchCategorySelect.value === 'directors') {
    addOption(searchBySelect, 'Director Name', 'director-name');
    addOption(searchBySelect, 'Movie Name', 'movie-name');

    addOption(searchOrderBySelect, 'Name', 'name');
    addOption(searchOrderBySelect, 'Birthdate', 'birthdate');
    addOption(searchOrderBySelect, 'Movie Count', 'movie-count');
    } else if (searchCategorySelect.value === 'genres') {
    addOption(searchBySelect, 'Genre Name', 'genre-name');

    addOption(searchOrderBySelect, 'Genre Name', 'genre-name');
    }
}

function addOption(selectElement, label, value) {
    const option = document.createElement('option');
    option.text = label;
    option.value = value;
    selectElement.appendChild(option);
}

function submitSearch() {
    const searchCategory = document.getElementById('search-category').value;
    const searchBy = document.getElementById('search-by').value;
    const searchOrderBy = document.getElementById('search-order-by').value;
    const searchOrder = document.querySelector('input[name="search-order"]:checked').value;
    const searchQuery = document.getElementById('search-query').value;

        // For now, display the selected options in the output box

    const outputBox = document.getElementById('search-output');
    outputBox.textContent = `Category: ${searchCategory}, Search By: ${searchBy}, Order By: ${searchOrderBy}, Search Order: ${searchOrder}, Search Query: ${searchQuery}`;
}

  //------------------------------------------------------------------------------------------------------------------------------------------

function updateUpdateOptions() {
    const updateCategorySelect = document.getElementById('update-category');
    const infoToUpdateSelect = document.getElementById('info-to-update');
  
    infoToUpdateSelect.innerHTML = ''; // Clear previous options
  
    if (updateCategorySelect.value === 'movies') {
      addOption(infoToUpdateSelect, 'Title', 'title');
      addOption(infoToUpdateSelect, 'Release Date', 'release-date');
      addOption(infoToUpdateSelect, 'Gross Revenue', 'gross-revenue');
      addOption(infoToUpdateSelect, 'Production Cost', 'production-cost');
      addOption(infoToUpdateSelect, 'Director Name', 'director-name');
    } else if (updateCategorySelect.value === 'actors' || updateCategorySelect.value === 'directors') {
      addOption(infoToUpdateSelect, 'Name', 'name');
      addOption(infoToUpdateSelect, 'Birthdate', 'birthdate');
      addOption(infoToUpdateSelect, 'Gender', 'gender');
      addOption(infoToUpdateSelect, 'Movie Count', 'movie-count');
    } else if (updateCategorySelect.value === 'genres') {
      addOption(infoToUpdateSelect, 'Name', 'name');
    }
  }

  function submitUpdate() {
    const updateCategory = document.getElementById('update-category').value;
    const nameTitle = document.getElementById('name-title').value;
    const infoToUpdate = document.getElementById('info-to-update').value;
    const replaceWith = document.getElementById('replace-with').value;
  
        // For now, display the selected options in the output box

    const outputBox = document.getElementById('update-output');
    outputBox.textContent = `Category: ${updateCategory}, Name/Title: ${nameTitle}, Information to Update: ${infoToUpdate}, Replace with: ${replaceWith}`;
  }

  //------------------------------------------------------------------------------------------------------------------------------------------

function updateAddNewFields() {
    const addNewCategorySelect = document.getElementById('add-new-category');
    const addNewFieldsDiv = document.getElementById('add-new-fields');

    addNewFieldsDiv.innerHTML = ''; // Clear previous fields
  
    if (addNewCategorySelect.value === 'actors' || addNewCategorySelect.value === 'directors') {
      addTextInput('Name', 'name');
      addTextInput('Movie Count', 'movie-count');
      addTextInput('Birthdate', 'birthdate');
      addTextInput('Gender', 'gender');
    } else if (addNewCategorySelect.value === 'genres') {
      addTextInput('Genre Name', 'genre-name');
    } else if (addNewCategorySelect.value === 'movies') {
      addTextInput('Title', 'title');
      addTextInput('Release Date', 'release-date');
      addTextInput('Director', 'director');
      addTextInput('Production Cost', 'production-cost');
      addTextInput('Gross Revenue', 'gross-revenue');
    } else if (addNewCategorySelect.value === 'actor-to-movie') {
      addTextInput('Movie Title', 'movie-title');
      addTextInput('Actor Name', 'actor-name');
      addTextInput('Character Name', 'character-name');
    } else if (addNewCategorySelect.value === 'genre-to-movie') {
      addTextInput('Movie Title', 'movie-title');
      addTextInput('Genre Name', 'genre-name');
    }
  
  
  function addTextInput(label, id) {
    const div = document.createElement('div');
    div.classList.add('form-row');
  
    const formLabel = document.createElement('div');
    formLabel.classList.add('form-label');
    formLabel.textContent = label + ':';
  
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
  
    div.appendChild(formLabel);
    div.appendChild(input);
    addNewFieldsDiv.appendChild(div);
  }}
  
  function submitAddNew() {
    const addNewCategory = document.getElementById('add-new-category').value;
    const addNewOutput = document.getElementById('add-new-output');
    addNewOutput.textContent = `Category: ${addNewCategory}, New Item Data: `;
  
    const addNewFieldsDiv = document.getElementById('add-new-fields');
    const inputs = addNewFieldsDiv.getElementsByTagName('input');
  
    // For now, display the selected options in the output box


    for (const input of inputs) {
      const label = input.previousSibling.textContent.replace(':', '');
      const value = input.value;
      addNewOutput.textContent += `${label}: ${value}, `;
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    const removeCategorySelect = document.getElementById("remove-category");
    const removeFieldsDiv = document.getElementById("remove-fields");
  
    function addTextInput(label, id) {
      const div = document.createElement("div");
      div.classList.add("form-row");
  
      const formLabel = document.createElement("div");
      formLabel.classList.add("form-label");
      formLabel.textContent = label + ":";
  
      const input = document.createElement("input");
      input.type = "text";
      input.id = id;
  
      div.appendChild(formLabel);
      div.appendChild(input);
      removeFieldsDiv.appendChild(div);
    }
  
    removeCategorySelect.addEventListener("change", function () {
      const selectedCategory = removeCategorySelect.value;
      removeFieldsDiv.innerHTML = ""; 
  
      if (selectedCategory === "genre-to-movie") {
        addTextInput("Movie Name", "movie-name");
        addTextInput("Genre Name", "genre-name");
      } else if (selectedCategory === "actor-to-movie") {
        addTextInput("Movie Name", "movie-name");
        addTextInput("Actor Name", "actor-name");
      } else {
        addTextInput("Name", "name");
      }
    });
  
    function submitRemove() {
      const removeCategory = removeCategorySelect.value;
      const removeName = document.getElementById("name").value;
  
  
      const outputBox = document.getElementById("remove-output");
      outputBox.textContent = `Category: ${removeCategory}, Name: ${removeName}`;
    }
  
    document.getElementById("remove-btn").addEventListener("click", submitRemove);
  });

  //------------------------------------------------------------------------------------------------------------------------------------------


// Show the "Sort All" tab by default
showTab('sort-all');
