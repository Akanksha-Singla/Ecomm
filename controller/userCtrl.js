const User = require ("../models/userModel")

 const createUser= async (req,res)=>{
    console.log(req.body)
    // res.send("data")
const email = await req.body.email;
const findUser = await User.findOne({email : email});
if(!findUser){
    const newUser = User.create(req.body)
    console.log(newUser)
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,  // Send the newly created user data
      });
    }
else{
    res.status(400).json({
        success: false,
        message: "User already exists",
      });
}
}
module.exports={createUser}
