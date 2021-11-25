const Ad = require('../models/adModel');


const adsWeb = { 

    getHome: async(req, res)=>{
        try{
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

        }catch(err){
            res.status(400).json({
                status:"fail",
                message: err
            })

        }
    },

    getRegister: async(req,res)=>{
        try{
            res.status(200).render('register')

        }catch(err){
            res.status(400).json({
                status:"fail",
                message: err
            })

        }
    },

    getLogin: async(req,res)=>{
        try{
            res.status(200).render('login')

        }catch(err){
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    },
    getFavorites: async (req, res) => {
        try {
            res.status(200).render('favorites');
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    },
    getProfiles: async (req, res) => {
        try {
            res.status(200).render('profiles');
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    },
    getDashboard: async (req, res) => {
        try {
            const allAds = await Ad.find();
            res.status(200).render('dashboard', {allAds});
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    }


};

module.exports = adsWeb;
