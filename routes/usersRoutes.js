const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.post('/user/login', userControllers.doLogin);
router.post('/user/signup', userControllers.signUp);
router.get('/user/profile', userControllers.getProfile);

// Falta ruta para favoritos /user/favorites
module.exports = router;
