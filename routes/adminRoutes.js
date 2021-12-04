const express = require('express');
const adminControllers = require('../controllers/adminControllers');

const router = express.Router();

// ROUTES
router.get('/admin/dashboard', adminControllers.getDashboard);
// Routes de los anuncios de la BBDD de MongoDB
router
    .route('/api/ads')
    .get(adminControllers.getAllAds)
    .post(adminControllers.createAd);
router.post('/admin/ads/delete', adminControllers.deleteAd);
router.post('/admin/ads/update', adminControllers.updateAd);
// Routes de los usuarios de la BBDD de PostgreSQL
router.get('/admin/users', adminControllers.getUsers);

// Faltan rutas para obtener perfiles de todos los usuarios /admin/profiles

module.exports = router;
