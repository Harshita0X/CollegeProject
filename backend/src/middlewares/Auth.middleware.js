import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
dotenv.config();

export const protectedRoute = async (req, resp, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return resp.status(401).json({
                success: false,
                message: 'Token not found!'
            });
        };

        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecoded) {
            return resp.status(401).json({
                success: false,
                message: 'Token is invalid'
            });
        };


        // Now we have fully decoced token
        const checkForUser = await User.findById(tokenDecoded.userId);

        if (!checkForUser) {
            return resp.status(404).json({
                success: false,
                message: 'User not found!'
            });
        };

        // console.log("USer details fetched from token: ", checkForUser);

        // Adding the user obj in the req so that the controllers after this middleware could use that obj.
        req.user = checkForUser;
        next();
    } catch (error) {
        console.log('Error while verifying the token', error);
        return resp.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });

    }
}

export const isAdmin = (req, resp, next) => {
    // We already have req.user from the protectedRoute middleware
    if (req.user && req.user.role === 'admin') {
        next(); // Let them pass
    } else {
        return resp.status(403).json({
            success: false,
            message: 'Access denied. Admin resources only.'
        });
    }
};