import express from 'express'
import { authenticate , authorizeAdmin  } from '../middleware/authMiddleware.js';
import { addMovie , getSpecificMovies , getAllMovies , updatedMovie , addReview , deleteMovie , getMovieReviews , deleteReview } from '../controllers/movieController.js';
import checkId from '../middleware/checkId.js';



const router = express.Router();

router.get('/specific-movie/:id' , getSpecificMovies)
router.get('/all-movies' , getAllMovies)

router.post('/:id/reviews' , authenticate , checkId , addReview)
router.delete('/:id/delete-review' , authenticate , checkId , deleteReview)

router.get('/:id/reviews' ,  getMovieReviews)




router.route('/add-movie').post(authenticate , authorizeAdmin , addMovie);
router.put('/update-movie/:id' , authenticate ,authorizeAdmin , updatedMovie);
router.delete('/delete-movie/:id' , authenticate , authorizeAdmin , deleteMovie)




export default router;
