// MÓDULOS
const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync');
const scrapingTe = require('../utils/scrapingTe');

// HANDLER FUNCTIONS
const adsWeb = {
    // Renderiza la pag "Home"
    getHome: catchAsync(async (req, res) => {
        res.status(200).render('home');
    }),
    // LLama al scraping y muestra los anuncios junto con los de la BBDD de MongoDB
    getAllAdsSearch: catchAsync(async (req, res) => {
        const allAds = await Ad.find({ title: req.body.titleSearched });
        // usar metodo de JS tolowercase en variable
        console.log(allAds);
        const scrapingTeAds = await scrapingTe(req.body.titleSearched);
        const data = [...scrapingTeAds, ...allAds]; // Usamos Spread Operator para combinar los arrays
        console.log(data);
        res.status(200).render('home', { data: data });
    }),

    // Renderiza la pag "register"
    getSignup: catchAsync(async (req, res) => {
        res.status(200).render('signup');
    }),

    // Renderiza la pag "login"
    getLogin: catchAsync(async (req, res) => {
        res.status(200).render('login');
    }),
};

module.exports = adsWeb;