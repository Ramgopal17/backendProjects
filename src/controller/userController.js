const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// const saltRounds = 10;




exports.createUser = async function (req, res) {
  try {
    let data = req.body
    let { fname, lname, email, phone, password, address } = data
    let j = JSON.parse(address)
    data.address = j

    let imageUrl = req.xyz
    data.profileImage = imageUrl

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    data.password = hashedPassword

    let createdUser = await userModel.create(data)
    return res.status(201).send({ status: true, message: "user created succesfully", data: createdUser })
  }
  catch (error) {
    res.send({ msg: error.message })
  }
}


exports.loginuser = async function (req, res) {

  let data = req.body
  let { email, password } = data

  let findUser = await userModel.findOne({ email: email})
  
  let hashPassword = findUser.password 
  const hashedPassword = await bcrypt.compare(password, hashPassword)
console.log(hashedPassword)

  if(hashedPassword == true){
  let userId = findUser._id

  let token = jwt.sign(
    {
      userId: userId.toString(),
      batch: "radon",
      organisation: "project-5",
    },
    "ourFifthProject", {
    expiresIn: '3600s'
  })

res.status(200).send({status:true, msg:"User login successfull" , data:{userId:userId , token:token } })
  }
}


exports.getUser = async (req,res) => {
try{
let userId = req.params.userId

let findUser = await userModel.findById(userId)


res.status(200).send({status:true, message: "User profile details",data:findUser  })
}
catch (error) {
  res.send({ msg: error.message })
}

}


exports.updateUser = async (req ,res) =>{
let userId = req.params.userId
let data = req.body

let { fname, lname, email, phone, password, address,profileImage} = data
let imageUrl = req.xyz

let update = await userModel.updateOne({_id:userId},{$set:{fname:fname , lname:lname,email:email, phone:phone, password:password, address:address , profileImage:imageUrl}},{new:true})

res.status(200).send({status: true, "message": "User profile updated",data:update})

}