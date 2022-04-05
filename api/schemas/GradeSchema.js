import { Sequelize, DataTypes as types } from 'sequelize';
import config from '../config.js';
const sequelize = new Sequelize(config.DB_CONFIG.database, config.DB_CONFIG.username, config.DB_CONFIG.password, {
	dialect: config.DB_CONFIG.dialect,
	host: config.DB_CONFIG.host
});

const Grade = sequelize.define(
	'Grade',
	{
		user_id: {
			type: types.INTEGER,
			allowNull: false
		},
		value: {
			type: types.TINYINT,
			allowNull: false
		}
	},
	{
		tableName: 'grades'
	}
);

export default Grade;
