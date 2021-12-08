const jwt = require('jsonwebtoken');
const express = require('express');
const pool = require('../pgdb');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

const validateToken = async (req, res, next) => {
    console.log(req.cookiesOptions);
    if (req.cookiesOptions.jwtCookie) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookiesOptions.jwtCookie,
                process.env.JWT_SECRET
            );
            await pool.query(
                'SELECT * FROM users WHERE id = $1',
                [decoded.id],
                (error, results) => {
                    if (!results) {
                        return next();
                    }
                    req.user = results[0];
                    return next();
                }
            );
        } catch (err) {
            console.log(err);
            return next();
        }
    } else {
        res.redirect('/admin/login');
    }
};

module.exports = validateToken;
