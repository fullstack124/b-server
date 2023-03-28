import mongoose, { Schema } from "mongoose";

const CourseMediaSchema = mongoose.Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
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
const CourseMedia = mongoose.model("CourseMedia", CourseMediaSchema);
export default CourseMedia;
