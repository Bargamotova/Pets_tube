import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import multer from 'multer';
import userRoute from './routes/users.js';
import commentRoute from './routes/comments.js';
import videoRoute from './routes/videos.js';
import authRoute from './routes/auth.js';
import cookieParser from 'cookie-parser';

import cors from 'cors';

const app = express();
const opt = {
  origin: 'http://pets-tube-front.vercel.app',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(opt));
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('Mongo OK'))
  .catch((err) => { throw err });

//  images
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "access");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png|webp)$/)) {
      return cb(new Error('Please upload an image file'))
    }
    cb(null, true)
  }
});
app.use('/access', express.static("access"))
app.use(upload.single('file'));



app.use(cookieParser());


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/videos', videoRoute);
app.use('/api/v1/comments', commentRoute);
app.get('/api/v1/', (req, res) => res.json({ message: 'Okay' }))


app.use((err, req, res, __) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong !";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const port = process.env.URL || 8800;
app.listen(port, (err) => {
  err ? console.log(err) : console.log('Server OK');
});



