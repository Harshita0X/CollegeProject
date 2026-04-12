import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log('Successfully connected to DB: ', conn.connection.host);
    } catch (error) {
        console.error('Error while connecting to DB', error);
        process.exit(1); //* 1 status code means fail ,0 means success 
    }
}