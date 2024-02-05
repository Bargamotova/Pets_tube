import { createError } from "../utils/error.js";
import User from '../models/User.js';
import Video from "../models/Video.js";
// import * as fs from 'fs-extra';
import * as fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

export const changeAvatar = async (req, res, next) => {
  try {
    if (!req.file) next(createError(404, "File does not exists"));

    // find user 
    const user = await User.findById(req.user.id)

    if (req.file) {
      fs.remove(`./access/${user.img}`, (err) => {
        console.log(err)
      })
    }
    const file = req.file;

    if (file.size > 500000) {
      return next(createError(422, 'File too big'))
    }
    let fileName;
    fileName = file.originalname;
    let splittedFilename = fileName.split('.');
    // console.log(file)
    let newFilename = splittedFilename[0] + uuidv4() + '.' + splittedFilename[splittedFilename.length - 1];
    fs.move(file.path, 'access/' + newFilename, { overwrite: true }, async (err) => {
      if (err) {
        console.log(err)
      }
      const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { img: newFilename }, { new: true }).select('-password')
      if (!updatedAvatar) next(createError(422, "Avatar couldn't be changed"));
      res.status(200).json(updatedAvatar)
      // console.log('IT is ok')
    })
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      ).select('-password');
      res.status(200).json(updatedUser)
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"))
  }
}
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findById(req.user.id);
      if (user.img) {
        fs.remove(`./upload/${user.img}`, (err) => {
          console.log(err)
        })
      }
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!")
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"))
  }
}
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    // const { password, ...others } = user._doc;
    res.status(200).json(user)
  } catch (err) {
    next(err);
  }
}
export const subscribe = async (req, res, next) => {

  try {
    //user id
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json('Subscriptions successful');
  } catch (error) {
    console.log(error)
    next(error);
  }
}
export const unsubscribe = async (req, res, next) => {
  try {
    //user id
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id } //other channel user id
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json('UnSubscriptions successful');
  } catch (error) {
    next(error);
  }
}
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id }

    });
    res.status(200).json("The video has been liked")
  } catch (err) {
    next(err);
  }
}
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id }

    });
    res.status(200).json("The video has been liked")
  } catch (err) {
    next(err);
  }
};



