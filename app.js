//MODULES
const express = require('express');
const app = express();
const adsApi = require('./controllers/adsControllersApi');
const adsWeb = require('./controllers/adsControllersWeb');
const AppError = require('./utils/appError');
const errMiddleware = require('./middlewares/errorMiddleware');

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //IMPORTANTE

//WEB ROUTES

app.get('/', adsWeb.getHome);
app.post('/', adsWeb.getAllAdsSearch);

// ***** PDTE REFACTOR *****
app.get('/register', adsWeb.getRegister);
// app.post('/register', adsWeb.newRegister);

app.get('/login', adsWeb.getLogin);
// app.post('/login', adsWeb.doLogin);

// Ruta como usuario logeado
// app.get('/profile', adsWeb.getProfile);
// app.get('/favorites', adsWeb.getFavorites);

// Rutas del admin
// app.get('/admin/profile', adsWeb.getProfile);
// app.get('/admin/profiles', adsWeb.getProfiles);
app.get('/admin/dashboard', adsWeb.getDashboard);
app.post('/admin/ads/delete', adsApi.deleteAd);
app.post('/admin/ads/update', adsApi.updateAd);

//API ROUTES
app.get('/api/ads', adsApi.getAllAds);
app.post('/api/ads', adsApi.createAd);
// app.put('/api/ads/:id', adsApi.updateAd);
//app.delete('api/ads/delete', adsApi.deleteAd);

//PUG
app.set('view engine', 'pug');
app.set('views', './views');

//MIDDLEWARES
app.use(express.static('public'));

//Si no encuentra la ruta buscada aparece este error
app.all('*', (req, res, next) => {
    next(new AppError(`No se encuentra esta ruta:${req.originalUrl}`, 404));
});

app.use(errMiddleware);

//EXPORTAR APP PARA CONEXIÓN CON EL SERVIDOR
module.exports = app;
