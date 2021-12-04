// MODULES
const pool = require('../pgdb');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');

// HANDLER FUNCTIONS
const userControllers = {
    // Registrarse como nuevo usuario
    signUp: catchAsync(async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
        const newUser = await pool.query(
            'INSERT INTO users(userName,userEmail,userPassword) VALUES($1, $2, $3) RETURNING *',
            [req.body.userName, req.body.userEmail, hashedPassword]
        );
        res.status(204).redirect('/login');
    }),

    // Login de usuario registrado
    doLogin: catchAsync(async (req, res) => {
        const { userEmail, userPassword } = req.body;
        const users = await pool.query(
            'SELECT * FROM users WHERE userEmail = $1',
            [userEmail]
        );
        // Comprueba el email
        if (users.rows.length === 0)
            return res.status(401).json({
                status: 'fail',
                message: 'El email introducido es incorrecto',
            });
        // Comprueba el password
        const validPassword = await bcrypt.compare(
            userPassword,
            users.rows[0].userpassword
        );
        if (!validPassword)
            return res.status(401).json({
                status: 'fail',
                message: 'Contraseña incorrecta',
            });

        res.status(200).redirect('/user/profile');
    }),

    // Renderiza la pag "profile" del usuario
    getProfile: catchAsync(async (req, res) => {
        res.status(200).render('profile');
    }),

    // Renderiza la pag "favorites"
    getFavorites: catchAsync(async (req, res) => {
        res.status(200).render('favorites');
    }),
};

// Aquí faltan los controladores para que el usuario pueda editar o borrar su perfil

module.exports = userControllers;
