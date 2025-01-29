import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({

    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        maxLength: 30        
    
    }


   


},{timestamps:true})

const Genre = mongoose.model("genres" , genreSchema)

export default Genre;