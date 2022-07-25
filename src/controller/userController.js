const userModel=require("../model/userModel")



exports.createUser= async function (req,res){
     
  let   data=req.body 

  let   {fname,lname,email,profileImage,phone,password,address} = data




   createdUser= await userModel.create(data)
   return res.status(201).send({status:true,message:"user created succesfully",data:createdUser})
}