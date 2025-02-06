import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import asyncHandler from './asyncHandler.js';


const jwtsecret = 'wejowejaklnsgkladasdasd';


const authenticate = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    
    console.log("Token received:", token); // Debugging line

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtsecret);
            req.user = await User.findById(decoded.userId).select('-password');

            console.log("Decoded User:", req.user); // Debugging line
           
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
});


// check if the user is admin or not 

const authorizeAdmin = (req,res,next) =>{

if(req.user && req.user.isAdmin) {

    next()
}

else{
res.status(500).json('Not Authorized as an admin');
}

}

export {authenticate , authorizeAdmin};