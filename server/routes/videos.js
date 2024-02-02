import express from 'express';
import { addVideo, addView, deleteVideo, getByTag, getRandomVideos, getSubVideos, getTrendVideos, getUserVideos, getVideo, search, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//create a video 
router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);

router.get('/find/:id', getVideo);

router.put('/view/:id', addView);
router.get('/personal/:id', getUserVideos)
router.get('/trend', getTrendVideos);
router.get('/random', getRandomVideos);
router.get('/subscriptions', verifyToken, getSubVideos);

router.get('/tags', getByTag);
router.get('/search', search);


export default router;
