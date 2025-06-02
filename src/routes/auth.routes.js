import { Router } from 'express';
import authController from '../controllers/authController.js';
import { validateRequest } from '../middlewares/validateRequest.js'
import { userRegisterSchema, userLoginSchema } from '../validations/userValidation.js';

const router = Router();

router.post('/register', validateRequest(userRegisterSchema), authController.register);
router.post('/login', validateRequest(userLoginSchema), authController.login);

export default router;
