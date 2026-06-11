import express from 'express';
import { getMyNotifications, markAsRead, markAllAsRead } from '../controllers/Notification.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectedRoute); // All notification routes require authentication

router.get('/', getMyNotifications);
router.put('/:id/read', markAsRead);
router.put('/read-all', markAllAsRead);

export default router;
