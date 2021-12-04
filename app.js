// MODULES
const express = require('express');
const app = express();
const usersRouter = require('./routes/usersRoutes');
const adminRouter = require('./routes/adminRoutes');
const webRouter = require('./routes/webRoutes');
const AppError = require('./utils/appError');
const errMiddleware = require('./middlewares/errorMiddleware');
const session = require('express-session');
const flash = require('express-flash');

// instalamos express-session y express-flash para guardar los detalles del usuario y de la sesión y asi mostrar mensajes cuando hacemos redirecciones  

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //IMPORTANTE
app.use(express.static('public')); // Middleware para servir archivos estáticos de la carpeta "public"
app.use(flash()); //para mostrar mensajes "flash" 
app.use(
    session({
    secret:"secret", // para una key que encripta toda la info de la sesion 
    resave:false, //esto guarda las variables de la sesion si nada cambia 
    saveUninitialized:false, // guarda los detalles si no hay sesion 
    })
);

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
