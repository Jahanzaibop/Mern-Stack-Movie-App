import express from  'express'
import { authenticate , authorizeAdmin } from '../middleware/authMiddleware.js';
import {createGenre , updateGenre , deleteGenre , allGenre} from '../controllers/genreController.js'

const router = express.Router();


router.route('/').post(authenticate , authorizeAdmin , createGenre);
router.route('/all').get(allGenre);
router.route('/:id').put(authenticate , authorizeAdmin , updateGenre)
router.route('/:id').delete(authenticate , authorizeAdmin, deleteGenre)


export default router;