const mongoose = require('mongoose');
const dotenv = require ('dotenv');
dotenv.config({path:'.env'});

const app = require('./app')
const port = 3000;

//MONGOOSE DB CONECTION

const DB = process.env.DATABASE

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})

.then(()=>console.log("¡Conexión establecida con MongoDB!"))

//NODE SERVER CONECTION

app.listen(port,()=>{
    console.log('¡¡Conexión exitosa!!')
})