import mongoose, { Schema } from "mongoose";

const FollowSchema = mongoose.Schema(
  {
    follow_to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followed_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followed: {
      type: Number,
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
const Follow = mongoose.model("Follow", FollowSchema);
export default Follow;
