const express = require('express');
const webControllers = require('../controllers/webControllers');
const jwt = require('jsonwebtoken');
// const { jwtTokens } = require('../utils/jwtHelpers');

const router = express.Router();

router
    .route('/')
    .get(webControllers.getHome)
    .post(webControllers.getAllAdsSearch);

router.route('/login').get(webControllers.getLogin);
router.route('/signup').get(webControllers.getSignup);

module.exports = router;
