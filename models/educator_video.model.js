import mongoose, { Schema } from "mongoose";

const EducatorVideoSchema = mongoose.Schema(
  {
    educator_profile: {
      type: Schema.Types.ObjectId,
      ref: "Educator",
      required: true,
    },
    video: {
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
const EducatorVideo = mongoose.model("EducatorVideo", EducatorVideoSchema);
export default EducatorVideo;
