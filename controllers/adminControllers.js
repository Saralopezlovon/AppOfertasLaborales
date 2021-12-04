// MÓDULOS
const pool = require('../pgdb');
const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync');

//HANDLER FUNCTIONS
const ads = {
    // Renderiza la pag "dashboard"
    getDashboard: catchAsync(async (req, res) => {
        const allAds = await Ad.find();
        res.status(200).render('dashboard', { allAds });
    }),

    // Muestra todos los anuncios de la BBDD de MongoDB
    getAllAds: catchAsync(async (req, res) => {
        const allAds = await Ad.find();
        res.status(200).render('dashboard', { allAds });
    }),

    // Crea un anuncio en la BBDD de MongoDB
    createAd: catchAsync(async (req, res) => {
        const newAd = await Ad.create({
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            salary: req.body.salary,
            description: req.body.description,
            image: req.body.logo,
            link: req.body.link,
        });
        res.status(200).redirect('/admin/dashboard');
    }),

    // Actualiza un anuncio en la BBDD de MongoDB
    updateAd: catchAsync(async (req, res) => {
        const entries = Object.keys(req.body);
        const updates = {}; // Objeto para llenar con los campos que queremos actualizar
        // Bucle para comprobar y actualizar sólo los campos ingresados
        for (let i = 0; i < entries.length; i++) {
            if (!Object.values(req.body)[i]) {
                continue; // Si un campo está vacío, continúa
            } else {
                updates[entries[i]] = Object.values(req.body)[i];
            }
        }
        // Actualiza los campos rellenados
        const ad = await Ad.updateOne(
            { adID: parseInt(req.body.idUpdate, 10) },
            updates,
            {
                upsert: true,
                new: true,
                runValidators: false,
            }
        );
        res.status(200).redirect('/admin/dashboard');
    }),

    // Elimina un anuncio de la BBDD de MongoDB
    deleteAd: catchAsync(async (req, res) => {
        await Ad.deleteOne({ adID: parseInt(req.body.idDelete, 10) });
        res.status(204).redirect('/admin/dashboard');
    }),

    // Muestra todos los usuarios registrados en la BBDD de PostgreSQL
    getUsers: catchAsync(async (req, res) => {
        const users = await pool.query('SELECT * FROM users');
        res.status(200).json({
            status: 'succes',
            data: { users: users.rows },
        });
    }),
};

// Aquí faltan los controladores para editar o borrar usuarios de la BBDD de PostgreSQL

module.exports = ads;
