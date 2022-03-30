import { type } from 'express/lib/response';
import { Sequelize, DataTypes as types } from 'sequelize';
const sequelize = new Sequelize(config.DB_CONFIG.db_name, config.DB_CONFIG.username, config.DB_CONFIG.password, {
	host: config.DB_CONFIG.host,
	dialect: config.DB_CONFIG.dialect
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
		password: {
			type: types.STRING,
			allowNull: false
		},
		rank: {
			type: types.STRING,
			allowNull: false
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

export default User;
