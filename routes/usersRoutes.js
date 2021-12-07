const express = require('express');
const securedMiddleware = require('../middlewares/securedMiddleware');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

/* GET user profile. */
router.get('/user', securedMiddleware(), function (req, res, next) {
    const { _raw, _json, user_metadata, ...userProfile } = req.user;
    res.render('user', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Profile page',
    });
});

// router.post('/user', userControllers.updateUser);

/* GET favorites. */
// router.get('/user/favorites', securedMiddleware(), function (req, res, next) {
//     res.render('favorites', {
//         title: 'Favoritos',
//     });
// });

module.exports = router;
