const express = require('express');
const adminControllers = require('../controllers/adminControllers');
const validateAdminToken = require('../middlewares/validateAdminToken');

const router = express.Router();

// ROUTES
router.get(
    '/admin/dashboard',
    validateAdminToken, // Validar el token del admin
    adminControllers.getDashboard
);
// Routes de los anuncios de la BBDD de MongoDB
router
    .route('/api/ads')
    .get(adminControllers.getAllAds)
    .post(adminControllers.createAd);

router.post('/admin/ads/delete', adminControllers.deleteAd);
router.post('/admin/ads/update', adminControllers.updateAd);
// Routes de los usuarios de la BBDD de PostgreSQL

router.route('/admin/users').get(adminControllers.getUsers);

// .post(adminControllers.updateUser);

router
    .route('/admin/login')
    .get(adminControllers.getAdminLogin)
    .post(adminControllers.doAdminLogin);

module.exports = router;
