const express= require("express")
const router = express.Router()
const {createUser} = require("../controller/userCtrl")

router.post("/register",createUser);
console.log("in auth route")


module.exports = router;

