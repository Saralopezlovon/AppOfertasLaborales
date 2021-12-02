CREATE TABLE users
  (
    PersonID SERIAL  PRIMARY KEY,
    FirstName VARCHAR(200)  NOT NULL,
    Email VARCHAR (100) NOT NULL UNIQUE, 
    Password VARCHAR (255) NOT NULL,
    Avatar VARCHAR (2550),
	isAdmin BOOLEAN DEFAULT False, 
    Created timestamp NOT NULL DEFAULT now() 
  );
  
-- DROP TABLE users 

INSERT INTO Users(FirstName,email,Password)
VALUES('Juan','juan@pgadmin.es','qwerty')

SELECT * FROM users

Pasos: 
Crear BD 
npm i pg 

