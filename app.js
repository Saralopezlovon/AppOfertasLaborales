//MODULES
const express = require('express');
const app = express();
const adsApi = require('./controllers/adsControllersApi');
const adsWeb = require('./controllers/adsControllersWeb');

//MIDDLEWARES
app.use(express.json());

//WEB ROUTES

app.get('/', adsWeb.getHome);
app.get('/favorites', adsWeb.getFavorites);
app.get('/profiles', adsWeb.getProfiles);
app.get('/dashboard', adsWeb.getDashboard);

//API ROUTES
app.get('/api/ads', adsApi.getAllAds);
app.post('/api/ads', adsApi.createAd);

//PUG
app.set('view engine', 'pug');
app.set('views', './views');
//MIDDLEWARES
app.use(express.static('public'));

//EXPORTAR APP PARA CONEXIÓN CON EL SERVIDOR
module.exports = app;
