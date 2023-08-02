-- Title: Movie Information Database Data Definitions
-- Assignment: Project Step 3 Draft
-- Authors: Mai Frey and Ayra Sears
-- Due Date: 2023-07-17

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

DROP TABLE IF EXISTS Directors;

-- Create Directors Table
CREATE TABLE Directors (
    directorID int NOT NULL AUTO_INCREMENT UNIQUE,
    `name` varchar(255) NOT NULL,
    birthdate date NOT NULL,
    gender varchar(50) NOT NULL, 
    movieCount int NOT NULL,
    PRIMARY KEY (directorID)
);

DROP TABLE IF EXISTS Movies;

-- Create Movies Table
CREATE TABLE Movies (
    movieID int NOT NULL AUTO_INCREMENT UNIQUE,
    title varchar(255) NOT NULL,
    productionCost bigint NOT NULL,
    grossRevenue bigint NOT NULL,
    releaseDate date NOT NULL, 
    directorID int DEFAULT NULL,
    PRIMARY KEY (movieID),
    FOREIGN KEY (directorID) REFERENCES Directors(directorID) ON DELETE SET NULL ON UPDATE CASCADE
 );


DROP TABLE IF EXISTS Actors;

-- Create Actors Table
CREATE TABLE Actors (
    actorID int NOT NULL AUTO_INCREMENT UNIQUE,
    `name` varchar(255) NOT NULL,
    birthdate date NOT NULL, 
    gender varchar(50) NOT NULL, 
    movieCount int NOT NULL,
    PRIMARY KEY (actorID)
);

DROP TABLE IF EXISTS Genres;

-- Create Genres Table 
CREATE TABLE Genres (
    genreID int NOT NULL AUTO_INCREMENT UNIQUE,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (genreID)
);

DROP TABLE IF EXISTS Movies_Actors;

-- Create Movies_Actors Table
CREATE TABLE Movies_Actors (
    movieID int NOT NULL,
    actorID int NOT NULL,
	characterName varchar(255) NOT NULL,
    FOREIGN KEY (movieID) REFERENCES Movies(movieID) ON DELETE CASCADE ON UPDATE CASCADE,   
    FOREIGN KEY (actorID) REFERENCES Actors(actorID) ON DELETE CASCADE ON UPDATE CASCADE  
);

DROP TABLE IF EXISTS Movies_Genres;

-- Create Movies_Genres Table
CREATE TABLE Movies_Genres (
    movieID int NOT NULL,
    genreID int NOT NULL,
    FOREIGN KEY (movieID) REFERENCES Movies(movieID) ON DELETE CASCADE,   
    FOREIGN KEY (genreID) REFERENCES Genres(genreID) ON DELETE CASCADE  
);

-- Insert into Directors Table
INSERT INTO Directors (`name`, birthdate, gender, movieCount)
VALUES ("Greta Gerwig",	"1983-08-04", "Female", 3),
("Peter Jackson", "1961-10-31", "Male", 25),
("Jordan Peele", "1979-02-21", "Male", 3);

-- Insert into Movies Table
INSERT INTO Movies (title, productionCost, grossRevenue, releaseDate, directorID)
VALUES ("Barbie", 145000000, 300000000, "2023-07-21", 1),
("Little Women", 40000000, 108100000, "2019-12-25", 1),
("The Lovely Bones", 65000000, 44114232, "2010-01-15", 2), 
("Nope", 68000000, 123277080, "2022-07-22", 3);

-- Insert into Actors Table
INSERT INTO Actors (`name`, birthdate, gender, movieCount)
VALUES ("Margot Robbie", "1990-07-02", "Female", 12),
("Ryan Gosling", "1980-11-12", "Male", 37),
("Saoirse Ronan", "1994-04-12",	"Female", 29),
("Daniel Kaluuya", "1989-02-24", "Male", 17);


-- Insert into Genres Table 
INSERT INTO Genres (`name`)
VALUES ("Romance"),
("Comedy"),
("Adventure"),
("Fantasy"), 
("Coming-of-Age");

-- Insert into Movies_Actors Table
INSERT INTO Movies_Actors (movieID, actorID, characterName)
VALUES (1, 1,'Barbara Millicent Robert'),
(1, 2,'Kenneth Sean Carson'),
(2, 3,'Jo March'),
(3, 3,'Susie Salmon'),
(4, 4,'OJ Haywood');

-- Insert into Movies_Genres Table
INSERT INTO Movies_Genres (movieID, genreID)
VALUES (1, 1),
(1, 2),
(1, 3),
(2, 5),
(2, 2);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;