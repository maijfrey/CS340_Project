-- Title: Movie Information Database Data Manipulations
-- Assignment: Project Step 3 Draft
-- Authors: Mai Frey and Ayra Sears
-- Due Date: 2023-07-24

-- 						  Select Commands

--                        MOVIE Selects

--Select by Title Desc:
SELECT title, releaseDate, grossRevenue FROM Movies
ORDER BY title Desc;

--Select by Title Asc:
SELECT name, releaseDate, grossRevenue FROM Movies
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
SELECT name, movieCount, birthdate, gender FROM Actors
ORDER BY name Desc;

--Select by name Asc:
SELECT name, movieCount, birthdate, gender FROM Actors
ORDER BY name Asc;

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

--Select by name Asc:
SELECT name, movieCount, birthdate, gender FROM Directors
ORDER BY name Asc;

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


--                          Actor INSERTS
INSERT INTO Actors (`name`, birthdate, gender, movieCount) 
VALUES (:nameInput, :birthdateInput, :genderInput, :movieCountInput);


--                          Director INSERTS
INSERT INTO Directors (`name`, birthdate, gender, movieCount) 
VALUES (:nameInput, :birthdateInput, :genderInput, :movieCountInput);


--                          Genre INSERTS
INSERT INTO Genres (`name`)
VALUES (:nameInput);


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
WHERE `name` = :nameInput

-- Update Birthdate
UPDATE Actors
SET birthdate = :replaceInput
WHERE `name` = :nameInput

-- Update Gender
UPDATE Actors
SET gender = :replaceInput
WHERE `name` = :nameInput

-- Update MovieCount
UPDATE Actors
SET movieCount = :replaceInput
WHERE `name` = :nameInput


--                          Director UPDATES

-- Update Name
UPDATE Directors
SET `name` = :replaceInput
WHERE `name` = :nameInput

-- Update Birthdate
UPDATE Directors
SET birthdate = :replaceInput
WHERE `name` = :nameInput

-- Update Gender
UPDATE Directors
SET gender = :replaceInput
WHERE `name` = :nameInput

-- Update MovieCount
UPDATE Directors
SET movieCount = :replaceInput
WHERE `name` = :nameInput

--                          Movie UPDATES

-- Update Title
UPDATE Movies
SET title = :replaceInput
WHERE `name` = :nameInput

-- Update Release Date
UPDATE Movies
SET releaseDate = :replaceInput
WHERE `name` = :nameInput

-- Update Gross Revenue
UPDATE Movies
SET grossRevenue = :replaceInput
WHERE `name` = :nameInput

-- Update Production Cost
UPDATE Movies
SET productionCost = :replaceInput
WHERE `name` = :nameInput

-- Update Directorid
UPDATE Movies
SET productionCost = :replaceInput
WHERE `name` = :nameInput

UPDATE Movies
SET directorID = (
    SELECT directorID
    FROM Directors
    WHERE Directors.name LIKE :inputName
)
WHERE `name` = :nameInput

--                          Genres UPDATES

-- Update Name
UPDATE Genres
SET `name` = :replaceInput
WHERE `name` = :nameInput


--                              DELETES




--                          Movie DELETES
DELETE FROM Movies
WHERE title = :nameInput

--                          Actor DELETES
DELETE FROM Actors
WHERE `name` = :nameInput

--                          Genre DELETES
DELETE FROM Genres
WHERE `name` = :nameInput

--                          Director DELETES
DELETE FROM Directors
WHERE `name` = :nameInput

--                          Actor-to-Movie DELETES
DELETE FROM Movies_Actors
WHERE movieID = (
    SELECT movieID
    FROM Movies
    WHERE name LIKE :movieName
)
AND actorID IN (
    SELECT actorID
    FROM Actors
    WHERE name LIKE :otherName
);

--                          Genre-to-Movie q DELETES

DELETE FROM Movies_Genres
WHERE movieID = (
    SELECT movieID
    FROM Movies
    WHERE name = :movieName
)
AND genreID IN (
    SELECT genreID
    FROM Genres
    WHERE name = :otherName
);


