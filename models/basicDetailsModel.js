const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcryptjs")
// Declare the Schema of the Mongo model


// {
//     "_id":"2",
//     "name":"akanksha",
//    " email":"1123@gmail.com",
//     "mobile":"12324",
//    " address":"lkjlk",
//     "city":"jind",
//     "state":"haryana",
//     "pincode":"67567",
//     "introPara":"djkhjshjhk"


// }
var basicDetailSchema = new mongoose.Schema({
    //mandatory
   BasicId:{                                   
        type:String,
        // required:true,
        
    },
   
    //mandatory
    name:{
        type:String,
        // required:true,
        
    },
    //optional
   email:{
        type:String,
        // required:true,
        // unique:true,
    },
    mobile:{
        type:String,
        // required:true,
        // unique:true,
    },
    address:{
        type:String,
        // required:true,
    },
    city:{
        type:String,
        // required:true,
    },
    state:{
        type:String,
        // required:true,

    },
    pincode:{
        type:String,
        // required:true,

    },
    introPara:{
        type:String,
        // required:true,

    },
    //confirmPassword
      profileImage:{
data:Buffer,
contentType:String

     },

    //  user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User",
    //   },
   
},
);



//Export the model
module.exports = mongoose.model('cvDetail', basicDetailSchema);