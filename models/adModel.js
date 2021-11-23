const mongoose = require('mongoose');

//SCHEMA
const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener un titulo'],
        trim:true
    },

    company: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener una empresa'],
        trim:true
    },

    location: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener una ubicación'],
        trim:true
    },

    salary: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener un salario establecido'],
        trim:true
    },
    description: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener una descripción'],
        trim:true
    },

    createdAt: {
        type: Date,
        default: Date.now(),      
        trim: true
    },

    imagen: {
        type: String,      
        required: [true, 'La oferta de trabajo debe tener una imagen'],
        trim: true
    },

    link: {
        type: String,        
        required: [true, 'La oferta de trabajo debe tener un enlace'],
        trim: true
    },
    
})

const Ad = mongoose.model('Ad', adSchema) //Modelo de mongoose siempre enmpieza en mayúsculas
module.exports = Ad