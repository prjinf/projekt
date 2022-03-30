// const router = require('express').Router();
// const url = require('url');
// const lowdb = require('lowdb');
import { Router } from 'express';
import User from '../../models/User.js';
User.getUser();
const router = Router();
router.post('/login', (req, res) => {
	console.log(req.body);
});

export default router;
