const User = require ("../models/userModel")
const asyncHandler= require("express-async-handler");
const generateToken = require("../utils/generateJwt");

 const createUser= asyncHandler (async (req,res)=>{
    console.log(req.body)
    // res.send("data")
const email = await req.body.email;
const findUser = await User.findOne({email : email});
if(!findUser){
    const newUser = User.create(req.body)
    console.log(newUser)
    if (newUser) {
      res.status(201).json({
        sucess:true,
        message:"User registered successfully",
        _id: newUser._id,
       username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
      });
    }
    }
else{
    res.status(400).json({
        success: false,
        message: "User already exists",
      });
}
})
const authUser= asyncHandler (async (req,res)=>{
  const {email,password} = req.body

  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))){
    res.json({
      _id:user._id,
      username:user.username,
      email:user.email,
      mobile:user.mobile,
      profileImage:user.profileImage,
      token:generateToken(user._id)


    })
  }
  else{
    res.status(400);
    throw new Error("Invalid Email or Password  ")

  }
  
})


module.exports={createUser,authUser}
