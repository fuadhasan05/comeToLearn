import express from 'express';
import {
  getModulesByCourse,
  getModuleById,
  createModule,
  updateModule,
  deleteModule
} from '../controllers/module.controller.js';

const router = express.Router();

// Public routes
router.get('/', getModulesByCourse);
router.get('/:id', getModuleById);

// Temporary public routes for testing
router.post('/', createModule);
router.put('/:id', updateModule);
router.delete('/:id', deleteModule);

export default router; 