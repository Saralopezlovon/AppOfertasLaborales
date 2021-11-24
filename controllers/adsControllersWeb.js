

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
    }

}


module.exports = adsWeb;