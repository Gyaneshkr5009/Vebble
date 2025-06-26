import express from 'express';
//this route we decalre is used to know user is authenticated or not
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

//this route will be used to get all users for the sidebar
router.get('/users', protectRoute , getUsersForSidebar);
//this route will be used to get the messages between two users
router.get('/:id' , protectRoute, getMessages);

//this route will be used to send a message
router.post('/send/:id', protectRoute, sendMessage); // Assuming you have a sendMessage controller

export default router;