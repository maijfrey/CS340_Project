/*
    SETUP
*/

//
// Express
var express = require('express');   // Express library for the web server
var app     = express();            // Instantiate an express object to interact with the server in our code
PORT        = 6100;                 // Port Number

// Database
var db = require('./database/db-connector.js')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        let query1 = "SELECT * FROM Movies ORDER BY title Desc;";
        let query2 = "SELECT * FROM Actors";
        let query3 = "SELECT * FROM Directors";
        let query4 = "SELECT * FROM Genres";
        let query5 = "SELECT * FROM Genres";               
        db.pool.query(query1, function(error, rows, fields){ 
            res.render('index', {data: rows}); 
        })     
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
