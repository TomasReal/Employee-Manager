const { AppDataSource } = require('../data-source');

const repo = () => AppDataSource.getRepository('User');

async function findByEmail(email) {
    return repo().findOne({ where: { email } });
}

async function create({ fullName, email, passwordHash }) {
    const r = repo();
    const u = r.create({ fullName, email, passwordHash });
    await r.save(u);
    return u;
}

module.exports = { findByEmail, create };
