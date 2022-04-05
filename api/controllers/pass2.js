import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../schemas/UserSchema.js';

passport.use(
	new LocalStrategy({ usernameField: 'login' }, async (username, password, authCheckDone) => {
		try {
			const user = await User.findOne({ where: { login: username }, attributes: ['password', 'login', 'id'], raw: true });

			if (user === null) {
				console.log(`User not found`);
				return authCheckDone(null, false, {
					message: 'User not found'
				});
			}
			let comparedPassword = await bcrypt.compare(password, user.password);
			if (!comparedPassword) {
				return authCheckDone(null, false, {
					message: "passwords don't match"
				});
			}
			return authCheckDone(null, user);
		} catch (e) {
			console.log('Error occured', e.stack);
		}
	})
);

passport.serializeUser((user, done) => done(null, { id: user.id }));
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findOne({ where: { id }, raw: true });
		done(null, user);
	} catch (e) {
		console.log('Error occured while deserializing', e.stack);
	}
});
