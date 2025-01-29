import mongoose from "mongoose";




export const connectDB = async() =>{

    try{
        await mongoose.connect('mongodb://localhost:27017/moviedb');
        console.log(`connected to the mongodb ${mongoose.connection.host}`);
    }

    catch(err){
        console.error(err);
        process.exit(1);
    }
}