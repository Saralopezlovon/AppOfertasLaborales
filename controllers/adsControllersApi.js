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
        const ad = await Ad.findByIdAndUpdate(
            req.body.idUpdate,
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
        await Ad.findByIdAndDelete(req.body.inputID);
        res.status(204).redirect('/dashboard');
    }),
};

module.exports = ads;
