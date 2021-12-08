const express = require('express');
const pool = require('../pgdb');

const securedMiddleware = require('../middlewares/securedMiddleware');
const userControllers = require('../controllers/userControllers');


const router = express.Router();

/* GET user profile. */
router.get('/user', securedMiddleware(), async function (req, res, next) {
    const {...userProfile } = req.user;
    const id = parseInt(userProfile.id.slice(6), 10);        
    const userInfo = await pool.query(
        `SELECT name, lastname, favoritelanguage FROM users WHERE id=$1`,
        [id]
    );
    const userInfoPG = userInfo.rows 
    const allUserInfo = {...userProfile,...userInfoPG}
    
    console.log(allUserInfo)
    res.status(200).render('user', {allUserInfo});
});

router.post('/user', userControllers.addUserInfo)


// Favoritos
router
    .route('/user/favorites')
    .get(securedMiddleware(), userControllers.getFavorites)
    .post(userControllers.addFavorite)
    // .post(userControllers.deleteFavorite);

// router.post('/user/api/favorites')

// router.get('/user/favorites', securedMiddleware(), function (req, res, next) {
//     res.render('favorites', {
//         title: 'Favoritos',
//     });
// });

// Actualizar usuario
// router.post('/user', userControllers.updateUser);

/* GET favorites. */

module.exports = router;
