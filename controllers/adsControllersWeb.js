const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync')
const scrapingTec = require('../utils/scrapingTe')

const adsWeb = { 
    getHome: catchAsync (async(req, res)=>{
        const adsTec = await scrapingTec();
        console.log(allAdsTec)
        res.status(200).render('home', {adsTec})     
    }),

    getRegister: catchAsync (async(req, res)=>{
        res.status(200).render('register')
       
    }),

    getLogin: catchAsync (async(req, res)=>{
        res.status(200).render('login')
        
    }),

    getFavorites: catchAsync (async(req, res) => {
        res.status(200).render('favorites')        
    }),

    getProfiles: catchAsync (async(req, res) => {
        res.status(200).render('profiles')
        
    }),

    getDashboard: catchAsync (async(req, res) => {
        const allAds = await Ad.find();
        res.status(200).render('dashboard', {allAds})        
    })

};

module.exports = adsWeb;
