import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('API Running ✅'))

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})