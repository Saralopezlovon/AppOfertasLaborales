// MODULES
const pool = require('../pgdb');
const catchAsync = require('../utils/catchAsync');

// HANDLER FUNCTIONS
const userControllers = {
    // Añade un favorito a la BBDD
    addFavorite: catchAsync(async (req, res) => {
        const { ...userProfile } = req.user;
        const fkIdUser = parseInt(userProfile.id.slice(6), 10);
        const { title, company, location, salary, description, image, link } =
            req.body;
        const newFavorite = await pool.query(
            `INSERT INTO favorites(fk_id_user,title,company,location,salary,description,image,link)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                fkIdUser,
                title,
                company,
                location,
                salary,
                description,
                image,
                link,
            ]
        );
        res.status(200).json({ newFavorite: newFavorite.rows });
        // res.status(200).render('favorites');
    }),

    getFavorites: catchAsync(async (req, res) => {
        const { ...userProfile } = req.user;
        const fkIdUser = parseInt(userProfile.id.slice(6), 10);
        const allFavorites = await pool.query(
            `SELECT * FROM favorites WHERE fk_id_user = $1`,
            [fkIdUser]
        );
        console.log(allFavorites.rows);
        res.status(200).render('favorites', {
            allFavorites: allFavorites.rows,
        });
    }),

    // deleteFavorite: catchAsync(async (req, res) => {
    //     const { ...userProfile } = req.user;
    //     const fkIdUser = parseInt(userProfile.id.slice(6), 10);
    //     const {link} = req.body;
    //     const deleteFavorites = await pool.query(
    //         `DELETE FROM favorites WHERE fk_id_user =$1 AND link=$2`,
    //         [fkIdUser, link]
    //     );
    //     console.log(deleteFavorites.rows);
    //     res.status(200).redirect('/user/favorites');
    // }),

    //Añadir información a un usuario

    addUserInfo: catchAsync(async (req, res) => {
            const { ...userProfile } = req.user;
            const id = parseInt(userProfile.id.slice(6), 10);            
            const {name, lastName, favoriteLanguage} = req.body;
            const addUserInfo = await pool.query(
                `UPDATE users SET name=$1 , lastname=$2, favoritelanguage=$3 WHERE id=$4`,
                [name, lastName, favoriteLanguage, id]
            );
            console.log(addUserInfo.rows);
            res.status(200).redirect('/user');
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
