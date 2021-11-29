const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync')


const adsWeb = { 

    getHome: catchAsync (async(req, res)=>{
        res.status(200).render('home',
         {urlImage: "https://www.eluniversal.com.mx/sites/default/files/2019/07/12/amazon.jpg",
         title: "FullStack Developer",
         nameCompany: "Amazon",
         location: "España-Madrid",
         salary: "1800",
         description: "Importante empresa del sector ubicada en Madrid se encuentra en la búsqueda de un desarrollador Fullstack",
         date:"24/11/2021",
         link:"https://acortar.link/ccGwMk"
        })        
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
