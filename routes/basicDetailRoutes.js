const express= require("express")
const router = express.Router()

const {addBasicDetails,getBasicDetails}= require("../controller/basicDetailsCtrl")

router.route("/addBasicDetails").post(async function(req,response){
    const data= await addBasicDetails(req.body);
    response.send(data)
}
)

router.route("/getBasicDetails").get(async function(req,response){
    console.log("getbAS")
    const data= await getBasicDetails();
    console.log("data",data)
    response.send(data)
}
)




module.exports = router;