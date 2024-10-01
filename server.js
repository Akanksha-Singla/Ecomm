const express = require('express');
const bodyParser = require("body-parser")
const dbConnect = require("./config/dbConnect")
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const basicDetailRoutes= require("./routes/basicDetailRoutes");
const { notFound, errorHandler } = require('./middleware/ErrorMiddleware');

dbConnect();


app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT} // http://localhost:4001/`)
})

// app.use(notFound);
// app.use(errorHandler)

// app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/api/user",authRouter)
app.use("/api/cv",basicDetailRoutes)

app.use("/",(req,res)=>{
  res.send("server has started running successfully")
})