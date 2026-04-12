import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/Auth.route.js';
import { dbConnect } from './config/db.js';

const app = express();

const PORT = process.env.PORT || 3000;
dotenv.config({ silent: true });


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true //Allows cookies to BD
}));

// Routes
//TODO: Add Routes here
app.use('/api/auth', authRoutes);


// Initializing the server
app.get('/', (_, resp) => resp.send('Server is up and running successfully!'));

app.listen(PORT, () => {
    console.log(`Server started and is running on the port: ${PORT}`)
    //TODO: Add DBConnection here
    dbConnect();
});