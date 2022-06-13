import { Router } from 'express';
import User from '../../models/User.js';
import * as pass from '../../controllers/pass.js';
const router = Router();
router.post('/login', User.login);

export default router;
