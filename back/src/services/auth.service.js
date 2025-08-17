const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../repositories/user.repository');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';

function signToken(user) {
    return jwt.sign(
        { sub: user.id, email: user.email, fullName: user.fullName },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
    );
}

async function register({ fullName, email, password }) {
    if (!fullName || !email || !password) {
        throw { status: 400, message: 'fullName, email y password son requeridos' };
    }

    const normEmail = String(email).toLowerCase().trim();
    const existing = await users.findByEmail(normEmail);
    if (existing) throw { status: 409, message: 'Email ya está en uso' };

    const hash = await bcrypt.hash(String(password), 10);
    const user = await users.create({
        fullName: String(fullName).trim(),
        email: normEmail,
        passwordHash: hash,
    });

    const token = signToken(user);
    return { token, user: { id: user.id, fullName: user.fullName, email: user.email } };
}

async function login({ email, password }) {
    if (!email || !password) throw { status: 400, message: 'email y password son requeridos' };

    const normEmail = String(email).toLowerCase().trim();
    const user = await users.findByEmail(normEmail);
    if (!user) throw { status: 401, message: 'Credenciales inválidas' };

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) throw { status: 401, message: 'Credenciales inválidas' };

    const token = signToken(user);
    return { token, user: { id: user.id, fullName: user.fullName, email: user.email } };
}

module.exports = { register, login };
