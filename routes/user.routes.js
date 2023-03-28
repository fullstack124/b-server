import multer from "multer";
import {
  addCourseData,
  addCourseData2,
  addEducatorProfile,
  changePassword,
  getCourse,
  userFollowEducator,
} from "../controller/educator.controller.js";
import {
  getUser,
  signInUser,
  userRegister,
} from "../controller/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + "-" + file.fieldname + "." + extension);
  },
});

const upload = multer({ storage: storage });

export default (app) => {
  app.post("/user/register", userRegister);
  app.post("/user/login", signInUser);
  app.get("/user/users", userMiddleware, getUser);

  //   educator profile
  app.post(
    "/educator/profile",
    userMiddleware,
    upload.fields([
      {
        name: "profile",
      },
      {
        name: "video",
      },
    ]),
    addEducatorProfile
  );
  app.post(
    "/educator/course",
    userMiddleware,
    upload.fields([
      {
        name: "thumbnail",
      },
    ]),
    addCourseData
  );

  app.post(
    "/educator/course/:id",
    userMiddleware,
    upload.fields([
      {
        name: "micro_thumbnail",
      },
      {
        name: "micro_video",
      },
    ]),
    addCourseData2
  );
  app.get("/educator/get/course", userMiddleware, getCourse);
  app.post("/educator/change/password", userMiddleware, changePassword);
  app.post("/educator/followed", userMiddleware, userFollowEducator);
};
