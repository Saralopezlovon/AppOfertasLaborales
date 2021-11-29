const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync')

const ads = {
    getAllAds : catchAsync (async (req, res) => {
        const allAds = await Ad.find();
        res.status(200).render('dashboard', { allAds });        
    }),

    createAd: catchAsync (async (req, res) => {
        const newAd = await Ad.create({
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            salary: req.body.salary,
            description: req.body.description,
            imagen: req.body.logo,
            link: req.body.link,
        });

        res.status(200).redirect('/dashboard')

    }),

    // getInfoIdAd:(req,res)=>{

    //     let id = req.body.titulo
    
    //     res.redirect(`/api/ads/${id}`)
    
    //     },

    getOneAd: catchAsync(async(req,res) =>{
        let titleAd = req.body.adTitle;
        console.log(titleAd)

    }),

    // deleteAd: catchAsync (async (req,res)=>{
    //     console.log(req.body.adTitle)
    //     let id = await Ad.find(req.body.adTitle)
    //     console.log(id)

    //     const deletedAd = await Ad.findByIdAndDelete(id);
    //     res.status(204).json({
    //         status:'success',
    //         data: null,
    //         message:`Anuncio con id = ${req.params.id} borrado correctamente`
    //     })
        

    // })

};

module.exports = ads;
