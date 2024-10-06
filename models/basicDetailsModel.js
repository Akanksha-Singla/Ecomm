const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcryptjs")
// Declare the Schema of the Mongo model


// {
//     "basicId":"2",
//     "name":"akanksha",
//     "email":"1123@gmail.com",
//     "mobile":"12324",
//    " address":"lkjlk",
//     "city":"jind",
//     "state":"haryana",
//     "pincode":"67567",
//     "introPara":"djkhjshjhk"


// }
var basicDetailSchema = new mongoose.Schema({
    //mandatory
    basicDetails: {
        name: String,
        email: String,
        phone: Number,
        address: String,
        city: String,
        state: String,
        pincode: Number,
        intro: String,
      },
      education:{
        degree: String,
        institution: String,
        percentage: Number,
      },
      experience: [{
        organization: String,
        location: String,
        position: String,
        ctc: Number,
        startDate: Date,
        endDate: Date,
        technologies:[{ type: String }],
      }],
      projects: [{
        title: String,
        teamSize: Number,
        duration: String,
        technologies:[{ type: String }],
        description: String,
      }],
      skills:[ {
        skillName: String,
        proficiency: Number,
      }],
      socialProfiles:[ {
        platform: String,
        link: String,
      }],

     user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
   
},
);



//Export the model
module.exports = mongoose.model('cvFormDetails', basicDetailSchema);