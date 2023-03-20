const express=require("express")
const router=express.Router()
const {AddTask}=require("../controller/taskController")

router.post("/addTask",AddTask)


module.exports=router