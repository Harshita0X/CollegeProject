import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        default: 'student',
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        unique: true,
        sparse: true,
    },

    bio: {
        type: String,
        default: '',
        maxLength: 200
    },

    verified: {
        type: Boolean,
        default: false
    },

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    profilePic: {
        type: String,
        default: ''
    },


    rollNo: {
        type: Number,
        default: null,
        index: true
    },


}, { timestamps: true }); //createdAt & updatedAt

const User = mongoose.model('User', userSchema);
export default User;