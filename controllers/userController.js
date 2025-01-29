import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import asyncHandler from '../middleware/asyncHandler.js';
import createToken from '../utlis/createToken.js'


const createUser = asyncHandler(async (req,res) =>{

  const {username , email , password} = req.body;  

 if(!username || !email || !password){
    throw new Error('Please provide all the fields');
 }

 const userExist = await  User.findOne({email})

 if(userExist) res.status(400).json("User already exist"); 



 // hash the user password

 const salt = await bcrypt.genSalt(10)
 const hashedPassword = await bcrypt.hash(password,salt);
 const newUser = new User({username,email,password: hashedPassword});

 try{

    await newUser.save();
    createToken(res, newUser._id)

    res.status(201).json({

      _id: newUser._id,
      username: newUser.username,
      email: newUser.email, 
      password: newUser.password,
      isAdmin: newUser.isAdmin 

    })
 }

 catch(error){
    res.status(400)
    throw new Error("Invalid User");
 }


})


const loginUser = asyncHandler(async (req,res) =>{

    const {email,password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){

      const isPasswordvalid = await bcrypt.compare(password, existingUser.password)

    
   
    if(isPasswordvalid){
      createToken(res, existingUser._id);

      res.status(200).json({
         _id: existingUser._id,
         username: existingUser.username,
         email: existingUser.email,
         isAdmin: existingUser.isAdmin,
         
         
      })

    }

    else{
      res.status(401).json({message: 'Invalid Password'})
    }
   
   }

   else{
      res.status(404).json({message: 'User Not Found'})
   }


})


const logoutCurrentUser = asyncHandler(async (req,res) =>{

   res.cookie('jwt' , '' , {
   httpOnly: true,
   expires: new Date(0),
   
   })

   res.status(200).json({message: 'Logged out Sucessfully'})

})

const getAllUsers = asyncHandler(async (req,res) =>{

   const users = await User.find({})

   res.status(200).json(users);

})


const userUpdatedProfile = asyncHandler(async (req,res) =>{

   const {username,email,password} = req.body;
   const userId = req.user._id;

   if(!username || !email){
      res.status(400).json({message:'Please Provide all the fields'})
   }

   const user = await User.findById(userId);

   if(!user){
      res.status(404).json({message: 'User Not Found'})
   }

   user.username = username;
    user.email = email;


   if(password){
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt)
   }


   try{

      const updatedUser = await user.save();
      res.status(200).json({
         _id: updatedUser._id,
         username: updatedUser.username,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
       });

   }

   catch(error){
      res.status(400).json({ message: 'Error updating user.' });
   }
   
  


})

export {createUser , loginUser , logoutCurrentUser , getAllUsers , userUpdatedProfile};