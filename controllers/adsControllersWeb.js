// MÓDULOS
const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync');
const scrapingTe = require('../utils/scrapingTe');

// HANDLER FUNCTIONS
const adsWeb = {
    // Renderiza la pag "Home" y muestra los anuncios de scraping y de MongoDB
    getHome: catchAsync(async (req, res) => {
        res.status(200).render('home');
    }),

    getAllAdsSearch: catchAsync(async (req, res) => {
        const allAds = await Ad.find({title : req.body.titleSearched});
        const scrapingTeAds = await scrapingTe(req.body.titleSearched);
        const data = [...scrapingTeAds, ...allAds]; // Usamos Spread Operator para combinar los arrays
        res.status(200).render('home', { data: data });
    }),

    // Renderiza la pag "register"
    getRegister: catchAsync(async (req, res) => {
        res.status(200).render('register');
    }),

    // Renderiza la pag "login"
    getLogin: catchAsync(async (req, res) => {
        res.status(200).render('login');
    }),

    // Renderiza la pag "favorites"
    getFavorites: catchAsync(async (req, res) => {
        res.status(200).render('favorites');
    }),

    // Renderiza la pag "profiles"
    getProfiles: catchAsync(async (req, res) => {
        res.status(200).render('profiles');
    }),

    // Renderiza la pag "dashboard"
    getDashboard: catchAsync(async (req, res) => {
        const allAds = await Ad.find();
        res.status(200).render('dashboard', { allAds });
    }),
};

module.exports = adsWeb;
