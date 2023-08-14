// Citation for the following the functions on the page: 
// Date: 07-29-2023
// Adapted from: The following lines of code were adapted from the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 

/*
    SETUP
*/

//
// Express
var express = require('express');   
var app     = express();            
PORT        = 6100;                 

// Connect to database
var db = require('./database/db-connector.js');

// Handlebars connect
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
app.engine('.hbs', engine({extname: ".hbs"}));  

app.set('view engine', '.hbs');                
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

/*
    Routing
*/

//  ----- Get Routes

// Get Movies Table
app.get('/', function(req, res){   
    let query1;
    if (req.query.search !== undefined) {
        // If a search is performed select for Movies with a similar title
        query1 = `SELECT movieID, title,  CONCAT('$', FORMAT(grossRevenue, 0)) as grossRevenue, 
        CONCAT('$', FORMAT(productionCost, 0)) as productionCost, directorID, DATE_FORMAT(releaseDate, '%M %e %Y') as releaseDate 
        FROM Movies WHERE title LIKE "${req.query.search}%";`;                    
    } else {
        // Select for all Movies
        query1 = `SELECT movieID, title, CONCAT('$', FORMAT(grossRevenue, 0)) as grossRevenue, 
        CONCAT('$', FORMAT(productionCost, 0)) as productionCost, directorID, DATE_FORMAT(releaseDate, '%M %e %Y') as releaseDate FROM Movies;`;
    }
    let query2 = `SELECT * FROM Directors;`;
    db.pool.query(query1, function(error, rows, fields){
        // Get Movies
        let movie = rows;
        db.pool.query(query2, function(error, rows, fields){
            // Get Directors
            let directors = rows;
            
            // Map DirectorID to Director Name for better UI 
            let directormap = {}
            directors.map(director => {
                let id = parseInt(director.directorID, 10);
    
                directormap[id] = director["name"];
            })

            movie = movie.map(movie => {
                return Object.assign(movie, {directorID: directormap[movie.directorID]})
            })
            res.render('index', {data: movie, directors: directors}); 
        })
    })
});

// Get Actors Table
app.get('/actors.hbs', function(req, res){
    let query1;
    if (req.query.search !== undefined) {
        // If a search is performed select for Actors with a similar name
        query1 = `SELECT actorID, name, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate, gender, movieCount FROM Actors WHERE name LIKE "${req.query.search}%";`;                    
    } else {
        // Select for all Actors
        query1 = `SELECT actorID, name, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate, gender, movieCount FROM Actors ORDER by name ASC;`;
    }
    db.pool.query(query1, function(error, rows, fields){
        let actor = rows;
            res.render('actors', {data: actor}); 
        })
});

// Get Genres Table
app.get('/genres.hbs', function(req, res){
        let query1;
        if (req.query.search !== undefined) {
            // If a search is performed select for Generes with a similar name
            query1 = `SELECT * FROM Genres WHERE name LIKE "${req.query.search}%";`; 
        } else {
            // Select for all Genres
            query1 = `SELECT * FROM Genres ORDER BY name ASC;`;
        }
        db.pool.query(query1, function(error, rows, fields){
            res.render('genres', {data: rows}); 
        })
});

// Get Directors Table
app.get('/directors.hbs', function(req, res){
    let query1;
    if (req.query.search !== undefined) {
        // If a search is performed select for Directors with a similar name
        query1 = `SELECT directorID, name, gender, movieCount, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate FROM Directors WHERE name LIKE "${req.query.search}%";`; 
    } else {
        // Select for all Directors
        query1 = `SELECT directorID, name, gender, movieCount, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate FROM Directors ORDER BY name ASC;`;
    }
    db.pool.query(query1, function(error, rows, fields){
        res.render('directors', {data: rows}); 
    })
});

// Get Movies_Actors Table
app.get('/movies_actors.hbs', function(req, res) {
    let query1;
    if (req.query.search !== undefined) {
        // If a search is performed select for Movies_Actors relationship with a similar character name
        query1 = `SELECT * FROM Movies_Actors WHERE characterName LIKE "${req.query.search}%";`;
    } else {
        // Select for all Movies_Actors
        query1 = `SELECT * FROM Movies_Actors ORDER BY movieID ASC;`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        // Get/Select Movies_Actors
        if (error) {
            // Error Handling
            console.error(error);
            return;
        }
    
        let movie_actor = rows;

        let query2 = `SELECT * FROM Movies;`;
        let query3 = `SELECT * FROM Actors;`;
      
        db.pool.query(query2, function(error, rows, fields) {
            // Get/Select Movies
            if (error) {
                // Error Handling
                console.error(error);
                return;
            }
    
            let movies = rows;
            // Map MovieID to Movie title for better UI 
            let moviemap = {};
            movies.forEach(movie => {
                let id = parseInt(movie.movieID, 10);
                moviemap[id] = movie["title"];
            });
    
            db.pool.query(query3, function(error, rows, fields) {
                // Get/Select Directors
                if (error) {
                    // Error Handling
                    console.error(error);
                    return;
                }
    
                let actors = rows;
                // Map actorID to Actor name for better UI 
                let actormap = {};
                actors.forEach(actor => {
                    let id = parseInt(actor.actorID, 10);
                    actormap[id] = actor["name"];
                });
    
                let appendedData = movie_actor.map(item => {
                    return {
                        ...item,
                        title: moviemap[item.movieID],
                        name: actormap[item.actorID]
                    };
                });
    
                res.render('movies_actors', {
                    data: appendedData,
                    movies: movies,
                    actors: actors
                });
            });
        });
    });
});

// Get Movies_Genres Table
app.get('/movies_genres.hbs', function(req, res) {
    let query1;
    if (req.query.search !== undefined && req.query.search !== "") {
        // If a search is performed, Select for all Movies_Genres where Genre name is similar to input
        query1 = `SELECT * FROM Movies_Genres 
                  INNER JOIN Genres ON Movies_Genres.genreID = Genres.genreID 
                  WHERE Genres.name LIKE '%${req.query.search}%';`;
    } else {
        // Select for all Movies_Genres
        query1 = `SELECT * FROM Movies_Genres ORDER BY movieID ASC;`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        // Get/Select Movies_Genre
        if (error) {
            // Error Handling
            console.error(error);
            return;
        }

        let movie_genre = rows;

        let query2 = "SELECT * FROM Movies;";
        let query3 = "SELECT * FROM Genres;";

        db.pool.query(query2, function(error, rows, fields) {
            // Get Movies
            if (error) {
                // Error Handling
                console.error(error);
                return;
            }

            let movies = rows;
            // Map movieID to Movie title for better UI 
            let moviemap = {};
            movies.forEach(movie => {
                let id = parseInt(movie.movieID, 10);
                moviemap[id] = movie["title"];
            });

            db.pool.query(query3, function(error, rows, fields) {
                // Get Genres
                if (error) {
                    // Error Handling
                    console.error(error);
                    return;
                }

                let genres = rows;
                // Map genreID to Genre name for better UI 
                let genremap = {};
                genres.forEach(genre => {
                    let id = parseInt(genre.genreID, 10);
                    genremap[id] = genre["name"];
                });

                appendedData = movie_genre.map(item => {
                    return {
                        ...item,
                        genreName: genremap[item.genreID],
                        title: moviemap[item.movieID]
                    };
                });
                // Render results
                res.render('movies_genres', {
                    data: appendedData,
                    movies: movies,
                    genres: genres
                });
            });
        });
    });
});


// ----- POST Routes

// Add new Movie
app.post('/add-movie-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Capture NULL values
    let director = parseInt(data.directorID);
    if (isNaN(director)) {
        director = 'NULL'
    } 

    // Insert into Movies query
    query1 = `INSERT INTO Movies (title, productionCost, grossRevenue, releaseDate, directorID) VALUES ('${data.title}', '${data.productionCost}', '${data.grossRevenue}', '${data.releaseDate}', ${director})`;

    db.pool.query(query1, function(error, rows, fields){
        // Run insert Movie query
        if (error) {
            // Error handling
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * 
            query2 = `SELECT * FROM Movies;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    // Second query error handling
                     console.log(error);
                     res.sendStatus(400);
                 }
                 else
                 {
                    // Send results barring errors
                     res.send(rows);
4                 }
             })
         }
     })
});
 

// Add new Director
app.post('/add-director-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Insert into Directors query
    query1 = `INSERT INTO Directors (name, birthdate, gender, movieCount) VALUES ('${data.name}', '${data.birthdate}', '${data.gender}', '${data.movieCount}')`;

    // Director select query
    query2 = `SELECT * FROM Directors;`;

    db.pool.query(query1, function(error, rows, fields){
        // Run Insert query
        if (error) {
            // Error handling
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // Show all from Directors if no error
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    // Second query error handling
                     console.log(error);
                     res.sendStatus(400);
                 }
                 else
                 {
                    // Send results barring errors
                     res.send(rows);
                 }
             })
         }
     })
});

// Add new Genre
app.post('/add-genre-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Insert new Genre query
    query1 = `INSERT INTO Genres (name) VALUES ('${data.name}')`;

    // Select all genre query
    query2 = `SELECT * FROM Genres;`;

    db.pool.query(query1, function(error, rows, fields){
        // Run insert genre query
        if (error) {
            // Error handling
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // Run select all Generes query if there were no error 
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    // Error handling
                     console.log(error);
                     res.sendStatus(400);
                 }
                 else
                 {
                    // Send results barring errors
                     res.send(rows);
                 }
             })
         }
     })
});

// Add new Actor
app.post('/add-actor-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Insert new Actor query
    query1 = `INSERT INTO Actors (name, birthdate, gender, movieCount) VALUES ('${data.name}', '${data.birthdate}', '${data.gender}', '${data.movieCount}')`;

    // Select all actors query
    query2 = `SELECT * FROM Actors;`;

    db.pool.query(query1, function(error, rows, fields){
        // Run insert new Actor query
        if (error) {
            // Error handling
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // Run select all Actors query
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                     // Error handling
                     console.log(error);
                     res.sendStatus(400);
                 }
                 else
                 {
                    // Send results barring errors
                     res.send(rows);
                 }
             })
         }
     })
});

// Add new Movie Actor relationship
app.post('/add-movie_actor-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Insert new Movie_Actors query
    query1 = `INSERT INTO Movies_Actors (movieID, actorID, characterName) VALUES ('${data.movieID}', '${data.actorID}', '${data.characterName}')`;

    db.pool.query(query1, function(error, rows, fields){
        // Run insert into Movies_Actors query
        if (error) {
            // Error handling
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // Select all from Movie_Actors query
            query2 = `SELECT movieID, actorID, characterName FROM Movies_Actors;`;
            db.pool.query(query2, function(error, rows, fields){
                // Run select Movies_Actors query
                if (error) {
                    // Error handling
                     console.log(error);
                     res.sendStatus(400);
                 }
                 else
                 {
                    // Send results barring errors
                     res.send(rows);
                 }
             })
         }
     })
});


// Add new Movie Genre relationship
app.post('/add-movie_genre-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Insert new Movies_Genres query
    query1 = `INSERT INTO Movies_Genres (movieID, genreID) VALUES ('${data.movieID}', '${data.genreID}')`;

    db.pool.query(query1, function(error, rows, fields){
        // Run insert Movies_Genres query
        if (error) {
            // Error handling
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // Select all from Movies_Genres query
            query2 = `SELECT movieID, genreID FROM Movies_Genres;`;

            db.pool.query(query2, function(error, rows, fields){
                // Run select all Movies_Genres query
                if (error) {
                    // Error handling
                     console.log(error);
                     res.sendStatus(400);
                 }
                 else
                 {
                    // Send results barring errors
                     res.send(rows);
                 }
             })
         }
     })
});

// ----- Delete Routes

// Delete a Movie
app.delete('/delete-movie-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let movieID = parseInt(data.movieID);

    // Delete from Movies query
    let deleteMovie =  `DELETE FROM Movies WHERE movieID = ${movieID};`;
  
    db.pool.query(deleteMovie, function(error, rows, fields){
        // Run delete movie query
        if (error) {
            // Error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            // Send results barring errors
            res.sendStatus(204);
        }
})});

// Delete a Director
app.delete('/delete-director-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let directorID = parseInt(data.directorID);

    // Delete from Directors query
    let deleteDirector =  `DELETE FROM Directors WHERE directorID = ${directorID};`;
  
    db.pool.query(deleteDirector, function(error, rows, fields){
        // Run delete director query
        if (error) {
            // Error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            // Send results barring errors
            res.sendStatus(204);
        }
            
})});

// Delete a Genre
app.delete('/delete-genre-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let genreID = parseInt(data.genreID);

    // Delete from Genres query
    let deleteGenre =  `DELETE FROM Genres WHERE genreID = ${genreID};`;
  
    db.pool.query(deleteGenre, function(error, rows, fields){
        // Run delete Genre query
        if (error) {
            // Error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            // Send results barring errors
            res.sendStatus(204);
        }
            
})});

// Delete an Actor
app.delete('/delete-actor-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let actorID = parseInt(data.actorID);

    // Delete from Actors query
    let deleteActor =  `DELETE FROM Actors WHERE actorID = ${actorID};`;
  
    db.pool.query(deleteActor, function(error, rows, fields){
        // Run delete Actors query
        if (error) {
            // Error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            // Send results barring error
            res.sendStatus(204);
        }
            
})});


// Delete a Movie and Actor relationship
app.delete('/delete-movie_actor-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let movieID = parseInt(data.movieID);
    let actorID = parseInt(data.actorID);

    // Delete from Movies_Actor query
    let deleteMovieActor =  `DELETE FROM Movies_Actors WHERE actorID = ${actorID} AND movieID = ${movieID} AND characterName = '${data.characterName}';`;
   
    db.pool.query(deleteMovieActor, function(error, rows, fields){
        // Run delete movie actor query
        if (error) {
            // error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            // send results barring error
            res.sendStatus(204);
        }
            
})});

// Delete a Movie and Genre relationship
app.delete('/delete-movie_genre-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let movieID = parseInt(data.movieID);
    let genreID = parseInt(data.genreID);

    // Delete from Movies_Genres query
    let deleteMovieGenre =  `DELETE FROM Movies_Genres WHERE genreID = ${genreID} AND movieID = ${movieID};`;
   
    db.pool.query(deleteMovieGenre, function(error, rows, fields){
        // Run delete Movies_Genres query
        if (error) {
            // error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            // send results barring errors
            res.sendStatus(204);
        }
            
})});


// ----- Update/Put Routes

// Update Movie Director
app.put('/put-movie-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let directorID = parseInt(data.directorID);
    let movieID = parseInt(data.movieID);

    // Null value handling
    if (isNaN(directorID)) {
        directorID = 'NULL'
    } 

    // Update Movies query
    let updateMovie = `UPDATE Movies SET directorID = ${directorID} WHERE movieID = ${movieID};`;

    // Select Director query
    let getDirector = `SELECT * FROM Directors WHERE directorID = ${directorID};`;
  
    db.pool.query(updateMovie, function(error, rows, fields){
        // Run Movie update query
        if (error) {
            // Error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(getDirector,function(error, rows, fields) {
                // Run director select query
                if (error) {
                    //error handling
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // send results barring errors
                    res.send(rows);
                }
            })
        }
    })
});

// Update Director Movie Count
app.put('/put-director-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let directorID = parseInt(data.directorID);
    let movieCount = parseInt(data.movieCount);
  
    // Update Director query
    let updateDirector = `UPDATE Directors SET movieCount = ${movieCount} WHERE directorID = ${directorID};`;

    // Get Director query
    let getDirector = `SELECT * FROM Directors WHERE directorID = ${directorID};`;
  
    db.pool.query(updateDirector, function(error, rows, fields){
        // Run update Director query
        if (error) {
            // Error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(getDirector,function(error, rows, fields) {
                // Run Director select query
                if (error) {
                    // Error handling
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // Send results barring errors
                    res.send(rows);
                }
            })
        }
    })
});

// Update Genre name
app.put('/put-genre-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let genreID = parseInt(data.genreID);
    let name = data.name;

    // Update Genres query
    let updateGenre = `UPDATE Genres SET name = '${name}' WHERE genreID = ${genreID};`;

    // Select for Genre query
    let getGenre = `SELECT * FROM Genres WHERE genreID = ${genreID};`;
  
    db.pool.query(updateGenre, function(error, rows, fields){
        // Run update genre query
        if (error) {
            // error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(getGenre,function(error, rows, fields) {
                // Run Genre select query
                if (error) {
                    // error handling
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // send results barring errors
                    res.send(rows);
                }
            })
        }
    })
});

// Update Actor Movie Count
app.put('/put-actor-ajax', function(req,res,next){
    // Get data and parse back to JS Object
    let data = req.body;
    let actorID = parseInt(data.actorID);
    let movieCount = parseInt(data.movieCount);
  
    // Update Actors query
    let updateActor = `UPDATE Actors SET movieCount = ${movieCount} WHERE actorID = ${actorID};`;

    // Get Actors query
    let getActor = `SELECT * FROM Actors WHERE actorID = ${actorID};`;
  
    db.pool.query(updateActor, function(error, rows, fields){
        // Run update Actor query
        if (error) {
            // Error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(getActor,function(error, rows, fields) {
                // Run select Actor query
                if (error) {
                    // error handling
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // send results barring errors 
                    res.send(rows);
                }
            })
        }
    })
});

// Update Movie Actor's Character Name
app.put('/put-movie_actor-ajax', function(req,res,next){
    // Get data
    let data = req.body;
    
    // Update Movies_Actors query
    let updateMovieActor = `UPDATE Movies_Actors SET characterName = '${data.outputCharacterName}' WHERE actorID = ${data.actorID}  AND movieID = ${data.movieID}  AND characterName = '${data.inputCharacterName}';`;
  
    db.pool.query(updateMovieActor, function(error, rows, fields){
        // Run update Movies_Actors query
        if (error) {
            // error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }
    })
});

// Update Genre in Movie Genre relationship
app.put('/put-movie_genre-ajax', function(req,res,next){
    // Get data
    let data = req.body;
    
    // Update Movies_Genres query
    let updateMovieGenre = `UPDATE Movies_Genres SET genreID = ${data.outputGenreID} WHERE genreID = ${data.inputGenreID}  AND movieID = ${data.movieID};`;
  
    db.pool.query(updateMovieGenre, function(error, rows, fields){
        // Run update Movies_Genres query
        if (error) {
            // error handling
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});
