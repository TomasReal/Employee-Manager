const express = require('express');
const cors = require('cors');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const employeesRouter = require('./routes/employees.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/employees', employeesRouter);
app.use('/auth', require('./routes/auth.routes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
