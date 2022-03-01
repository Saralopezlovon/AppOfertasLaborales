// MÓDULOS
const mongoose = require('mongoose');
const dotenv = require('dotenv'); //Aqui llamamos al módulo dotenv para usar variables de entorno.

const app = require('./app');

const PORT = 3000;

dotenv.config({ path: '.env' });

// CONECCIÓN CON MONGODB
const DB = process.env.DATABASE;

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
