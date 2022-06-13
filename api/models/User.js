// const passport = require("passport")
import passport from 'passport';

export default {
	logout(req, res) {
		req.session.destroy();
		res.clearCookie('usess');
		req.logout();
		res.end()
	},
	login(req, res, next) {
		passport.authenticate('local', (error, user, info) => {
			if (error) return next(err);
			if (!user) {
				req.session.message = [info.message];
				req.session.loginFailed = true;
				console.log('Login failed | User.js | login() method');
				res.json({ message: 'Login lub hasło jest nieprawidłowe' });
				return false;
			}

			req.logIn(user, err => {
				if (err) return next(err);
				//successful login
				res.json({ username: `${req.user.firstName} ${req.user.lastName}` });
			});
		})(req, res, next);
	}
};
