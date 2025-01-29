import Genre from '../models/genre.model.js'
import asyncHandler from "../middleware/asyncHandler.js";


const createGenre = asyncHandler(async(req,res) =>{
  
    try{

    const {name} = req.body;

    if(!name){
        return res.json({error:'Name is Required'})
    }

    const existing = await Genre.findOne({name});

    if(existing){
        return res.status(409).json({error: 'Genre Already Existed'});
    }


    const genre = await new Genre({name}).save();

    res.json(genre);
    

    }

    catch(error){
        console.error(error)
        res.status(400).json(error);
    }

})

const updateGenre = asyncHandler(async(req,res) =>{

 

     try{

       const {id} = req.params;
 
       const {name} = req.body;

       const genre = await Genre.findOne({_id: id})

       if(!genre){
        return res.status(404).json({error: 'Genre Not Found'})
       }

       genre.name = name;

       const updatedGenre = await genre.save();

       res.json(updatedGenre)


}

catch(error){
    console.error(error);
    res.status(400).json("Internal Server Issue");
}


})

const deleteGenre = asyncHandler(async(req,res) =>{

  
  
  try{
    const {id} = req.params;
    
    const genre = await Genre.findOne({_id: id})

      if(!genre){
        return res.status(404).json('No Genre Found')
      }


   

   const deletedGenre = await genre.deleteOne();

   res.json(deletedGenre);


  }

  catch(error){
    console.log(error)
    res.status(500).json("Internal Server Issue");
  }

})


const allGenre = asyncHandler(async(req,res) =>{

  try{


    const genres = await Genre.find();

    res.status(200).json(genres);

  }

  catch(error){
   console.log(error);
   res.status(500).json("Internal Server Issue"); 
  }


})

export {createGenre , updateGenre , deleteGenre , allGenre};