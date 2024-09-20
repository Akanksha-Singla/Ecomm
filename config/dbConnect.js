

// const EmployeeModel = require("../model/api/emplooyeeModel")
const mongoose = require("mongoose");

const dbConnect=()=>{
  try{
    const conn = mongoose
    .connect(
      "mongodb+srv://singlaakanksha92:3N2yyQiZi1aEVDcz@cluster0.rgxmtwz.mongodb.net/Ecomm?retryWrites=true&w=majority&appName=Cluster0"
    )
    console.log("database connected successfully")
  }catch(error){
console.log("cant connectwith db",error)
  }
}

module.exports = dbConnect
