// MÓDULOS
const pool = require('../pgdb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync');

//HANDLER FUNCTIONS
const ads = {
    // Renderiza la pag "login" del admin
    getAdminLogin: catchAsync(async (req, res) => {
        res.status(200).render('adminlogin');
    }),

    // Comprobar si el usuario introducido es admin para poder entrar
    doAdminLogin: catchAsync(async (req, res) => {
        const { userEmail, userPassword } = req.body;
        const userInfo = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [userEmail]
        );
        // Comprueba el emails
        if (userInfo.rows.length === 0)
            return res.status(401).json({
                status: 'fail',
                message: 'El email introducido es incorrecto',
            });
        // Comprueba el password
        const validPassword = await bcrypt.compare(
            userPassword,
            userInfo.rows[0].password
        );
        if (!validPassword)
            return res.status(401).json({
                status: 'fail',
                message: 'Contraseña incorrecta',
            });
        if (userInfo.rows[0].isadmin) {
            // Generamos el token
            const userId = userInfo.rows[0].id;
            const accesToken = jwt.sign(
                { id: userId },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRATION_TIME,
                }
            );
            console.log(accesToken);

            // Configuramos las cookies
            const cookiesConfig = {
                expires: new Date(
                    Date.now() +
                        process.env.JWT_COOKIE_EXPIRATION_TIME *
                            24 *
                            60 *
                            60 *
                            1000
                ),
            };

            res.cookie('jwtCookie', accesToken, cookiesConfig);
            res.redirect('/admin/dashboard');

            // res.redirect('/admin/dashboard');
        } else {
            return res.status(401).json({
                status: 'fail',
                message: 'No eres un administrador',
            });
        }
    }),

    // Renderiza la pag "dashboard"
    getDashboard: catchAsync(async (req, res) => {
        const allAds = await Ad.find();
        res.status(200).render('dashboard', { adminName: 'TSR Admin', allAds });
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
        const { id, email, created } = users;
        res.status(200).render('users', { users: users.rows });
        console.log(users.rows);
    }),

    // Borrar usuarios segun su ID
    deleteUser: catchAsync(async (req, res) => {        
        const {idDelete} = req.body;
        const deleteUser = await pool.query(
            `DELETE FROM users WHERE id=$1 `,
            [idDelete]
        );
        console.log(deleteUser.rows);
        res.status(200).redirect('/admin/users');
    }),


    // //EDITAR LOS DATOS DE UN USUARIO COMO ADMIN-> segun el id
    // updateUser: catchAsync(async (req, res) => {
    //         let client, result;

    //         client = await pool.connect(); // Espera a abrir conexion
    //         const {idUpdate, nicknameUpdate, emailUpdate, passwordUpdate} = req.body
    //         const data = await client.query(`UPDATE users SET nickname=$1 , email=$2, password=$3, picture=$4 WHERE id=$5`, [nicknameUpdate, emailUpdate, passwordUpdate, idUpdate])
    //         result = data.rowCount
    //         client.release();
    //         res.status(200).render('user', {result});
    // }),
};

// UPDATE public.users SET nickname='Bobby', email='bob@changed.es', password='1111', avatar='?' WHERE id=2;

module.exports = ads;
