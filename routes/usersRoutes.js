const express = require('express');
const pool = require('../pgdb');

const router = express.Router();

router.get('/', async (re, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.json({
        status: 'succes',
        data: { users: users.rows },
    });
});

module.exports = router;
