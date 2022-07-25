const userModel=require("../model/userModel")



exports.createUser= async function (req,res){
     
  let   data=req.body 

  let   {fname,lname,email,profileImage,phone,password,address} = data




   createdUser= await userModel.create(data)
   return res.
}