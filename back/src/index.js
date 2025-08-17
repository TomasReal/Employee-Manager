require('reflect-metadata');
require('dotenv').config();
const app = require('./app');
const { AppDataSource } = require('./data-source');

const must = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME'];
const missing = must.filter(k => !process.env[k] || process.env[k].trim() === '');
if (missing.length) throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
    .then(() => {
        console.log('✅ DB conectada');
        app.listen(PORT, () => console.log(`🚀 API http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('❌ Error al conectar DB:', err);
        process.exit(1);
    });
