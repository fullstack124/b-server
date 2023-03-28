import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config();


export const userRegister = async (req, res) => {
    try {
        const { name, email, phone_number, password, role, is_social } = req.body;
        if (is_social == 1) {
            const is_user = await User.findOne({ email: email });
            if (is_user) {
                const user_id = { user_id: is_user._id };
                const token = jwt.sign(
                    user_id,
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "1day",
                    },
                );
                return res.json({
                    'success': true,
                    'token': token,
                    'message': 'Login Successfully',
                });
                
            } else {
                const user = new User({
                    name, email, phone_number: " ", password: " ", role: role,is_social:true,
                });
                const result = await user.save();
                const user_id = { user_id: result._id };
                const token = jwt.sign(
                    user_id,
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "1day",
                    },
                );
                if (result) {
                    return res.json({
                        'success': true,
                        'token': token,
                        'message': 'Registration successful',
                    });
                } else {
                    return res.json({
                        'success': false,
                        'message': 'Some problem ',
                    });
                }
            }
        } else {
            if (!name, !email, !phone_number, !password) {
                return res.json({
                    'success': false,
                    'message': 'Please fill all the field',
                });
            } else {
                const is_user = await User.findOne({ email: email });
                if (is_user) {
                    return res.json({
                        'success': false,
                        'message': 'The email already be taken',
                    });
                } else {
                    const new_password = await bcryptjs.hash(password, 12);
                    const user = new User({
                        name, email, phone_number, password: new_password, role: role
                    });
                    const result = await user.save();
                    const user_id = { user_id: result._id };
                    const token = jwt.sign(
                        user_id,
                        process.env.SECRET_KEY,
                        {
                            expiresIn: "1day",
                        },
                    );
                    if (result) {
                        return res.json({
                            'success': true,
                            'token': token,
                            'message': 'Registration successful',
                        });
                    } else {
                        return res.json({
                            'success': false,
                            'message': 'Some problem ',
                        });
                    }
                }
            }
        }

    } catch (error) {
        return res.json({
            'success': false,
            'message': error.message,
        });
    }
}

export const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await User.findOne({ email });
        if (users) {
            const compare_password = await bcryptjs.compare(
                password,
                users.password,
            );
            if (compare_password) {
                const user_id = { user_id: users._id };
                const token = jwt.sign(
                    user_id,
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "1day",
                    },
                );
                res.cookie("user_access_token", token, {
                    httpOnly: true,
                });

                return res.json({
                    success: true,
                    token,
                    message: "Login Successfully",
                });
            } else {
                return res.json({
                    success: false,
                    message: "Invalid Username And Password",
                });
            }
        } else {
            return res.json({
                success: false,
                message: "Invalid Username And Password",
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};


// get user
export const getUser = async (req, res) => {
    try {
        const user_id = req.user_id;
        const users = await User.findById({ _id: user_id }).select("-password");
        return res.json({
            success: true,
            users: users,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};