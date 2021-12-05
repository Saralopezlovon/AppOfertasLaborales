CREATE DATABASE tsrjobsapp;

-- Poner todos los campos en minusculas para evitar problemas

CREATE TABLE users (
  id SERIAL  PRIMARY KEY,
  nickname VARCHAR(200)  NOT NULL,
  email VARCHAR (100) NOT NULL UNIQUE, 
  password VARCHAR (255) NOT NULL,
  avatar VARCHAR (2550),
	isadmin BOOLEAN DEFAULT False, 
  created timestamp NOT NULL DEFAULT now() 
);
  
-- DROP TABLE users 

INSERT INTO users(nickname,email,password)
VALUES 
('Ricky', 'ricky@postgres.com', '1234'),
('Bob', 'bob@postgres.com', '1234'),
('Jhon', 'jhon@postgres.com', '1234');

SELECT * FROM users;

-- psql -U postgres (PARA LOGGEARNOS EN NUESTRA BBDD)
-- \c jobsapp (PARA CONECTARNOS A LA BASE DE DATOS)
-- \dt (PARA LISTAR NUESTRAS TABLAS)
-- heroku pg:psql (PARA CONECTARNOS A HEROKU)
