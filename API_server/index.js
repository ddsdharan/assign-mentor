import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import mentorRouter from './Routes/mentorRouter.js'
import studentRouter from './Routes/studentRouter.js'
import assignStudents from './Routes/assignStudents.js'
import assignMentor from './Routes/assignMentor.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/mentors', mentorRouter)
app.use('/students', studentRouter)
app.use('/assign-students', assignStudents)
app.use('/assign-mentor', assignMentor)

app.use('/', (req, res) => {
    res.send('Welcome to student mentor API')
})

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server is listening on Port: ${PORT}`))