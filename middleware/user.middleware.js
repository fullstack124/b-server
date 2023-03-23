import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export const userMiddleware = (req, res, next) => {
  try {
    const token = req.headers.user_access_token;
    if (!token) {
      return res.send({
        success: false,
        message: "unAuthorized",
      });
    }

    try {
      const { user_id } = jwt.verify(
        token,
        process.env.SECRET_KEY,
      );
      req.user_id = user_id;
    } catch (err) {
      return res.send({
        success: false,
        message: "unAuthorized",
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: "unAuthorized",
    });
  }
  next();
};