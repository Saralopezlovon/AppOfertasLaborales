const Ad = require('../models/adModel');

const ads = {
    getAllAds: async (req, res) => {
        try {
            const allAds = await Ad.find();
            res.status(200).json({
                status: 'sucess',
                resultNumber: allAds.length,
                data: { ads: allAds },
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    },

    createAd: async (req, res) => {
        console.log(req.body.title)
        try {
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
            
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    },
};

module.exports = ads;
