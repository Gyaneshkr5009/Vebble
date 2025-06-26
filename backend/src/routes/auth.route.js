import express from 'express';
import { signup , login ,logout , updateProfile , checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

//for signup, login and logout routes
router.post('/signup', signup);

router.post('/login', login);

router.post("/logout", logout);

//need one more route for updating profile pic,
//we are using protectRoute prerequisite middleware to check if the user is authenticated then we call the updateProfile controller
router.put('/update-profile', protectRoute , updateProfile);

//if the user is authenticated, we will check if the user is authenticated or not
/* (why needed this check router)
  Imagine this: user logs in, gets a JWT in cookies, closes tab, returns 2 days later.
  Browser still has the token, but is it valid? Is it expired? Does the user still exist?
 💡This /check route answers all that — it verifies the token + fetches user info if valid.

 This way, the frontend can know if the user is still logged in or needs to log in again.// ✅ Used to verify if the user is still logged in by validating the JWT from cookies
 ✅ Frontend calls this on page load to confirm authentication and fetch user info
 ✅ protectRoute ensures token is valid and user exists before responding
*/
router.get('/check' , protectRoute, checkAuth);

export default router;