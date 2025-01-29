import express from 'express';
import { createUser ,loginUser , logoutCurrentUser  , getAllUsers , userUpdatedProfile} from '../controllers/userController.js';
import { authenticate , authorizeAdmin } from '../middleware/authMiddleware.js';



const router = express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin, getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);
router.put('/profile' , authenticate , userUpdatedProfile)



export default router;