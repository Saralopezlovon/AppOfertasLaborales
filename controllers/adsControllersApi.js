const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync');

const ads = {
    getAllAds: catchAsync(async (req, res) => {
        const allAds = await Ad.find();
        res.status(200).render('dashboard', { allAds });
    }),

    createAd: catchAsync(async (req, res) => {
        const newAd = await Ad.create({
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            salary: req.body.salary,
            description: req.body.description,
            image: req.body.logo,
            link: req.body.link,
        });

        res.status(200).redirect('/dashboard');
    }),

    updateAd: catchAsync(async (req, res) => {
        const ad = await Ad.updateOne(
            { adID: parseInt(req.body.idUpdate, 10) },
            {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                salary: req.body.salary,
                description: req.body.description,
                image: req.body.logo,
                link: req.body.link,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).redirect('/dashboard');
    }),

    deleteAd: catchAsync(async (req, res) => {
        await Ad.deleteOne({ adID: parseInt(req.body.idDelete, 10) });
        res.status(204).redirect('/dashboard');
    }),
};

module.exports = ads;
