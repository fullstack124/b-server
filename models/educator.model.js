import mongoose, { Schema } from "mongoose";

const EducatorSchema = mongoose.Schema({
    educator: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    education_background: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    fun_fact_about: {
        type: String,
        required: true,
    },
    learn_as_a_kid: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
    },
    video: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
const EducatorProfile = mongoose.model("EducatorProfile", EducatorSchema);
export default EducatorProfile;