const express= require("express")
const router = express.Router()
const { protect } = require("../middleware/AuthMiddleware");

const {createCV,getCV,updateCV,getCVById,deleteCVById}= require("../controller/basicDetailsCtrl")

router.route("/addBasicDetails").post(protect,createCV)

router.route("/getBasicDetails").get(protect,getCV)
console.log("in update route")
router.route("/updateBasicDetails/:id").put(protect,updateCV)
router.route('/getCv/:id').get(getCVById)
router.route('/delete/:id').delete(protect,deleteCVById)

module.exports = router;