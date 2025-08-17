const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

function authMiddleware(req, res, next) {
    const header = req.header('authorization') || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Falta Authorization: Bearer <token>' });
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { id: payload.sub, email: payload.email, fullName: payload.fullName };
        next();
    } catch (_e) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = { authMiddleware };
