// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const { compare } = require('bcryptjs');

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { compare } from 'bcryptjs';

passport.use(
	new LocalStrategy((username, password, authCheckDone) => {
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

				let comparedPassword = await compare(password, user.password);

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
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
	db.execute('SELECT id,username FROM users WHERE id=?', [id], (err, user) => done(err, user));
});
