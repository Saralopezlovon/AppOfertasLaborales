// MODULES
const pool = require('../pgdb');
const bcrypt = require('bcrypt');
const scriptFavorites = require ('../public/scripts/scriptFavorites');
const catchAsync = require('../utils/catchAsync');

// HANDLER FUNCTIONS
const userControllers = {
    // Añade un favorito a la BBDD
    addFavorite: catchAsync(async (req, res) => {
        console.log(req.body)
        const newFavorite = await pool.query(
            `INSERT INTO favorites(fk_id_user,title,company,location,salary,description,image,link)
            VALUES (1,'aaaaPPPPP','PPP','AAA','s','f','z','l')`
        );
        res.status(200).json({ newFavorite: newFavorite.rows });
        // res.status(200).render('favorites');
    }),

    getFavorites: catchAsync(async (req, res) => {
        res.status(200).render('favorites');
    }),




    //EDITAR LOS DATOS DE UN USUARIO -> segun el id
    // updateUser: catchAsync(async (req, res) => {
    //     let client, result;
    //     client = await pool.connect(); // Espera a abrir conexion
    //     const { idUpdate, nicknameUpdate, emailUpdate, passwordUpdate } =
    //         req.body;
    //     const data = await client.query(
    //         `UPDATE users SET nickname=$1 , password=$2 WHERE id=$3`,
    //         [nicknameUpdate, passwordUpdate, idUpdate]
    //     );
    //     result = data.rowCount;
    //     client.release();
    //     res.status(200).render('user', { result });
    // }),
};

// Aquí faltan los controladores para que el usuario pueda borrar su perfil

module.exports = userControllers;
