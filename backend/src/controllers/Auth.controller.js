import bcrypt from 'bcryptjs';
import User from "../models/User.model.js";
import { generateToken } from '../utils/generateToken.js';
import dotenv from 'dotenv';
dotenv.config();


export const Signup = async (req, resp) => {
    try {
        const { name, email, password, role } = req.body;

        // Verifying

        if (!name || !email || !password) {
            return resp.status(400).json({
                success: false,
                message: 'All fields are required!'
            });
        };

        if (password.length < 6) {
            return resp.status(400).json({
                success: false,
                message: 'Password must be greater than 6 characters!'
            });
        };

        // check if emailis valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return resp.status(400).json({ message: "Invalid email format" });
        }

        // Checking if user exists
        const user = await User.findOne({ email });
        if (user) {
            return resp.status(400).json({
                success: false,
                message: 'User already present'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const normalizedRole = role?.toLowerCase?.() || 'student';
        if (!['student', 'faculty'].includes(normalizedRole)) {
            return resp.status(400).json({
                success: false,
                message: 'Invalid role selected for signup'
            });
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: normalizedRole,
        });

        generateToken(newUser._id, resp);


        return resp.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
                role: newUser.role,
            }
        });

    } catch (error) {
        console.log('Error in Signup controller: ', error);
        return resp.status(500).json({
            success: false,
            message: 'Internal Server error!'
        });
    }

}

export const Login = async (req, resp) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return resp.status(400).json({
                success: false,
                message: 'All fields are required!'
            });
        };


        const findUser = await User.findOne({ email });


        if (!findUser) {
            return resp.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            });
        };

        const checkPass = await bcrypt.compare(password, findUser?.password);

        if (!checkPass) {
            return resp.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const normalizedRole = role?.toLowerCase?.();
        if (normalizedRole && !['student', 'faculty'].includes(normalizedRole)) {
            return resp.status(400).json({
                success: false,
                message: 'Invalid role provided'
            });
        }

        const effectiveRole = findUser.role || (findUser.rollNo ? 'student' : 'faculty');

        if (normalizedRole && effectiveRole !== normalizedRole) {
            return resp.status(403).json({
                success: false,
                message: `This account is not registered as ${normalizedRole}`
            });
        }

        // Generating token
        generateToken(findUser._id, resp);

        return resp.status(201).json({
            success: true,
            message: 'Successfully logged in the user',
            data: {
                _id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                profilePic: findUser.profilePic,
                role: effectiveRole,
            }
        });

    } catch (error) {
        console.log('Error in Signup controller: ', error);
        return resp.status(500).json({
            success: false,
            message: 'Internal Server error!'
        });
    }

}

export const Logout = (_, resp) => {
    resp.cookie('jwt', '', { maxAge: 0 });
    return resp.status(200).json({
        success: true,
        message: 'Successfully Logged out!'
    })

}
