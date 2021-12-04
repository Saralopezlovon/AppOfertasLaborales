const express = require('express');
const webControllers = require('../controllers/webControllers');

const router = express.Router();

router
    .route('/')
    .get(webControllers.getHome)
    .post(webControllers.getAllAdsSearch);

router.route('/user/login').get(webControllers.getLogin);
router.route('/user/signup').get(webControllers.getSignup);

module.exports = router;
