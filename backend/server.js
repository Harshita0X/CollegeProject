import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dbConnect } from './src/config/db.js'
import authRoutes from './src/routes/Auth.route.js'
import bookingRoutes from './src/routes/Booking.route.js'
import notificationRoutes from './src/routes/Notification.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/notifications', notificationRoutes)

app.get('/', (req, res) => res.send('API Running ✅'))

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  dbConnect()
})