import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import projectRoutes from './routes/projects.js'

dotenv.config()

const app = express()
const PORT= process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())

//Test route
app.get('/', (req, res) => {
    res.json({message: 'freelancer API is running', version : '1.0'})
})
app.use('/projects', projectRoutes)

app.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}`)
})
