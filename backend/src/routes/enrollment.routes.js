import express from 'express';
import { getUserEnrollments } from '../controllers/enrollment.controller.js';

const router = express.Router();

// Get user's enrolled courses
router.get('/', getUserEnrollments);

export default router;