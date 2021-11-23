const Ad = require('../models/adModel')

const ads = {

    getAllAds : async (req,res)=>{
        try{
            
            const allAds = await Ad.find()
            res.status(200).json({
                status:'sucess',
                resultNumber: allAds.length,
                data: {ads : allAds},
            })

        }catch(err){

            res.status(400).json({
                status:"fail",
                message: err
            })

        }
    },

    createAd : async(req,res)=>{

        try{

            const newAd = await Ad.create(req.body);

            res.status(201).json({
                status:'sucess',
                data: {ads : newAd}
            })
    
        }catch(err){
            res.status(400).json({
                status:"fail",
                message: err
            })
        }

    }
}


module.exports = ads;