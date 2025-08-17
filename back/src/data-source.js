require('dotenv').config();
const { DataSource } = require('typeorm');
const Employee = require('./entity/Employee');
const User = require('./entity/User');

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    dropSchema: false,
    entities: [Employee, User],
});

module.exports = { AppDataSource };