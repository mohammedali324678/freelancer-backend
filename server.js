import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import projectRoutes from './routes/projects.js'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT= process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected successfully"))
.catch((err)=> console.log('MongoDB connection error:', err))

//Test route
app.get('/', (req, res) => {
    res.json({message: 'freelancer API is running', version : '1.0'})
})
app.use('/projects', projectRoutes)

app.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}`)
})
