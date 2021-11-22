//MODULES
const express = require ('express');
const app = express();
const ads=require('./contrallers/adsControllers')


//MIDDLEWARES
app.use(express.json());

//ROUTES
app.get('/api/ads', ads.getAllAds)
app.post('/api/ads', ads.createAd)






//EXPORTAR APP PARA CONEXIÓN CON EL SERVIDOR
module.exports= app