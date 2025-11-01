import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import homeRoutes from './routes/homeRoutes.js'


dotenv.config();


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



//
app.use('/auth',authRoutes)

app.use('/route',homeRoutes)


 
app.listen(process.env.PORT,()=>{ 
    console.log("server running at port: http://localhost:5000");
})