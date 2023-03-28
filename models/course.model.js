import mongoose, { Schema } from "mongoose";

const CourseSchema = mongoose.Schema(
  {
    educator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    micro_course: {
      type: String,
      required: true,
    },
    micro_course1: {
      type: String,
      required: false,
    },
    age_group: {
      type: String,
      required: true,
    },
    supply_list: {
      type: Object,
      required: true,
    },
    supply_list1: {
      type: Object,
      required: false,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: false,
    },
    micro_thumbnail: {
      type: String,
      required: false,
    },
    micro_video: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Course = mongoose.model("Course", CourseSchema);
export default Course;
