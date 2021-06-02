import express from 'express';
const router = express.Router();
import * as auth from '../controllers/auth.js';
import * as v from '../validators/user.js';

router.post(
	'/register',
	auth.registerUser,
	v.validateRegisterRequest,
	v.isRequestValidated
);

router.post(
	'/login',
	auth.login,
	v.validateRegisterRequest,
	v.isRequestValidated
);


export default router;
