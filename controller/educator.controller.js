import EducatorProfile from "../models/educator.model.js";
import fs from "fs";
import Course from "../models/course.model.js";
import Joi from "joi";
import Follow from "../models/follow.model.js";

export const addEducatorProfile = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      education_background,
      experience,
      about,
      fun_fact_about,
      learn_as_a_kid,
    } = req.body;

    const file = req.files;

    const is_educator = await EducatorProfile.findOne({
      educator: req.user_id,
    }).exec();
    let profile = "";
    let video = "";

    if (file) {
      profile = req.files.profile[0].filename;
      video = req.files.video[0].filename;
    } else {
      profile = is_educator.profile;
      video = is_educator.video;
    }
    if (is_educator) {
      const result = await EducatorProfile.findByIdAndUpdate(
        { _id: is_educator._id },
        {
          first_name,
          last_name,
          education_background,
          experience,
          about,
          fun_fact_about,
          learn_as_a_kid,
          educator: req.user_id,
          profile,
          video,
        }
      );
      if (result) {
        return res.json({
          success: true,
          message: "Profile Update Successfully",
        });
      } else {
        return res.json({
          success: false,
          message: "Some problem",
        });
      }
    } else {
      const educator = new EducatorProfile({
        first_name,
        last_name,
        education_background,
        experience,
        about,
        fun_fact_about,
        learn_as_a_kid,
        educator: req.user_id,
        profile,
        video,
      });
      const result = await educator.save();
      if (result) {
        return res.json({
          success: true,
          message: "Profile Add Successfully",
        });
      } else {
        return res.json({
          success: false,
          message: "Some problem",
        });
      }
    }
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};
// export const addEducatorVideo = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const file = req.file;
//     let filename = "";
//     if (file) {
//       filename = req.file.filename;
//     } else {
//       filename = " ";
//     }
//     const course_media = await EducatorVideo.findOne({
//       educator_profile: id,
//     }).exec();
//     if (course_media) {
//       const result = await EducatorVideo.findByIdAndUpdate(
//         { _id: course_media._id },
//         {
//           video: filename,
//         }
//       );

//       if (result) {
//         return res.send({
//           success: true,
//         });
//       }
//     }
//   } catch (e) {
//     return res.json({
//       success: false,
//       message: e.message,
//     });
//   }
// };

export const addCourseData = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { micro_course, age_group, supply_list,theme } = req.body;
    const file = req.files;
    let thumbnail = "";
    if (file) {
      thumbnail = req.files.thumbnail[0].filename;
    } else {
      thumbnail = " ";
    }
    const course = new Course({
      micro_course,
      age_group,
      supply_list,
      thumbnail,
      theme,
      educator: user_id,
    });
    const result = await course.save();
    if (result) {
      return res.send({
        success: true,
        id: result._id,
        message: "course add successfully",
      });
    }
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

export const addCourseData2 = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const { micro_course1, supply_list1 } = req.body;
    const file = req.files;
    let micro_thumbnail = "";
    let micro_video = "";

    const course = await Course.findById({
      _id: id,
    }).exec();

    if (file) {
      micro_thumbnail = req.files.micro_thumbnail[0].filename;
      micro_video = req.files.micro_video[0].filename;
    } else {
      micro_thumbnail = course.micro_thumbnail;
      micro_video = course.micro_video;
    }
    if (course) {
      const result = await Course.findByIdAndUpdate(
        { _id: id },
        {
          micro_course1,
          supply_list1,
          micro_thumbnail,
          micro_video,
        }
      );
      if (result) {
        return res.send({
          success: true,
          message: "course complete successfully",
        });
      }
    }
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

// //

// export const addCourseVideo = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const file = req.file;
//     let filename = "";
//     if (file) {
//       filename = req.file.filename;
//     } else {
//       filename = " ";
//     }

//     const course_media = await CourseMedia.findOne({
//       course: id,
//     }).exec();
//     if (course_media) {
//       const result = await CourseMedia.findByIdAndUpdate(
//         { _id: course_media._id },
//         {
//           micro_video: filename,
//         }
//       );

//       if (result) {
//         return res.send({
//           success: true,
//         });
//       }
//     }
//   } catch (e) {
//     return res.json({
//       success: false,
//       message: e.message,
//     });
//   }
// };

export const getCourse = async (req, res) => {
  try {
    const educator_profile = await EducatorProfile.findOne({
      educator: req.user_id,
    }).exec();

    console.log(educator_profile);

    const course = await Course.find({
      educator: educator_profile.educator,
    }).exec();

    return res.json({
      success: true,
      educator_profile: educator_profile,
      courses: course,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { old_password, password, repeat_password } = req.body;
    const schema = Joi.object({
      old_password: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Passwords must match",
        }),
    });
    console.log(schema);
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
    }
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};




export const userFollowEducator=async(req,res)=>{
  try{
    const followed_by=req.user_id;
    const {follow_to}=req.body;
    const  is_followed=await Follow.findOne({follow_to:follow_to,followed_by:followed_by}).exec();
    if(is_followed){
      const delete_result=await Follow.findByIdAndDelete({_id:is_followed._id});
      if(delete_result){
        return res.json({
          success:true,
          message:"Unfollowed Successfully"
        })
      }
    }else{
      const follower=new Follow({
        followed_by,
        follow_to,
        followed:1,
      });
      const result=await follower.save();
      if(result){
        return res.json({
          success:true,
          message:"Followed Successfully"
        })
      }
    }
  }catch(e){

  }
}
