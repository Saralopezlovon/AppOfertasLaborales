CREATE DATABASE jobsapp;

CREATE TABLE users (
  userID SERIAL  PRIMARY KEY,
  userName VARCHAR(200)  NOT NULL,
  userEmail VARCHAR (100) NOT NULL UNIQUE, 
  userPassword VARCHAR (255) NOT NULL,
  userAvatar VARCHAR (2550),
	isAdmin BOOLEAN DEFAULT False, 
  created timestamp NOT NULL DEFAULT now() 
);
  
-- DROP TABLE users 

INSERT INTO users(userName,userEmail,userPassword, userAvatar, isAdmin)
VALUES 
('Ricky', 'ricky@postgres.com', '1234', 'avatar', true),
('Bob', 'bob@postgres.com', '1234', 'avatar', false),
('Jhon', 'jhon@postgres.com', '1234', 'avatar', false);

SELECT * FROM users;

-- psql -U postgres (PARA LOGGEARNOS EN NUESTRA BBDD)
-- \c jobsapp (PARA CONECTARNOS A LA BASE DE DATOS)
-- \dt (PARA LISTAR NUESTRAS TABLAS)
-- heroku pg:psql (PARA CONECTARNOS A HEROKU)
