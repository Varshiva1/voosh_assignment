const express = require("express");
const router= express.Router();
const googlecontroller=require('../controller/googleController')



 router.post('/signup',googlecontroller.signup)
router.post("/signin",googlecontroller.signin)




module.exports = router;
