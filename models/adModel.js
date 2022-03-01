const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//SCHEMA
const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener un titulo'],
        trim: true,
    },

    company: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener una empresa'],
        trim: true,
    },

    location: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener una ubicación'],
        trim: true,
    },

    description: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener una descripción'],
        trim: true,
    },

    createdOrUpdatedAt: {
        type: Date,
        default: Date.now(),
        trim: true,
    },

    image: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener una imagen'],
        trim: true,
    },

    link: {
        type: String,
        required: [true, 'La oferta de trabajo debe tener un enlace'],
        trim: true,
    },
});

adSchema.plugin(AutoIncrement, { inc_field: 'adID' });

const Ad = mongoose.model('Ad', adSchema); //Modelo de mongoose siempre enmpieza en mayúsculas
module.exports = Ad;
