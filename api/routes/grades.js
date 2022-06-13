//! /api/uczen
import { Router } from 'express';
import Grade from '../models/Grade.js';

const router = Router();

router.post('/add-grade', Grade.addNewGrade);

router.get('/grades/lib', Grade.getGradesLibrus);

export default router;
