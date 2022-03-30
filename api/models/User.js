// const passport = require("passport")
import passport from 'passport';

export default {
	logout(req, res) {
		req.session.destroy();
		res.clearCookie('usess');
		req.logout();
		res.redirect('/');
	},
	login(req, res, next) {
		passport.authenticate('local', (error, user, info) => {
			if (error) return next(err);
			if (!user) {
				req.session.message = [info.message];
				req.session.loginFailed = true;
				return res.redirect('/login');
			}
			req.logIn(user, err => {
				if (err) next(err);
				//successful login
				else {
					req.session.loginFailed = null;
					req.user.username = user.username;

					return res.redirect(req.session.returnTo !== '/admin' ? req.session.returnTo || '/' : '/');
				}
			});
		})(req, res, next);
	},
	async getUser() {


	

		// await db.write();
	}
};
