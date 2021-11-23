

const adsWeb = { 

    getHome: async(req, res)=>{
        try{
            res.status(200).render('home', {name: "Ricardo"})

        }catch(err){
            res.status(400).json({
                status:"fail",
                message: err
            })

        }
    }

}


module.exports = adsWeb;