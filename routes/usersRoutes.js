const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.post('/login', userControllers.doLogin);
router.post('/signup', userControllers.signUp);
router.get('/user/profile', userControllers.getProfile);

// Falta ruta para favoritos /user/favorites
module.exports = router;
