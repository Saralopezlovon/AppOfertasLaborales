const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "TSR_DB",
    password: "1234"
})

//······················TABLA DE USUARIOS:······················//

// CREATE TABLE users
//   (
//     PersonID SERIAL  PRIMARY KEY,
//     FirstName VARCHAR(200)  NOT NULL,
//     Email VARCHAR (100) NOT NULL UNIQUE, 
//     Password VARCHAR (255) NOT NULL,
//     Avatar VARCHAR (2550),
// 	   isAdmin BOOLEAN DEFAULT False, 
//     Created timestamp NOT NULL DEFAULT now() 
//   );

//REGISTRO DE USUARIO -> Insertar un usuario en la BBDD

// const createUser = async (user) => {

//     const {FirstName,Email,Password,Avatar} = user;
//     let client, result;

//     try{
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(`INSERT INTO users(FirstName,Email,Password,Avatar) VALUES ($1,$2,$3,$4)`,
//                                         [FirstName,Email,Password,Avatar])
//         result = data.rowCount
//     }catch(err){
//         console.log(err);
//         throw err;

//     }finally{
//         client.release();    
//     }
//     return result
// }

        //······Prueba para el registro de usuarios······//

        // let user = {FirstName:"Flanders",
        //  Email:"frandi@gmail.com",
        //  Password:"123456789",
        //  Avatar:"https://soydecine.com/wp-content/uploads/ned-flanders-uno-de-los-personajes-mas-querido-de-los-simpsons.jpg"}

        // createUser(user)
        // .then(data=>console.log(data))


//VER LOS DATOS DEL USUARIO -> Ver datos segun el id

// const getDataUser = async (id) => {

//     let client, result;

//     try{
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(`SELECT firstname,email,password,avatar FROM users WHERE PersonID = $1`, [id])
//         result = data.rowCount

//     }catch(err){
//         console.log(err);
//         throw err;
//     }finally{
//         client.release();    
//     }
//     return result
// }

        //······Prueba para ver los datos de un usuario······//

        // getDataUser(2)
        // .then(data=>console.log(data))


//EDITAR LOS DATOS DE UN USUARIO -> segun el id

// const updateUser = async (email) => {

//     let client, result;

//     try{
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(`SELECT firstname,email,password,avatar FROM users WHERE PersonID = $1`, [email])
//         result = data.rowCount

//     }catch(err){
//         console.log(err);
//         throw err;
//     }finally{
//         client.release();    
//     }
//     return result
// }

        //······Prueba para ver los datos de un usuario······//

        // updateUser(2)
        // .then(data=>console.log(data))


//······················TABLA DE FAVORITOS:····································//

// CREATE TABLE favorites
// (
//   favorite_id SERIAL  PRIMARY KEY,
//   fk_id_user SERIAL,
//   title VARCHAR(500)  NOT NULL,
//   company VARCHAR (500) NOT NULL UNIQUE, 
//   location VARCHAR (500) NOT NULL,
//   salary VARCHAR (500),
//   description VARCHAR (9000000),
//   image VARCHAR (500),
//   link VARCHAR (500),	 
//   FOREIGN KEY (fk_id_user) REFERENCES users(PersonID)       
// );

//User -> Ver toda la tabla de favoritos

// const allFavorites = async (id) => {

//     let client, result;

//     try{
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(`SELECT title,company,location,salary,description,image,link FROM favorites WHERE PersonID=$1`,[id])
//         result = data.rowCount

//     }catch(err){
//         console.log(err);
//         throw err;
//     }finally{
//         client.release();    
//     }
//     return result
// }

        //······Prueba para ver los datos de todos los favoritos·····//

        // allFavorites()
        // .then(data=>console.log(data))


//User -> Querer insertar un favorito

const createFavorite = async (newFavorite) => {

    const {title,company,location,salary,description,image,link,email} = newFavorite;

    let client, result;

    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO favorites(fk_id_user,title,company,location,salary,description,image,link,email) VALUES ((SELECT personid FROM users WHERE email=$9),$2,$3,$4,$5,$6,$7,$8)`,
                                               [title,company,location,salary,description,image,link,email])
        result = data.rowCount

    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}



        //······Prueba insertar los favoritos·····//           

        let favorite1 = {
         FirstName:"Flanders",
         title:"Empleo desarrollo",
         company:"Deloitte",
         location:"Madrid",
         salary:"1000",
         description:"Descripción del puesto",
         image:"http:hola.com",
         link:"http:hola.com"}

        createUser(favorite1)
        .then(data=>console.log(data))






//User -> Eliminar un favorito








// const userQueries = {
//     //Usuario
//     createUser,
//     getDataUser,
//     updateUser,
//     //Favoritos
//     allFavorites,

// }

// module.exports = userQueries ;




















//······················TABLA DE FAVORITOS:····································//

//TABLA DE FAVORITOS:
//User -> Querer ver toda la tabla de favoritos
//User -> Querer insertar un favorito
//User -> Eliminar un favorito