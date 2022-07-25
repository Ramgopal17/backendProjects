const userModel=require("../model/userModel")
const bcrypt = require ('bcrypt');
// const saltRounds = 10;




exports.createUser= async function (req,res){
     try{
  let   data=req.body 

  let imageUrl = req.xyz
  

  let   {fname,lname,email,phone,password,street,city,pincode} = data
  let address = {}
  let shipping = {}
  let billing ={}
  shipping.street = street
  shipping.city = city
  shipping.pincode = pincode

  billing.street = street
  billing.city = city
  billing.pincode = pincode

  address.shipping = shipping
   
  address.billing = billing

  let createUser = { }
  createUser.fname =fname
  createUser.lname = lname
  createUser.email = email
  createUser.phone = phone
  
  createUser.address =address
  createUser.profileImage = imageUrl

  // console.log(createUser)
 
  const salt =await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  createUser.password = hashedPassword
  
console.log(hashedPassword)


  let  createdUser= await userModel.create(createUser)
   return res.status(201).send({status:true,message:"user created succesfully",data:createdUser})
     }
     catch(error){
      res.send({ msg:error.message})
     }
}