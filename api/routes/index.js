// const router = require('express').Router();
import { Router } from 'express';
import auth from './auth/auth.js';
// router.use('/auth', require('./auth/auth'));
const router = Router()
router.use('/auth', auth);

export default router;
