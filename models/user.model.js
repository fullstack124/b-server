import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_accept: {
        type: Boolean,
    },
    role: {
        type: String,
        required: true,
    },
    is_social: {
        type: Boolean,
        required: true,
        default:false,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
const User = mongoose.model("User", UserSchema);
export default User;