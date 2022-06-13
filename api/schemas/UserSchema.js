import { Sequelize, DataTypes as types } from 'sequelize';
import config from '../config.js';
const sequelize = new Sequelize(config.DB_CONFIG.database, config.DB_CONFIG.username, config.DB_CONFIG.password, {
	dialect: config.DB_CONFIG.dialect,
	host: config.DB_CONFIG.host
});

const User = sequelize.define(
	'User',
	{
		id: {
			type: types.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstName: {
			type: types.STRING,
			allowNull: false
		},
		lastName: {
			type: types.STRING,
			allowNull: false
		},
		login: {
			type: types.STRING,
			allowNull: false
		},
		password: {
			type: types.STRING,
			allowNull: false
		},
		role: {
			type: types.STRING,
			allowNull: false,
			defaultValue: 'user'
		},
		created_at: {
			type: types.DATE,
			defaultValue: types.NOW
		},
		last_online: {
			type: types.DATE,
			defaultValue: types.NOW
		}
	},
	{
		timestamps: false,
		tableName: 'users'
	}
);
// User.sync({ alter: true });
export default User;
