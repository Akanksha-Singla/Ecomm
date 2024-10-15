const express= require("express")
const router = express.Router()
const { authToken } = require("../middleware/AuthMiddleware");

const {createCV,getCV,updateCV,getCVById,deleteCVById,getUserDetails}= require("../controller/basicDetailsCtrl")
const {validateCvSchema,validateIdSchema} = require("../middleware/CvValidationSchema")

router.route("/addBasicDetails").post(authToken,validateCvSchema,createCV)

router.route("/getBasicDetails").get(authToken,getCV)
router.get("/getUserDetails",authToken,getUserDetails)
router.route("/update/:_id").put(authToken,validateCvSchema,updateCV)
router.route('/getCv/:_id').get(authToken,validateIdSchema,getCVById)
router.route('/delete/:_id').delete(authToken,validateIdSchema,deleteCVById)

module.exports = router;