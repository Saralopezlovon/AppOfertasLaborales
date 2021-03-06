const express = require('express');
const webControllers = require('../controllers/webControllers');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'TSR Ofertas' });
});

router.post('/', webControllers.getAllAdsSearch);

module.exports = router;
