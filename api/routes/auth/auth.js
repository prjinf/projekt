import { Router } from 'express';

import User from '../../models/User.js';
// import User from '../../schemas/UserSchema.js';

// import * as pass from '../../controllers/pass.js';
import * as pass from '../../controllers/pass2.js';
const router = Router();
router.post('/login', User.login);

// router.post('/login', async (req, res) => {
// 	const { id } = await User.findOne({ where: { login: req.body.login }, attributes: ['password', 'login', 'id'], raw: true });
// 	console.log(id);
// });

export default router;
