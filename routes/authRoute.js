const express= require("express")
const router = express.Router()
const {createUser,authUser} = require("../controller/userCtrl")

router.post("/register",createUser);
router.route("/login").post(authUser)



module.exports = router;

