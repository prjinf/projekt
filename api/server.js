import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { Sequelize } from 'sequelize';
import config from './config.js';
import { User, Grade } from './schemas/index.js';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import passport from 'passport';
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: config.sessionSecret,
		resave: false,
		saveUninitialized: false,
		key: 'usess',
		cookie: { maxAge: 2592000000 }
	})
);
app.use(passport.initialize());
app.use(passport.session());

const sequelize = new Sequelize(config.DB_CONFIG.database, config.DB_CONFIG.username, config.DB_CONFIG.password, {
	dialect: config.DB_CONFIG.dialect,
	host: config.DB_CONFIG.host
});

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database @@@@@@@');
} finally {
	await sequelize.close();
}
// const used = process.memoryUsage().heapUsed / 1024 / 1024;
// console.log(`Main uses approximately ${Math.round(used * 100) / 100} MB`);
app.use('/', routes);
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
