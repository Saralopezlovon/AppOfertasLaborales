// MODULES
const express = require('express');
const app = express();
const usersRouter = require('./routes/usersRoutes');
const adminRouter = require('./routes/adminRoutes');
const webRouter = require('./routes/webRoutes');
const AppError = require('./utils/appError');
const errMiddleware = require('./middlewares/errorMiddleware');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //IMPORTANTE
app.use(express.static('public')); // Middleware para servir archivos estáticos de la carpeta "public"

// PUG
app.set('view engine', 'pug');
app.set('views', './views');

//ROUTES
// Routes Web
app.use('/', webRouter);
// Routes API
app.use('/', adminRouter);
// Routes usuarios
app.use('/', usersRouter);

// MANEJO DE ERRORES
// Si no encuentra la ruta buscada aparece este error
app.all('*', (req, res, next) => {
    next(new AppError(`No se encuentra esta ruta:${req.originalUrl}`, 404));
});

app.use(errMiddleware);

//EXPORTAR APP PARA CONEXIÓN CON EL SERVIDOR
module.exports = app;
