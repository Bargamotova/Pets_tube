import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token)
  if (!token) next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  })
}
export const verifyAccessToken = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (!token) next(createError(401, "You are not authenticated!!!"));

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      req.userId = decoded._id;
      next();
    } catch (error) {
      console.log(error)
      return res.status(403).json({ message: "You don't have access!!!" })
    }
  }
}
