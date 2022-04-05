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
				console.log('Login failed | User.js | login() method');
			}
			req.logIn(user, err => {
				if (err) next(err);
				//successful login
				//!sessionID
				// console.log(req.sessionID);
				// else {
				// req.session.loginFailed = null;
				// req.user.username = user.username;

				// return res.redirect(req.session.returnTo !== '/admin' ? req.session.returnTo || '/' : '/');
				// }
				//TODO
				//! GOT USER OBJECT NEED TO SEND COOKIES NEXT
			});
		})(req, res, next);
	}
};
