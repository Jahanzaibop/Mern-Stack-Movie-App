import Movie from "../models/movie.model.js";



const addMovie =  async(req,res) =>{

    try{
    
    const newMovie =  new Movie(req.body)
    const savedMovie = await newMovie.save(); 
    
    res.json(savedMovie)
   
    
    }

    catch(error){
       
     console.error(error)
     res.status(400).json(error);

    }

    



}


const getSpecificMovies = async(req,res) =>{

    try{
    
     const {id} = req.params;

     const specificMovie  = await Movie.findById(id);

     if(!specificMovie){
          return res.status(404).json('Movie Not Found')
     }

     res.json(specificMovie);


    }
    
    catch(error){
    
     res.status(400).json(error.message)

    }

}


const getAllMovies = async(req,res) =>{

    try{
    
     const allMovies = await Movie.find();

     res.json(allMovies);

    }
    
    catch(error){

     res.status(400).json({error: error.message})

    }


}


const updatedMovie = async(req,res) =>{

     try{

       const {id} = req.params;
       const movieUpdate = await Movie.findByIdAndUpdate(id , req.body ,{new:true}) 
       
       if(!movieUpdate){
          return res.status(404).json('Movie Not Found')
       }

       res.json(movieUpdate);


     }

     catch(error){
    
          res.status(400).json({error:error.message})

     }

}


const addReview = async(req, res) =>{

    try{

        const {rating , comment} = req.body;

        const movie = await Movie.findById(req.params.id);
       
        if(movie){
            const alreadyReviewed = movie.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()

            );


            if(alreadyReviewed) {

                res.status(400)
                throw new Error('Movie Already Reviewed')
            }


            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user.id
            }

            movie.reviews.push(review)
            movie.numReview = movie.reviews.length
            movie.rating = movie.reviews.reduce((acc ,item)=> item.rating + acc, 0) / movie.reviews.length

         
           await movie.save();
           
           res.status(200).json("Review Has Been Added")

        }

        else{
        res.status(404).json("Movie Not Found")
        }

    



    }

    catch(error){

        res.status(500).json(error);

    }


}

const getMovieReviews = async (req, res) => {
    try {
        const movieId = req.params.id;  // Get the movie ID from the request params
        const movie = await Movie.findById(movieId).select('reviews');  // Fetch the movie with reviews

        if (!movie) {
            return res.status(404).json({ message: 'Movie Not Found' });
        }

       
        res.status(200).json(movie.reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const deleteReview = async()=>{

}

const deleteMovie = async(req,res) =>{

    try{

    const {id} = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(id)

    if(!deletedMovie){

        res.status(404).json('Movie Not Found')

    }

    res.status(200).json("Movie Deleted Sucessfully");

    


    
    
    
    }
    
    
catch(error){
      res.status(500).json(error)
}


}



export {addMovie , getSpecificMovies , getAllMovies , updatedMovie , addReview , deleteMovie , getMovieReviews , deleteReview};