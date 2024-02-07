import express from 'express';
import { changeAvatar, deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from '../controllers/user.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// update user 
router.put('/:id', verifyToken, update)
router.post("/change-avatar", verifyToken, changeAvatar)
// delete user 
router.delete('/:id', verifyToken, deleteUser)
// get a user 
router.get('/find/:id', getUser)
// subscribe a user 
router.put('/sub/:id', verifyToken, subscribe)
// unsubscribe a user 
router.put('/unsub/:id', verifyToken, unsubscribe)
// like a video 
router.put('/like/:videoId', like)
// dislike a video
router.put('/dislike/:videoId', dislike)




export default router;
