import express from 'express'
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import genreRoute from './routes/genreRoute.js'
import movieRoute from './routes/movieRoute.js'



const app = express();

app.use(cookieParser())
app.use(cors({
    origin: 'https://movies-app-frontend-chi.vercel.app', // Change this to your front-end URL
    credentials: true // Allow credentials (cookies)
}));
app.use(express.json());


app.get('/' , (req,res) =>{
    res.json('This is coming from backend')
})

app.use('/api/v1/users' , userRoute);
app.use('/api/v1/genres' , genreRoute);
app.use('/api/v1/movies' , movieRoute);



app.listen(8000 , ()=>{
   connectDB()
    console.log("Connected to the backend")
})
