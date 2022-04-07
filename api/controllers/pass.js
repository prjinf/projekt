// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const { compare } = require('bcryptjs');

import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../schemas/UserSchema.js';

passport.use(
	new LocalStrategy({ usernameField: 'login' }, (username, password, authCheckDone) => {
		db.execute(
			'SELECT username, email, password, id FROM users WHERE (username=?) OR (email=?)',
			[username, username],
			async (error, user) => {
				user = user[0];
				if (error) return authCheckDone(error);

				if (!user)
					return authCheckDone(null, false, {
						message: loginFailMessage
					});

				let comparedPassword = await bcrypt.compare(password, user.password);

				if (!comparedPassword) {
					return authCheckDone(null, false, {
						message: loginFailMessage
					});
				}
				return authCheckDone(null, user);
			}
		);
	})
);
passport.serializeUser((user, done) => done(null, { id: user.id, username: user.login }));
passport.deserializeUser((id, done) => {
	db.execute('SELECT id,username FROM users WHERE id=?', [id], (err, user) => done(err, user));
});
