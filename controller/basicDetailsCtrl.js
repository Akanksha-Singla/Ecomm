const basicDetailsModel = require("../models/basicDetailsModel");
const userModel = require ("../models/userModel")
const asyncHandler = require("express-async-handler");

const createCV = asyncHandler(async (req, res) => {
  const details = req.body;
  console.log(details)
  try {
    const cvDoc = new basicDetailsModel({ ...details, user: req.user._id });
    const createdCV = await cvDoc.save();

  return  res.status(200).json({
      status: 201,
      message: "CV details submitted successfully.",
      data: {
        cvId: createdCV._id, // The MongoDB ObjectID
      
      },
    });
  } catch (err) {
    console.log("error in  creating cv", err);
   return res.status(500).json({
      status: 500,
      message: 'Failed to submit CV details.',
    });
  }
});

const getCV = asyncHandler(async (req, res) => {
  const CV = await basicDetailsModel.find({ user: req.user._id });
  console.log("userDetails",req.user);
  
  if(CV){
   return res.status(200).json({
      status:200,
      message:"data fetched successfully",
      data:CV
  
    })
  }
  else{
  return  res.status(400).json({
      status:400,
      message:"something went wrong"
    })
  }
 
});

const getUserDetails = asyncHandler(async(req,res)=>{
  console.log("user DEtails")
  try{
    const user = await userModel.findById(req.user._id);
 if(user && user.profileImage && user.profileImage.data){
      console.log(user.profileImage.contentType)

    
      const base64Data = user.profileImage.data.toString("base64");
    return res.json(     {
      ...user.toObject(),
      profileImage:`data:image/jpeg;base64,${base64Data}`
    })
 
    }
    else if(user){
      console.warn('No image data found for user:', user)
      return res.json(user)
    }
    
  }
  catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Ensure to propagate errors
  }
 
})


const updateCV = asyncHandler(async (req, res) => {
  console.log("update function");
  const cv = await basicDetailsModel.findById(req.params._id);
  if (cv) {
    const updatedcv = await basicDetailsModel.updateOne(
      { _id: req.params._id },
      req.body
    );
    res.status(204).json({
      status:204,
      message:"data updated successfully",
      data:updatedcv
    });
  } else {
    res.status(404).json({ 
      status:404,
      message: "CV not found" });
  }
});

const getCVById = asyncHandler(async (req, res) => {
  const cv = await basicDetailsModel.findById(req.params._id);
  console.log("entered in getcvid",cv)

  if (cv) {
    res.status(200).json({
      status:200,
      message:"cv fetched",
      data:cv
    });
  } else {
    res.status(404).json({ 
      status:404,
      message: "CV not found" });
  }
});

const deleteCVById = asyncHandler(async (req, res) => {
  const cv = await basicDetailsModel.deleteOne({ _id: req.params._id });
  console.log("id to be deleted",req.params._id)
  if(cv){
    res.status(204).json({
      status: 204,
      message: "CV deleted successfully.",
      data: {
       cv:cv, 
      },
    })
  }
  else{
    res.status(404).json({ 
      status:404,
      message: "CV not found" });
  };
});

module.exports = {
  createCV,
  getCV,
  updateCV,
  getCVById,
  deleteCVById,
  getUserDetails
};
