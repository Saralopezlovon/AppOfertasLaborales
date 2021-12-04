const express = require('express');
const adsWeb = require('../controllers/adsControllersWeb');

const router = express.Router();

router.route('/').get(adsWeb.getHome).post(adsWeb.getAllAdsSearch);

router.route('/signup').get(adsWeb.getSignup); //.post(adsWeb.newRegister);

router.route('/login').get(adsWeb.getLogin); //.post(adsWeb.doLogin);

router.get('/admin/dashboard', adsWeb.getDashboard);
// Ruta como usuario logeado
// app.get('/profile', adsWeb.getProfile);
// app.get('/favorites', adsWeb.getFavorites);

// Rutas del admin
// app.get('/admin/profile', adsWeb.getProfile);
// app.get('/admin/profiles', adsWeb.getProfiles);

module.exports = router;
