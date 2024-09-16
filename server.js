const express = require('express')
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;



app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`)
})

app.use("/",(req,res)=>{
  res.send("server has started running successfully")
})