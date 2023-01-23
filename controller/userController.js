const db=require("../model")

const User=db.user
const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}
let emailRegex=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
let mobileRegex=/^[7-9][0-9]{9}$/

exports.createSignIn=async function (req,res){


    let data=req.body
  let  {firstName,lastName,email,phone,address}=data
 if(!isValid(firstName)){
    return res.status(400).send({status:false,msg:"please enter your firstName"})

 }
 if(!isValid(lastName)){
    return res.status(400).send({status:false,msg:"please enter your lastName"})

 }

 if(!isValid(email)){
    return res.status(400).send({status:false,msg:"please enter your email"})

 }
 if(!emailRegex.test(email)){
    return res.status(400).send({status:false,msg:"please enter email in valid abc@gmail.com"})
 }
if(!isValid(phone)){
    return res.status(400).send({status:false,msg:"please enter your mobile no"})
}
if(!mobileRegex.test(phone)){
    return res.status(400).send({status:false,msg:"please enter your indian mobile no"}) 
}
if (!isValid(address)) {
    return res.status(400).send({ status: false, message: "please enter address" })
  }

  try {

var j = JSON.parse(JSON.stringify(address))



  }
  catch (error) {
    return res.status(400).send({ message: "please enter address correctly" })
  }
var j = JSON.parse(JSON.stringify(address))

  data.address = j


if (!isValid(j.street)) {
    return res.status(400).send({ status: false, message: "please enter  street in  branch address" })
  }


  if (!isValid(j.city)) {
    return res.status(400).send({ status: false, message: "please enter  city in  branch address" })
  }
  if (!isValid(j.state)) {
    return res.status(400).send({ status: false, message: "please enter  city in  branch address" })
  }
  console.log(data);


    let dataCreated= await User.create(data)
    return res.status(200).send({status:true,msg:"succesfully created",data:dataCreated})
}

exports.getUser= async function (req,res){
  let fetchedData= await User.findAll()
  return res.status(200).send({status:true,msg:"success",data:fetchedData})
}


exports.updateUser=async function (req,res){
  try{
    let data=req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({status:true,msg:"please enter the data to be updated"})
}
    id=req.params.id
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({status:true,msg:"please enter id in valid format number only"})
      }
      const user = await User.findByPk(id);


      let updated=await user.update(data);

      return res.send({status:true,msg:"succesfully updated",data:updated})
}catch(err){
  res.status(500).send({status:false,msg:err.message});
    }
}



exports.deleteUser=async function (req,res){
  try{
    let id = req.params.id
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({status:true,msg:"please enter id in valid format number only"})
      }
 
   let a= await User.destroy({ where: { id: id }} )
   console.log(a)
    res.status(200).send({status:true,msg:'user info is deleted !'})
    }catch(err){
        res.status(500).send({status:false,msg:err.message});
    }
}