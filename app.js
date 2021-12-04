//MODULES
const express = require('express');
const app = express();
const usersRouter = require('./routes/usersRoutes');
const apiRouter = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');
const AppError = require('./utils/appError');
const errMiddleware = require('./middlewares/errorMiddleware');

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //IMPORTANTE

// ROUTES
// Routes Web
app.use('/', webRoutes);
// Routes API
app.use('/', apiRouter);
// Routes usuarios
app.use('/api/users', usersRouter);

//PUG
app.set('view engine', 'pug');
app.set('views', './views');

//MIDDLEWARES
app.use(express.static('public'));

// MANEJO DE ERRORES
//Si no encuentra la ruta buscada aparece este error
app.all('*', (req, res, next) => {
    next(new AppError(`No se encuentra esta ruta:${req.originalUrl}`, 404));
});

app.use(errMiddleware);

//EXPORTAR APP PARA CONEXIÓN CON EL SERVIDOR
module.exports = app;
