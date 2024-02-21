const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    Pool
} = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vivadb',
    password: '123123',
    port: '5432',
});

app.use(bodyParser.json());
app.use(cors());

const saltRounds = 10;

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password.length >= 6;
};

const validateCompanyName = (companyName) => {
    return companyName.trim() !== '';
};

const validateName = (name) => {
    return name.trim() !== '';
};

const validateSurname = (surname) => {
    return surname.trim() !== '';
};

const validatePhone = (phoneNumber) => {
    const phoneRegex = /^\+\d{3} \(\d{2}\) \d{3}-\d{3}$/;
    return phoneRegex.test(phoneNumber);
};

app.post('/signup-first', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({
            error: 'Неверный формат электронной почты'
        });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({
            error: 'Пароль должен содержать не менее 6 символов'
        });
    }

    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
        return res.status(400).json({
            error: 'Пользователь с таким email уже существует'
        });
    }

    return res.status(200).json({
        success: 'success'
    });
});

app.post('/signup-second', async (req, res) => {
    try {
        const {
            companyName,
            companyPhone
        } = req.body;

        if (!validateCompanyName(companyName) || !validatePhone(companyPhone)) {
            return res.status(400).json({
                error: 'Пожалуйста, заполните все поля корректно.'
            });
        }

        const existingCompanyName = await pool.query('SELECT * FROM providers WHERE companyname = $1', [companyName]);
        if (existingCompanyName.rows.length > 0) {
            return res.status(400).json({
                error: 'Компания с таким названием уже зарегистрирована'
            });
        }

        const existingCompanyPhone = await pool.query('SELECT * FROM providers WHERE companyphone = $1', [companyPhone]);
        if (existingCompanyPhone.rows.length > 0) {
            return res.status(400).json({
                error: 'Компания с таким номером телефона уже зарегистрирована'
            });
        }

        return res.status(200).json({
            success: 'success'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

app.post('/signup-final', async (req, res) => {
    try {
        const {
            companyName,
            companyPhone,
            providerName,
            providerSurname,
            email,
            password
        } = req.body;

        if (
            !validateCompanyName(companyName) ||
            !validatePhone(companyPhone) ||
            !validateEmail(email) ||
            !validatePassword(password) ||
            !validateName(providerName) ||
            !validateSurname(providerSurname)
        ) {
            return res.status(400).json({
                error: 'Пожалуйста, заполните все поля корректно.'
            });
        }

        const existingCompanyName = await pool.query('SELECT * FROM providers WHERE companyname = $1', [companyName]);
        if (existingCompanyName.rows.length > 0) {
            return res.status(400).json({
                error: 'Компания с таким названием уже зарегистрирована'
            });
        }

        const existingCompanyPhone = await pool.query('SELECT * FROM providers WHERE companyphone = $1', [companyPhone]);
        if (existingCompanyPhone.rows.length > 0) {
            return res.status(400).json({
                error: 'Компания с таким номером телефона уже зарегистрирована'
            });
        }

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                error: 'Пользователь с таким email уже существует'
            });
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Регистрация пользователя
        const user_role = 'provider';
        const userResult = await pool.query('INSERT INTO users (email, password, firstname, lastname, phone, username, user_role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [email, hashedPassword, providerName, providerSurname, companyPhone, companyName, user_role]);
        const newUser = userResult.rows[0];

        // Регистрация компании
        const companyResult = await pool.query(
            'INSERT INTO providers (companyname, companyphone, userid) VALUES ($1, $2, $3) RETURNING *',
            [companyName, companyPhone, newUser.userid]
        );
        const newCompany = companyResult.rows[0];

        return res.status(200).json({
            success: 'success',
            user: newUser,
            company: newCompany
        });
    } catch (error) {
        console.error('Ошибка при регистрации:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});