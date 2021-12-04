const express = require('express');
const adsApi = require('../controllers/adsControllersApi');

const router = express.Router();

// ROUTES
router.route('/api/ads').get(adsApi.getAllAds).post(adsApi.createAd);
router.post('/admin/ads/delete', adsApi.deleteAd);
router.post('/admin/ads/update', adsApi.updateAd);

module.exports = router;
