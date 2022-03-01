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

// Routes para que el admin vea los usuarios registrados
router.get('/admin/users', validateAdminToken, adminControllers.getUsers);

router
    .route('/admin/login')
    .get(adminControllers.getAdminLogin)
    .post(adminControllers.doAdminLogin);

router.get('/admin/logout', adminControllers.adminLogout);

module.exports = router;
