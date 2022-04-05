import User from './UserSchema.js';
import Grade from './GradeSchema.js';
import { Sequelize } from 'sequelize';
import config from '../config.js';
const sequelize = new Sequelize(config.DB_CONFIG.database, config.DB_CONFIG.username, config.DB_CONFIG.password, {
	dialect: config.DB_CONFIG.dialect,
	host: config.DB_CONFIG.host
});
User.hasMany(Grade, {
	foreignKey: 'user_id'
});
Grade.belongsTo(User);

// User.sync({ alter: true });
// Grade.sync({ alter: true });

export { User, Grade };
