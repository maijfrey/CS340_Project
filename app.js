/*
    SETUP
*/

//
// Express
var express = require('express');   
var app     = express();            
PORT        = 6100;                 

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
        query1 = `SELECT movieID, title, grossRevenue, productionCost, directorID, DATE_FORMAT(releaseDate, '%M %e %Y') as releaseDate FROM Movies WHERE title LIKE "${req.query.search}%";`;                    
    } else {
        query1 = "SELECT movieID, title, grossRevenue, productionCost, directorID, DATE_FORMAT(releaseDate, '%M %e %Y') as releaseDate FROM Movies;";
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
        let query1 = "SELECT * FROM Actors ORDER BY name ASC;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('actors', {data: rows}); 
        })
});

app.get('/genres.hbs', function(req, res){
        let query1 = "SELECT * FROM Genres ORDER BY name ASC;";
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

app.get('/movies_actors.hbs', function(req, res){
        let query1 = "SELECT * FROM Movies_Actors;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('movies_actors', {data: rows}); 
        })
});

app.get('/movies_genres.hbs', function(req, res){
        let query1 = "SELECT * FROM Movies_Genres;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('movies_genres', {data: rows}); 
        })
});

/*
    POST/CREATES
*/
app.post('/add-movie-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Capture NULL values
    let director = parseInt(data.directorID);
    
    if (isNaN(director)) {
        director = 'NULL'
    } 

    console.log("after")
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
            // If there was no error, perform a SELECT * 
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
4                 }
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

/*
    UPDATES
*/
app.put('/put-movie-ajax', function(req,res,next){
    let data = req.body;
  
    let directorID = parseInt(data.directorID);
    let movieID = parseInt(data.movieID);
  
    let updateMovie = `UPDATE Movies SET directorID = ${directorID} WHERE movieID = ${movieID};`;
    let getDirector = `SELECT * FROM Directors WHERE directorID = ${directorID};`;
  
    // Run the 1st query
    db.pool.query(updateMovie, function(error, rows, fields){
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


/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});
