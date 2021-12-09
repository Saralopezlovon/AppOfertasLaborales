const express = require('express');
const pool = require('../pgdb');

const securedMiddleware = require('../middlewares/securedMiddleware');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

/* GET user profile. */
router.get('/user', securedMiddleware(), async function (req, res, next) {
    const { ...userProfile } = req.user;
    const id = parseInt(userProfile.id.slice(6), 10);
    console.log(id);
    const userInfo = await pool.query(
        `SELECT name, lastname, favoritelanguage FROM users WHERE id=$1`,
        [id]
    );
    const userInfoPG = userInfo.rows[0]; // Nos faltaba poner [0]
    const allUserInfo = { ...userProfile, ...userInfoPG };
    res.status(200).render('user', { allUserInfo });
});
// Añadir info de usuario
router.post('/user', userControllers.addUserInfo);

// Favoritos
router
    .route('/user/favorites')
    .get(securedMiddleware(), userControllers.getFavorites)
    .post(userControllers.addFavorite)
    .delete(userControllers.deleteFavorite);

// router.post('/user/api/favorites')

// router.get('/user/favorites', securedMiddleware(), function (req, res, next) {
//     res.render('favorites', {
//         title: 'Favoritos',
//     });
// });

module.exports = router;
