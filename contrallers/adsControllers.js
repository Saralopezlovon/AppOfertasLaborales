const Ad = require('../models/adModel')

const ads = {
    getAllAds : (req,res)=>{
        res.status(200).json({
            status:'sucess',
            data: {ads : 'Aqui irían los anuncios'}
        })
    },
    createAd : (req,res)=>{
        res.status(201).json({
            status:'sucess',
            data: {ads : 'Anuncio agregado con éxito'}
        })

    }
}


module.exports = ads;