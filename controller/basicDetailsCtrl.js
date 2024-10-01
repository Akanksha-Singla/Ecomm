const basicDetailsModel = require("../models/basicDetailsModel")
const asyncHandler= require("express-async-handler");


 async function addBasicDetails(details) {
  console.log("details",details)
    try {
      const basicDetailDoc = new basicDetailsModel(details);
  
      return await basicDetailDoc.save();
    } catch (err){
      console.log("dd",err);
    }
  }

  async function getBasicDetails() {
    return await basicDetailsModel.find()
   
    }

  module.exports={
    addBasicDetails,
     getBasicDetails
  }