import express from 'express';
import { Login, Logout, Signup } from '../controllers/Auth.controller.js';
import { protectedRoute } from '../middlewares/Auth.middleware.js';

const router = express.Router();

router.post('/signup', Signup);

router.post('/login', Login);

router.post('/logout', Logout);

router.get('/check', protectedRoute, (req, resp) => resp.status(200).json({ success: true, message: 'Successfully validated the user!', data: req.user }));


export default router;