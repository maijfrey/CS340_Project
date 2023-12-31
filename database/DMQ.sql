-- Title: Movie Information Database Data Manipulations
-- Assignment: Project Step 3 Draft
-- Authors: Mai Frey and Ayra Sears


/*
!!!!!!!!!!!! QUERYS WE USED IN OUR PROJECT!!!!!!!!!!!!!!
*/

-- 				   ******Select Commands******

--                        Movies Selects

-- Select all from Movies with formatting
SELECT movieID, title, CONCAT('$', FORMAT(grossRevenue, 0)) as grossRevenue, 
CONCAT('$', FORMAT(productionCost, 0)) as productionCost, directorID, DATE_FORMAT(releaseDate, '%M %e %Y') as releaseDate 
FROM Movies;

-- Select all from Movies without formatting
SELECT * FROM Movies;


--                        Directors Selects
-- Select all from Directors
SELECT * FROM Directors;

-- Select Directors where input directorID
SELECT * FROM Directors WHERE directorID = :directorIDInput;

-- Select all from Directors by Ascending Name
SELECT directorID, name, gender, movieCount, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate 
FROM Directors ORDER BY name ASC;


--                        Actors Selects
-- Select all from Actors by Ascending Name
SELECT actorID, name, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate, gender, movieCount 
FROM Actors ORDER by name ASC;

-- Select all from Actors without formatting
SELECT * FROM Actors;


--                        Genres Selects
-- Select all from Genres by Ascending Name
SELECT * FROM Genres ORDER BY name ASC;

-- Select all from Genres
SELECT * FROM Genres;

-- Select all from Genres by genreID
SELECT * FROM Genres WHERE genreID = genreIDInput;


--                        Movies_Actors Selects
-- Select all from Movies_Actors by Ascending Name
SELECT * FROM Movies_Actors ORDER BY movieID ASC;

--                        Movies_Genres Selects
-- Select all from Movies_Genres by Ascending Name
SELECT * FROM Movies_Genres ORDER BY movieID ASC;




-- 			       ******SEARCH COMMANDS******

--                        Movies Search
-- Select Movie by Title 
SELECT movieID, title,  CONCAT('$', FORMAT(grossRevenue, 0)) as grossRevenue, 
CONCAT('$', FORMAT(productionCost, 0)) as productionCost, directorID, DATE_FORMAT(releaseDate, '%M %e %Y') as releaseDate 
FROM Movies WHERE title LIKE :inputTitle;  


--                        Actors Search
-- Select Actor by name
SELECT actorID, name, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate, gender, movieCount 
FROM Actors WHERE name LIKE :inputName;

--                        Genres Search
-- Select Genre by name
SELECT * FROM Genres WHERE name LIKE :inputName;


--                        Directors Search
-- Select Director by name
SELECT directorID, name, gender, movieCount, DATE_FORMAT(birthdate, '%M %e %Y') as birthdate 
FROM Directors WHERE name LIKE :inputName;


--                        Movies_Actors Search
-- Select Movies_Actors by name
SELECT * FROM Movies_Actors 
WHERE characterName LIKE :inputName;


--                        Movies_Genres Search
-- Select Movies_Genre by Genre name
SELECT * FROM Movies_Genres 
INNER JOIN Genres ON Movies_Genres.genreID = Genres.genreID 
WHERE Genres.name LIKE :inputGenre;


-- 					******INSERT COMMANDS******

--                        Movies Inserts
INSERT INTO Movies (title, productionCost, grossRevenue, releaseDate, directorID) 
VALUES (:titleInput, :productionCostInput, :grossRevenueInput, :releaseDateInput, :directorIDInput);


--                          Actors INSERTS
INSERT INTO Actors (`name`, birthdate, gender, movieCount) 
VALUES (:nameInput, :birthdateInput, :genderInput, :movieCountInput);


--                          Directors INSERTS
INSERT INTO Directors (`name`, birthdate, gender, movieCount) 
VALUES (:nameInput, :birthdateInput, :genderInput, :movieCountInput);


--                          Genres INSERTS
INSERT INTO Genres (`name`)
VALUES (:nameInput);


--                          Movies_Actors INSERTS
INSERT INTO Movies_Actors (movieID, actorID, characterName) 
VALUES (:movieIDInput, :actorIDInput, :characterNameInput);


--                          Movies_Genres INSERTS

INSERT INTO Movies_Genres (movieID, genreID) 
VALUES (:movieIDInput, :genreIDInput);


-- 					******DELETE COMMANDS******


--                        Movies Deletes
DELETE FROM Movies WHERE movieID = :movieIDInput;

--                        Directors Deletes
DELETE FROM Directors WHERE directorID = :directorIDInput;

--                        Genres Deletes
DELETE FROM Genres WHERE genreID = :genreIDInput;

--                        Actors Deletes
DELETE FROM Actors WHERE actorID = :actorIDInput

--                        Movies_Actors Deletes
DELETE FROM Movies_Actors 
WHERE actorID = :actorIDInput AND movieID = :movieIDInput AND characterName = :characterNameInput

--                        Movies_Genres Deletes
DELETE FROM Movies_Genres WHERE genreID = :genreIDInput AND movieID = :movieIDInput;


-- 					******UPDATE COMMANDS******


--                        Movies Updates
-- Update directorID in Movies
UPDATE Movies 
SET directorID = :directorIDInput
WHERE movieID = :movieIDInput;

--                        Directors Updates
-- Update Movie Count in Directors
UPDATE Directors 
SET movieCount = :movieCountInput 
WHERE directorID = :directorIDInput;

--                        Genres Updates
-- Update name in Genres
UPDATE Genres 
SET name = :nameInput
WHERE genreID = :genreIDInput;

--                        Actors Updates
-- Update movie count in Actors
UPDATE Actors 
SET movieCount = :movieCountInput
WHERE actorID = :actorIDInput;

--                        Movies_Actors Updates
-- Update character name in Movies_Actors
UPDATE Movies_Actors 
SET characterName = :characterNameInput
WHERE actorID = :actorIDInput  AND movieID = :movieIDInput  AND characterName = :characterNameInput;

--                        Movies_Genres Updates
-- Update Genre ID in Movies_Genres
UPDATE Movies_Genres 
SET genreID = :genreIDInput 
WHERE genreID = :genreIDInput  AND movieID = :movieIDInput;




/*
!!!!!!!!!!!! BELOW ARE QUERYS WE CREATED PREVIOUSLY THAT ENDED UP NOT BEING USED !!!!!!!!!!!!!!
*/
-- 						  Select Commands

--                        MOVIE Selects

--Select by Title Desc:
SELECT title, releaseDate, grossRevenue FROM Movies
ORDER BY title Desc;

--Select by Title Asc:
SELECT title, releaseDate, grossRevenue FROM Movies
ORDER BY name Asc;

--Select by Release Date Desc:
SELECT releaseDate, title, grossRevenue FROM Movies
ORDER BY releaseDate Desc;

--Select by Release Date Desc:
SELECT releaseDate, title, grossRevenue FROM Movies
ORDER BY releaseDate Asc;

--Select by gross Revenue Desc:
SELECT grossRevenue, title, releaseDate FROM Movies
ORDER BY grossRevenue Desc;

--Select by gross Revenue Asc:
SELECT grossRevenue, title, releaseDate FROM Movies
ORDER BY grossRevenue Asc;

--                        ACTOR Selects

--Select by name Desc:
SELECT title, movieCount, birthdate, gender FROM Actors
ORDER BY name Desc;

--Select by Movie Count Desc:
SELECT movieCount, name, birthdate, gender FROM Actors
ORDER BY movieCount Desc;

--Select by Movie Count Asc:
SELECT movieCount, name, birthdate, gender FROM Actors
ORDER BY movieCount Asc;

--Select by birthdate Desc:
SELECT birthdate, name, movieCount, gender  FROM Actors
ORDER BY birthdate Desc;

--Select by birthdate Asc:
SELECT birthdate, name, movieCount, gender FROM Actors
ORDER BY birthdate Asc;

--                        DIRECTOR Selects

--Select by name Desc:
SELECT name, movieCount, birthdate, gender FROM Directors
ORDER BY name Desc;

--Select by Movie Count Desc:
SELECT movieCount, name, birthdate, gender FROM Directors
ORDER BY movieCount Desc;

--Select by Movie Count Asc:
SELECT movieCount, name, birthdate, gender FROM Directors
ORDER BY movieCount Asc;

--Select by birthdate Desc:
SELECT birthdate, name, movieCount, gender  FROM Directors
ORDER BY birthdate Desc;

--Select by birthdate Asc:
SELECT birthdate, name, movieCount, gender FROM Directors
ORDER BY birthdate Asc;

--                        Movie_Genres Selects
SELECT m.title, g.name
FROM Movies_Genres mg
JOIN Movies m ON mg.movieID = m.movieID
JOIN Genres g ON mg.genreID = g.genreID;


--                        Movie_Actors Selects
SELECT m.title, a.name
FROM Movies_Actors ma
JOIN Movies m ON ma.movieID = m.movieID
JOIN Actors a ON ma.actorID = a.actorID;

--                            SEARCHES


-- 							MOVIE SEARCHES

-- Search Movies by Genre Name
SELECT title, releaseDate, grossRevenue FROM Movies
INNER JOIN Movies_Genres on Movies.movieID = Movies_Genres.movieID
INNER JOIN Genres on Movies_Genres.genreID = Genres.genreID
WHERE Genres.name = :inputName
ORDER BY name Desc;

-- Search Movies by Director Name
SELECT title, releaseDate, grossRevenue FROM Movies
INNER JOIN Directors on Directors.directorID = Movies.directorID
WHERE Directors.name LIKE :inputID;
ORDER by name Desc;

-- Search Movies by Name
SELECT title, releaseDate, grossRevenue FROM Movies
WHERE Movies.name LIKE :inputName
ORDER by name Desc;

-- Search Movie by Actor
SELECT title, releaseDate, grossRevenue FROM Movies
INNER JOIN Movies_Actors on Movies.movieID = Movies_Actors.movieID
INNER JOIN Actors on Movies_Actors.actorID = Actors.actorID
WHERE Actors.name LIKE :inputName
ORDER BY name Desc;

-- Search Movie by Character Name
SELECT title, releaseDate, grossRevenue FROM Movies
INNER JOIN Movies_Actors on Movies.movieID = Movies_Actors.movieID
WHERE Movies_Actors.characterName LIKE :inputName
ORDER BY name Desc;

-- 							Actor SEARCHES

-- Search Actor Name by containing phrase
SELECT name, movieCount, birthdate, gender FROM Actors
WHERE Actors.name LIKE :inputPhrase
ORDER By movieCount Desc;

-- Search Actor by Character Name
SELECT name, movieCount, birthdate, gender FROM Actors
INNER JOIN Movies_Actors on Actors.actorID = Movies_Actors.actorID
WHERE Movies_Actors.characterName LIKE :inputName
ORDER BY movieCount Desc;

-- Search Actor by Movie Name
SELECT name, movieCount, birthdate, gender FROM Actors
INNER JOIN Movies_Actors on Actors.actorID = Movies_Actors.actorID
INNER JOIN Movies on Movies_Actors.movieID = Movies.movieID
WHERE Movies.name LIKE :inputName
ORDER BY movieCount Desc;

-- 							Director SEARCHES

-- Search Director Name by containing phrase
SELECT name, movieCount, birthdate, gender FROM Directors
WHERE Director.name LIKE :inputPhrase
ORDER By movieCount Desc;

-- Search Director by Movie Name
SELECT name, movieCount, birthdate, gender FROM Directors
INNER JOIN Movies on Movies.directorID = Directors.directorID
WHERE Movies.name LIKE :inputName
ORDER BY movieCount Desc;

-- 							Genre SEARCHES

SELECT name FROM Genres
WHERE Genres.name LIKE :inputName
ORDER by name Desc;


--                             INSERTS



--                          Movie INSERTS
INSERT INTO Movies (title, productionCost, grossRevenue, releaseDate, directorID)
VALUES (:titleInput, :productionCostInput, :grossRevenueInput, :releaseDateInput, (SELECT directorID FROM Directors WHERE `name` = :directorInput));


--                          Movies_Actors INSERTS
INSERT INTO Movies_Actors (movieID, actorID, characterName)
VALUES ((SELECT movieID FROM Movies WHERE title = :movieInput), (SELECT actorID FROM Actors WHERE `name` = :actorInput), :characterNameInput);


--                          Movies_Genres INSERTS
INSERT INTO Movies_Genres (movieID, genreID)
VALUES ((SELECT movieID FROM Movies WHERE title = :movieInput), (SELECT genreID FROM Genres WHERE `name` = :genreInput))


--                             UPDATES



--                          Actor UPDATES

-- Update Name
UPDATE Actors
SET `name` = :replaceInput
WHERE actorID = :inputID

-- Update Birthdate
UPDATE Actors
SET birthdate = :replaceInput
WHERE actorID = :inputID

-- Update Gender
UPDATE Actors
SET gender = :replaceInput
WHERE actorID = :inputID



--                          Director UPDATES

-- Update Name
UPDATE Directors
SET `name` = :replaceInput
WHERE directorID = :inputID

-- Update Birthdate
UPDATE Directors
SET birthdate = :replaceInput
WHERE directorID = :inputID

-- Update Gender
UPDATE Directors
SET gender = :replaceInput
WHERE directorID = :inputID

--                          Movie UPDATES

-- Update Title
UPDATE Movies
SET title = :replaceInput
WHERE movieID = :inputID

-- Update Release Date
UPDATE Movies
SET releaseDate = :replaceInput
WHERE movieID = :inputID

-- Update Gross Revenue
UPDATE Movies
SET grossRevenue = :replaceInput
WHERE movieID = :inputID

-- Update Production Cost
UPDATE Movies
SET productionCost = :replaceInput
WHERE movieID = :inputID


--                          Genres UPDATES

-- Update Name
UPDATE Genres
SET `name` = :replaceInput
WHERE genreID = :inputID



