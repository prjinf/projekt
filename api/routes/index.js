import { Router } from 'express';
import User from '../models/User.js';
import auth from './auth/auth.js';
import grades from './grades.js';
import path from "path"
import { fileURLToPath } from "url"
const router = Router();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

router.get('/user', (req, res) => {
  req.isAuthenticated() ? res.json({ username: `${req.user.firstName} ${req.user.lastName}` }) : res.json(false);
});

router.get('/logout', User.logout);

router.use('/api/uczen', grades);

router.use('/auth', auth);

// router.get('*', (req, res) => res.sendFile(path.resolve(`${__dirname}/../../dist/index.html`)));

export default router;

