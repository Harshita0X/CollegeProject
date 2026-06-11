import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/User.model.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to Database!');

        const adminEmail = 'admin@mait.edu';
        
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        
        if (existingAdmin) {
            console.log('Admin already exists! You can log in with:');
            console.log('Email:', adminEmail);
        } else {
            // Create new admin
            const hashedPassword = await bcrypt.hash('secretadmin123', 12);
            
            await User.create({
                name: 'Super Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            });
            
            console.log('✅ Success! Admin account created secretly.');
            console.log('Email: admin@mait.edu');
            console.log('Password: secretadmin123');
        }

        process.exit();
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
