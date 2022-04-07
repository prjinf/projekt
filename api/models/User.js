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
				if (err) return next(err);
				//successful login
				const cookie = req.session.cookie;
				const cookieString = `usess=${req.sessionID}; expires=${cookie._expires}; HttpOnly`;
				console.log(req.session);
				console.log(cookieString);
				// res.cookie('usess', req.sessionID, { ...req.session.cookie, domain: 'localhost:3000' });
				res.end('ok');
				// res.json(cookieString);

				// else {
				// req.session.loginFailed = null;
				// req.user.username = user.username;

				// return res.redirect(req.session.returnTo !== '/admin' ? req.session.returnTo || '/' : '/');
				// }
			});
		})(req, res, next);
	}
};
