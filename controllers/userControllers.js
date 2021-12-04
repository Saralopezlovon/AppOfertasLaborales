// MODULES
const pool = require('../pgdb');
const catchAsync = require('../utils/catchAsync');

const userControllers = {
    getUsers: catchAsync(async (req, res) => {
        const users = await pool.query('SELECT * FROM users');
        res.json({
            status: 'succes',
            data: { users: users.rows },
        });
    }),
};

module.exports = userControllers;
