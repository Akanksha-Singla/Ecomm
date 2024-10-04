const basicDetailsModel = require("../models/basicDetailsModel")
const asyncHandler= require("express-async-handler");




const createCV = asyncHandler(async(req,res)=>{
  const details = req.body
  console.log(details)
  try{
    const cvDoc = new basicDetailsModel({...details,user:req.user._id})
    const createdCV = await cvDoc.save() 
    
    res.status(201).json(createdCV)
  }catch(err){
    console.log("error in  creating cv",err)
  }
})



   const getCV = asyncHandler(async (req, res) => {
    const CV = await basicDetailsModel.find({ user: req.user._id });
    console.log(req.user._id)
    res.json(CV);
  })

  const updateCV = asyncHandler(async(req,res)=>{
    console.log("update function")
  const cv = await basicDetailsModel.findById(req.params.id)
if(cv){
  const updatedcv = await basicDetailsModel.updateOne({_id:req.params.id},req.body)
     res.status(201).json(updatedcv)
}
else{
  res.status(404).json({"message":"CV not found"})
}
    
  })


  const getCVById = asyncHandler(async(req,res)=>{
    const cv = await basicDetailsModel.findById(req.params.id)

    if(cv){
      res.json(cv)
    }
    else{
      res.status(404).json({"message":"CV not found"})
    }

  })


  const deleteCVById = asyncHandler(async(req,res)=>{
    const cv = await basicDetailsModel.deleteOne({_id:req.params.id})
    res.json(cv)

  })

  module.exports={
  
  createCV,
    getCV,
    updateCV,
    getCVById,
    deleteCVById
   
  }