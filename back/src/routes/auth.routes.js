const express = require('express');
const router = express.Router();
const { register, login } = require('../services/auth.service');
const { authMiddleware } = require('../middlewares/auth');

router.post('/register', async (req, res, next) => {
    try {
        const out = await register(req.body);
        res.status(201).json(out);
    } catch (err) { next(err); }
});

router.post('/login', async (req, res, next) => {
    try {
        const out = await login(req.body);
        res.json(out);
    } catch (err) { next(err); }
});

router.get('/me', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
