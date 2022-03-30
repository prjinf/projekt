// const express = require('express');
// const cors = require('cors');

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { Sequelize } from 'sequelize';
import config from './config.js';
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.urlencoded({ extended: true }));
const sequelize = new Sequelize(config.DB_CONFIG.db_name, config.DB_CONFIG.username, config.DB_CONFIG.password, {
	host: config.DB_CONFIG.host,
	dialect: config.DB_CONFIG.dialect
});

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

app.use('/', routes);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
