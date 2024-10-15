const User = require ("../models/userModel")
const asyncHandler= require("express-async-handler");
const generateToken = require("../utils/generateJwt");




const createUser= asyncHandler (async (req,res)=>{
    // console.log("body",req.body)
    // console.log("image",req.file)    // res.send("data")
const email = await req.body.email;
const mobile = await req.body.mobile;

const isMobile = await User.findOne({mobile: mobile});
const findUser = await User.findOne({email : email});

const newUser1={
  ...req.body,
  profileImage: req.file?{
    data:req.file.buffer,
    contentType:req.file.mimetype
  }:null
}


console.log(newUser1.profileImage)

if(!findUser && !isMobile){
  const userDoc = User(newUser1)
  console.log(userDoc)
  const newUser = userDoc.save()
    // const newUser = User.create(req.body) 
    console.log(newUser)
    if (newUser) {
      res.status(201).json({
        status:201,
        message:"User registered successfully",
        data:userDoc
        });
    }
    }
else{
  const msg = !!isMobile ? "mobile already exists" : "email already exists"
    res.status(400).json({
        status: 401,
        message: msg,
      });
}
})




const authUser= asyncHandler (async (req,res)=>{
  const {email,password} = req.body

  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))){
    res.status(200).json({
      _id:user._id,
      username:user.username,
      email:user.email,
      mobile:user.mobile,
      profileImage:user.profileImage,
      token:generateToken(user._id)
     })
  }
  else{
    res.status(401).json({
      status: 401,
        message:"Invalid email or password",
    });
    

  }
  
})



module.exports={createUser,authUser}
