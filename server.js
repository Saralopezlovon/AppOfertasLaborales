// MÓDULOS
const mongoose = require('mongoose');
const dotenv = require('dotenv'); //Aqui llamamos al módulo dotenv para usar variables de entorno.
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = require('./app');

const PORT = 3000;

dotenv.config({ path: '.env' });

// OPCIONES CORS
const corsOptions = { credentials: true, origin: process.env.URL || '*' };

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(cookieParser());

// CONECCIÓN CON MONGODB
const DB = process.env.DATABASE_MONGODB_URL;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    .then(() => console.log('¡Conexión establecida con MongoDB!'));

//CONECCIÓN CON EL SERVIDOR
app.listen(PORT, () => {
    console.log('¡¡Conexión exitosa con el servidor!!');
});
