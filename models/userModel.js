const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcryptjs")
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    //mandatory
   username:{
        type:String,
        required:true,
    },
   
    //mandatory
    email:{
        type:String,
        required:true,
        unique:true,
    },
    //optional
    mobile:{
        type:String,
        required:true,
        // unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    //confirmPassword
      profileImage:{
type:String,
default:"../assets/images/emp1.jpg"
     },
   
},
{
    timestamps:true
 });


 userSchema.pre("save", async function(next){
    if(!this.modifiedPaths("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
 })

 userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
 }

//Export the model
module.exports = mongoose.model('User', userSchema);