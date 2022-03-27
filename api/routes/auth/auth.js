const router = require('express').Router();

router.post('/login', (req, res) => {
	console.log('received request to /auth/login');
});

module.exports = router;
