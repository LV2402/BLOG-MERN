const exp = require("express");
const test = require("../controllers/user.controller.js");
const router=exp.Router()

router.get('/',test)

module.exports=router