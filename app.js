// Citation for the following the functions on the page: 
// Date: 07-29-2023
// Adapted from: This module was adapted from the CS340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 

/*
    SETUP
*/

//
// Express
var express = require('express');   
var app     = express();            
PORT        = 7592;                 

// Database
var db = require('./database/db-connector.js');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
app.engine('.hbs', engine({extname: ".hbs"}));  

app.set('view engine', '.hbs');                
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

/*
    ROUTES
*/

/*
    GET/READS
*/
app.get('/', function(req, res){   
    let query1;
    if (req.query.search !== undefined) {
        query1 = `SELECT movieID, title,  CONCAT('$', FORMAT(grossRevenue, 0)) as grossRevenue, CONCAT('$', FORMAT(productionCost, 0)) as productionCost, directorID, DATE_FORMAT(releaseDate, '%M %e %Y') as releaseDate FROM Movies WHERE title LIKE "${req.query.search}%";`;                    
    } else {
        query1 = "SELECT movieID, title, CONCAT('$', FORMAT(grossRevenue, 0)) as grossRevenue, CONCAT('$', FORMAT(productionCost, 0)) as productionCost, directorID, DATE_FORMAT(releaseDate, '%M %e %Y') as releaseDate FROM Movies;";
    }
    let query2 = "SELECT * FROM Directors;";
    db.pool.query(query1, function(error, rows, fields){
        let movie = rows;
        db.pool.query(query2, function(error, rows, fields){
            let directors = rows;

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


app.get('/actors.hbs', function(req, res){
    let query1;
    if (req.query.search !== undefined) {
        query1 = `SELECT * FROM Actors WHERE name LIKE "${req.query.search}%";`;                    
    } else {
        query1 = "SELECT * FROM Actors ORDER by name ASC;";
    }
    db.pool.query(query1, function(error, rows, fields){
        let actor = rows;
            res.render('actors', {data: actor}); 
        })
});

app.get('/genres.hbs', function(req, res){
        let query1;
        if (req.query.search !== undefined) {
            query1 = `SELECT * FROM Genres WHERE name LIKE "${req.query.search}%";`; 
        } else {
            query1 = "SELECT * FROM Genres ORDER BY name ASC;";
        }
        db.pool.query(query1, function(error, rows, fields){
            res.render('genres', {data: rows}); 
        })
});

app.get('/directors.hbs', function(req, res){
    let query1;
    if (req.query.search !== undefined) {
        query1 = `SELECT directorID, name, gender, movieCount, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate FROM Directors WHERE name LIKE "${req.query.search}%";`; 
    } else {
        query1 = "SELECT directorID, name, gender, movieCount, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate FROM Directors ORDER BY name ASC;";
    }
    db.pool.query(query1, function(error, rows, fields){
        res.render('directors', {data: rows}); 
    })
});

app.get('/movies_actors.hbs', function(req, res) {
    let query1;
    if (req.query.search !== undefined) {
        query1 = `SELECT * FROM Movies_Actors WHERE characterName LIKE "${req.query.search}%";`;
    } else {
        query1 = "SELECT * FROM Movies_Actors ORDER BY movieID ASC;";
    }

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error(error);
            return;
        }

        let movie_actor = rows;

        let query2 = "SELECT * FROM Movies;";
        let query3 = "SELECT * FROM Actors;";

        db.pool.query(query2, function(error, rows, fields) {
            if (error) {
                console.error(error);
                return;
            }

            let movies = rows;

            let moviemap = {};
            movies.forEach(movie => {
                let id = parseInt(movie.movieID, 10);
                moviemap[id] = movie["title"];
            });

            db.pool.query(query3, function(error, rows, fields) {
                if (error) {
                    console.error(error);
                    return;
                }

                let actors = rows;

                let actormap = {};
                actors.forEach(actor => {
                    let id = parseInt(actor.actorID, 10);
                    actormap[id] = actor["name"];
                });

                movie_actor = movie_actor.map(movie_actor => {
                    return Object.assign(
                        movie_actor,
                        { title: moviemap[movie_actor.movieID] },
                        { name: actormap[movie_actor.actorID] }
                    );
                });

                res.render('movies_actors', {
                    data: movie_actor,
                    movies: movies,
                    actors: actors
                });
            });
        });
    });
});

app.get('/movies_genres.hbs', function(req, res) {
    let query1;
    if (req.query.search !== undefined && req.query.search !== "") {
        query1 = `SELECT * FROM Movies_Genres WHERE genreID = ${req.query.search};`;
    } else {
        query1 = "SELECT * FROM Movies_Genres ORDER BY movieID ASC;";
    }

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error(error);
            return;
        }

        let movie_genre = rows;

        let query2 = "SELECT * FROM Movies;";
        let query3 = "SELECT * FROM Genres;";

        db.pool.query(query2, function(error, rows, fields) {
            if (error) {
                console.error(error);
                return;
            }

            let movies = rows;

            let moviemap = {};
            movies.forEach(movie => {
                let id = parseInt(movie.movieID, 10);
                moviemap[id] = movie["title"];
            });

            db.pool.query(query3, function(error, rows, fields) {
                if (error) {
                    console.error(error);
                    return;
                }

                let genres = rows;

                let genremap = {};
                genres.forEach(genre => {
                    let id = parseInt(genre.genreID, 10);
                    genremap[id] = genre["name"];
                });

                movie_genre = movie_genre.map(movie_genre => {
                    return Object.assign(
                        movie_genre,
                        { title: moviemap[movie_genre.movieID] },
                        { name: genremap[movie_genre.genreID] }
                    );
                });

                res.render('movies_genres', {
                    data: movie_genre,
                    movies: movies,
                    genres: genres
                });
            });
        });
    });
});

/*
    POST/CREATES
*/
app.post('/add-movie-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let director = parseInt(data.directorID);
    if (isNaN(director))
    {
        director = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Movies (title, productionCost, grossRevenue, releaseDate, directorID) VALUES ('${data.title}', '${data.productionCost}', '${data.grossRevenue}', '${data.releaseDate}', ${director})`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT title, productionCost, grossRevenue, releaseDate, directorID FROM Movies;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                     // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                     console.log(error);
                     res.sendStatus(400);
                 }
                 // If all went well, send the results of the query back.
                 else
                 {
                     res.send(rows);
                 }
             })
         }
     })
});


app.post('/add-director-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Directors (name, birthdate, gender, movieCount) VALUES ('${data.name}', '${data.birthdate}', '${data.gender}', '${data.movieCount}')`;
    query2 = `SELECT * FROM Directors;`;

    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // Show all from Directors if there is no error
            db.pool.query(query2, function(error, rows, fields){
                // If there was an error on the second query, send a 400
                if (error) {
                     // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                     console.log(error);
                     res.sendStatus(400);
                 }
                 // If all went well, send the results of the query back.
                 else
                 {
                     res.send(rows);
                 }
             })
         }
     })
});

app.post('/add-genre-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Genres (name) VALUES ('${data.name}')`;
    query2 = `SELECT * FROM Genres;`;

    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                     // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                     console.log(error);
                     res.sendStatus(400);
                 }
                 // If all went well, send the results of the query back.
                 else
                 {
                     res.send(rows);
                 }
             })
         }
     })
});


app.post('/add-actor-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Actors (name, birthdate, gender, movieCount) VALUES ('${data.name}', '${data.birthdate}', '${data.gender}', '${data.movieCount}')`;
    query2 = `SELECT * FROM Actors;`;

    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                     // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                     console.log(error);
                     res.sendStatus(400);
                 }
                 // If all went well, send the results of the query back.
                 else
                 {
                     res.send(rows);
                 }
             })
         }
     })
});

app.post('/add-movie_actor-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Movies_Actors (movieID, actorID, characterName) VALUES ('${data.movieID}', '${data.actorID}', '${data.characterName}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT movieID, actorID, characterName FROM Movies_Actors;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                     // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                     console.log(error);
                     res.sendStatus(400);
                 }
                 // If all went well, send the results of the query back.
                 else
                 {
                     res.send(rows);
                 }
             })
         }
     })
});


app.post('/add-movie_genre-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Movies_Genres (movieID, genreID) VALUES ('${data.movieID}', '${data.genreID}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT movieID, genreID FROM Movies_Genres;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                     // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                     console.log(error);
                     res.sendStatus(400);
                 }
                 // If all went well, send the results of the query back.
                 else
                 {
                     res.send(rows);
                 }
             })
         }
     })
});

 /*
    DELETES
*/

app.delete('/delete-movie-ajax', function(req,res,next){
    let data = req.body;
    let movieID = parseInt(data.movieID);
    let deleteMovie =  `DELETE FROM Movies WHERE movieID = ${movieID};`;
  
    db.pool.query(deleteMovie, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
            
})});

app.delete('/delete-director-ajax', function(req,res,next){
    let data = req.body;
    let directorID = parseInt(data.directorID);
    let deleteDirector =  `DELETE FROM Directors WHERE directorID = ${directorID};`;
  
    db.pool.query(deleteDirector, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
            
})});

app.delete('/delete-genre-ajax', function(req,res,next){
    let data = req.body;
    let genreID = parseInt(data.genreID);
    let deleteGenre =  `DELETE FROM Genres WHERE genreID = ${genreID};`;
  
    db.pool.query(deleteGenre, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
            
})});

app.delete('/delete-actor-ajax', function(req,res,next){
    let data = req.body;
    let actorID = parseInt(data.actorID);
    let deleteActor =  `DELETE FROM Actors WHERE actorID = ${actorID};`;
  
    db.pool.query(deleteActor, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
            
})});

app.delete('/delete-movie_actor-ajax', function(req,res,next){
    let data = req.body;
    let movieID = parseInt(data.movieID);
    let actorID = parseInt(data.actorID);

    let deleteMovieActor =  `DELETE FROM Movies_Actors WHERE actorID = ${actorID} AND movieID = ${movieID} AND characterName = '${data.characterName}';`;
   
    db.pool.query(deleteMovieActor, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
            
})});

app.delete('/delete-movie_genre-ajax', function(req,res,next){
    let data = req.body;
    let movieID = parseInt(data.movieID);
    let genreID = parseInt(data.genreID);

    let deleteMovieGenre =  `DELETE FROM Movies_Genres WHERE genreID = ${genreID} AND movieID = ${movieID};`;
   
    db.pool.query(deleteMovieGenre, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
            
})});


/*
    UPDATES
*/

app.put('/put-movie-ajax', function(req,res,next){
    let data = req.body; 
    let movieID = parseInt(data.movie);
    let category = parseData(data.category);
    let input = parseDate(data.select);

    let updateMovie =  `UPDATE Movies
                        WHERE movieID = ${movieID}
                        SET ${category} = ${input};`;

    if (category == 'director') {
        let updateDirector = `SELECT * FROM Directors WHERE name = ${input};`;
        db.pool.query(updateMovie, function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            } else {
                db.pool.query(updateDirector, function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
        })
    } else { 
        db.pool.query(updateMovie, function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            } else {
                res.send(rows);
            }
        })   
    }
           
});

app.put('/put-director-ajax', function(req,res,next){
    let data = req.body;
  
    let directorID = parseInt(data.directorID);
    let movieCount = parseInt(data.movieCount);
  
    let updateDirector = `UPDATE Directors SET movieCount = ${movieCount} WHERE directorID = ${directorID};`;
    let getDirector = `SELECT * FROM Directors WHERE directorID = ${directorID};`;
  
    // Run the 1st query
    db.pool.query(updateDirector, function(error, rows, fields){
        if (error) {
            // Bad Request
            console.log(error);
            res.sendStatus(400);
        } else {
                // Run the second query
            db.pool.query(getDirector,function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/put-genre-ajax', function(req,res,next){
    let data = req.body;
  
    let genreID = parseInt(data.genreID);
    let name = data.name;
    let updateGenre = `UPDATE Genres SET name = '${name}' WHERE genreID = ${genreID};`;
    let getGenre = `SELECT * FROM Genres WHERE genreID = ${genreID};`;
  
    // Run the 1st query
    db.pool.query(updateGenre, function(error, rows, fields){
        if (error) {
            // Bad Request
            console.log(error);
            res.sendStatus(400);
        } else {
                // Run the second query
            db.pool.query(getGenre,function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/put-actor-ajax', function(req,res,next){
    let data = req.body;
  
    let actorID = parseInt(data.actorID);
    let movieCount = parseInt(data.movieCount);
  
    let updateActor = `UPDATE Actors SET movieCount = ${movieCount} WHERE actorID = ${actorID};`;
    let getActor = `SELECT * FROM Actors WHERE actorID = ${actorID};`;
  
    // Run the 1st query
    db.pool.query(updateActor, function(error, rows, fields){
        if (error) {
            // Bad Request
            console.log(error);
            res.sendStatus(400);
        } else {
                // Run the second query
            db.pool.query(getActor,function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/put-movie_actor-ajax', function(req,res,next){
    let data = req.body;
  
    let updateMovieActor = `UPDATE Movies_Actors SET characterName = '${data.outputCharacterName}' WHERE actorID = ${data.actorID}  AND movieID = ${data.movieID}  AND characterName = '${data.inputCharacterName}';`;
  
    // Run the 1st query
    db.pool.query(updateMovieActor, function(error, rows, fields){
        if (error) {
            // Bad Request
            console.log(error);
            res.sendStatus(400);
        }
    })
});

app.put('/put-movie_genre-ajax', function(req,res,next){
    let data = req.body;
  
    let updateMovieGenre = `UPDATE Movies_Genres SET genreID = ${data.outputGenreID} WHERE genreID = ${data.inputGenreID}  AND movieID = ${data.movieID};`;
  
    // Run the 1st query
    db.pool.query(updateMovieGenre, function(error, rows, fields){
        if (error) {
            // Bad Request
            console.log(error);
            res.sendStatus(400);
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});
