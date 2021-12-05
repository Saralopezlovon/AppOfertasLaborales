// MODULES
const pool = require('../pgdb');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');

// HANDLER FUNCTIONS
const userControllers = {
    //Añade un favorito a la BBDD
    addFavorite: catchAsync(async (req, res) => {
        const newFavorite = await pool.query(
            `INSERT INTO favorites(fk_id_user,title,company,location,salary,description,image,link) 
            VALUES ((SELECT userid FROM users WHERE useremail='bob@postgres.com'),'prueba1','prueba1','prueba1','s','f','z','l')`
        );
        res.status(200).json({ newFavorite: newFavorite.rows });

        // res.status(200).render('favorites');
    }),
};

// Aquí faltan los controladores para que el usuario pueda editar o borrar su perfil

module.exports = userControllers;
