// MODULES
const express = require('express');
// const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const flash = require('connect-flash');
const userInViews = require('./middlewares/userInViews');
const authRouter = require('./routes/authRoutes');
const webRouter = require('./routes/webRoutes');
const usersRouter = require('./routes/usersRoutes');
const adminRouter = require('./routes/adminRoutes');
const AppError = require('./utils/appError');
const errMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

// Configurar Passport para usar Auth0
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
            process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

const app = express();

// CONFIGURACIÓN DEL VIEW ENGINE (PUG)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //IMPORTANTE

app.use(logger('dev'));
app.use(cookieParser());
// app.use(helmet());

// config express-session
var sess = {
    secret: process.env.AUTH0_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
};

if (app.get('env') === 'production') {
    // If you are using a hosting provider which uses a proxy (eg. Heroku),
    // comment in the following app.set configuration command
    //
    // Trust first proxy, to prevent "Unable to verify authorization request state."
    // errors with passport-auth0.
    // Ref: https://github.com/auth0/passport-auth0/issues/70#issuecomment-480771614
    // Ref: https://www.npmjs.com/package/express-session#cookiesecure
    // app.set('trust proxy', 1);

    sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public'))); // Middleware para servir archivos estáticos de la carpeta "public"

app.use(flash());

// Handle auth failure error messages
app.use(function (req, res, next) {
    if (req && req.query && req.query.error) {
        req.flash('error', req.query.error);
    }
    if (req && req.query && req.query.error_description) {
        req.flash('error_description', req.query.error_description);
    }
    next();
});

app.use(userInViews());
//ROUTES
// Routes auth
app.use('/', authRouter);
// Routes Web
app.use('/', webRouter);
// Routes usuarios
app.use('/', usersRouter);
// Routes admin
app.use('/', adminRouter);

// MANEJO DE ERRORES
// Si no encuentra la ruta buscada aparece este error
app.all('*', (req, res, next) => {
    next(new AppError(`No se encuentra esta ruta:${req.originalUrl}`, 404));
});

app.use(errMiddleware);

//EXPORTAR APP PARA CONEXIÓN CON EL SERVIDOR
module.exports = app;
