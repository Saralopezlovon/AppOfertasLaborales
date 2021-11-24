//MODULES
const express = require ('express');
const app = express();
var path = require('path')
const adsApi=require('./controllers/adsControllersApi')
const adsWeb=require('./controllers/adsControllersWeb')


//MIDDLEWARES
app.use(express.json());


//WEB ROUTES

app.get('/', adsWeb.getHome)
app.get('/register',adsWeb.getRegister)
app.get('/login',adsWeb.getLogin)




//API ROUTES
app.get('/api/ads', adsApi.getAllAds)
app.post('/api/ads', adsApi.createAd)



//PUG
app.set('view engine', 'pug');
app.set('views','./views');

//MIDDLEWARES
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));





//EXPORTAR APP PARA CONEXIÓN CON EL SERVIDOR
module.exports= app