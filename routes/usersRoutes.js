const express = require('express');
const securedMiddleware = require('../middlewares/securedMiddleware');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

/* GET user profile. */
router.get('/user', securedMiddleware(), function (req, res, next) {
    const {...userProfile } = req.user;
    res.render('user', {userProfile})
        // title: 'Profile page',
        console.log(userProfile)
    });

router.post('/user', userControllers.updateUser);

/* GET favorites. */
router.get('/user/favorites', securedMiddleware(), function (req, res, next) {
    res.render('favorites', {
        title: 'Favoritos',
    });
});

module.exports = router;
