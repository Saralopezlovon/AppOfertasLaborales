const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.post('/user/login', userControllers.doLogin);
router.post('/user/signup', userControllers.signUp);
router.get('/user/profile', userControllers.getProfile);

router.get('/user/favorites', userControllers.getFavorites)

module.exports = router;
