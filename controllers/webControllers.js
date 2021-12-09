
// MÓDULOS
const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync');
const scrapingTe = require('../utils/scrapingTe');
const scrapingTicjob = require('../utils/scrapingTicjob');

// HANDLER FUNCTIONS
const adsWeb = {
    // LLama al scraping y muestra los anuncios junto con los de la BBDD de MongoDB
    getAllAdsSearch: catchAsync(async (req, res) => {
        const allAds = await Ad.find({ title: req.body.titleSearched });
        // usar metodo de JS tolowercase en variable
        const scrapingTeAds = await scrapingTe(req.body.titleSearched);
        const scrapingTicjobAds = await scrapingTicjob(req.body.titleSearched);
        const data = [...scrapingTicjobAds, ...scrapingTeAds, ...allAds]; // Usamos Spread Operator para combinar los arrays
        res.status(200).render('index', { data: data });
    }),
};

module.exports = adsWeb;