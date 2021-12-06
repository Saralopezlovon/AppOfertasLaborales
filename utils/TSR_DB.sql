CREATE DATABASE tsrjobsapp;

-- Poner todos los campos en minusculas para evitar problemas

CREATE TABLE users (
  id SERIAL  PRIMARY KEY,
  nickname VARCHAR(200),
  email VARCHAR (100) NOT NULL UNIQUE, 
  password VARCHAR (255) NOT NULL,
  picture VARCHAR (2550),
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


--Añadir tabla favoritos

CREATE TABLE favorites
(
   favorite_id SERIAL  PRIMARY KEY,
   fk_id_user SERIAL,
   title VARCHAR(500)  NOT NULL,
   company VARCHAR (500) NOT NULL UNIQUE, 
   location VARCHAR (500) NOT NULL,
   salary VARCHAR (500),
   description VARCHAR (9000000),
   image VARCHAR (500),
   link VARCHAR (500),	 
   FOREIGN KEY (fk_id_user) REFERENCES users(id)       
 );
