
import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest.js';
import {
  createRequirement,
  getAllRequirements,
} from './requirement.controller.js';
import { createRequirementValidationSchema } from './requirement.validation.js';

const router = Router();

// Create requirement
router.post(
  '/',
  validateRequest(createRequirementValidationSchema),
  createRequirement
);

// Get all requirements
router.get('/', getAllRequirements);

export const requirementRoutes = router;

