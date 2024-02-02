import express from 'express';
import { googleAuth, signIn, signup } from '../controllers/auth.js';
const router = express.Router();

// CREATE A USER

router.post('/signup', signup)

// SIGN IN 
router.post('/signIn', signIn)
// GOOGLE AUTH 
router.post('/google', googleAuth)



export default router;
