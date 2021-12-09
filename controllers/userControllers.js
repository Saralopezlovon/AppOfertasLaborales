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
        res.status(200).render('favorites', {
            allFavorites: allFavorites.rows,
        });
    }),

    deleteFavorite: catchAsync(async (req, res) => {
        const { ...userProfile } = req.user;
        const fkIdUser = parseInt(userProfile.id.slice(6), 10);
        const {link} = req.body;
        const deleteFavorites = await pool.query(
            `DELETE FROM favorites WHERE fk_id_user =$1 AND link=$2`,
            [fkIdUser, link]
        );
        // console.log(deleteFavorites.rows);
        //res.redirect('/user/favorites');
        res.json({"resultado":deleteFavorites.rows})
    }),

    //Añadir información a un usuario

    addUserInfo: catchAsync(async (req, res) => {
        const { ...userProfile } = await req.user; // Hay que poner await sino nos devuelve undefined
        const id = parseInt(userProfile.id.slice(6), 10);
        const { name, lastName, favoriteLanguage } = req.body;
        await pool.query(
            `UPDATE users SET name=$1 , lastname=$2, favoritelanguage=$3 WHERE id=$4`,
            [name, lastName, favoriteLanguage, id]
        );
        // console.log(addUserInfo.rows);
        res.status(200).redirect('/user');
    }),
};

module.exports = userControllers;
