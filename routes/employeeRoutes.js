const express=require("express");

const router=express.Router();

const auth=require("../middleware/auth");

const employeeController=require("../controllers/employeeController");

router.get("/profile",

auth,

employeeController.profile

);

module.exports=router;
