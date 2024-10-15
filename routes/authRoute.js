const express= require("express")
const router = express.Router()
const {createUser,authUser} = require("../controller/userCtrl")
const {validateLoginUser,validateRegisterUser}=require("../middleware/UserValidators");

const multer = require('multer');
const memoryStorage = multer.memoryStorage();

const upload = multer({ storage: memoryStorage });

router.post("/register",upload.single('profileImage'),createUser);

router.post("/login",validateLoginUser,authUser)



module.exports = router;



