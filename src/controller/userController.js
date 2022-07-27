const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { isValid, validateEmail, passwordValidate, validName } = require("../validation/validation")
// const saltRounds = 10;
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
exports.createUser = async function (req, res) {
    try {
      let data = req.body
      if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, message: "please  provide user details" })
      }
  
      let { fname, lname, email, phone, password, address } = data
  
  
  
      let imageUrl = req.xyz
  
      data.profileImage = imageUrl
  
      const salt = await bcrypt.genSalt(10)
      if (!isValid(password)) {
        return res.status(400).send({ status: false, message: "please enter password" })
      }
  
      const hashedPassword = await bcrypt.hash(password, salt)
      data.password = hashedPassword
  
      if (!isValid(fname)) {
        return res.status(400).send({ status: false, message: "please enter fname " })
      }
      if (!validName(fname)) {
        return res.status(400).send({ status: false, message: "please enter  fname correct format" })
      }
      if (!isValid(lname)) {
        return res.status(400).send({ status: false, message: "please enter lname " })
      }
      if (!validName(lname)) {
        return res.status(400).send({ status: false, message: "please enter lname correct format" })
  
      }
      if (!isValid(email)) {
        return res.status(400).send({ status: false, message: "please enter email" })
      }
      if (!validateEmail(email)) {
        return res.status(400).send({ status: false, message: "please enter email in  correct format" })
  
      }
      let uniqueEmail = await userModel.findOne({ email: email })
      if (uniqueEmail) {
        return res.status(400).send({ status: false, message: "email already exits" })
  
      }
  
      if (!isValid(phone)) {
        return res.status(400).send({ status: false, message: "please enter phone" })
      }
      if (!phone.match(/^[6789][0-9]{9}$/)) {
        return res.status(400).send({ status: false, message: "please enter indian phone number" })
      }
      let uniquePhone = await userModel.findOne({ phone: phone })
      if (uniquePhone) {
        return res.status(400).send({ status: false, message: "phone already exist " })
  
      }
  
      if (!passwordValidate(password)) {
        return res.status(400).send({ status: false, message: "please enter pasword in  correct format" })
  
      }
      if (!address) {
        return res.status(400).send({ status: false, message: "please enter address" })
      }
  
      try {
  
        var j = JSON.parse(address)
      }
      catch (error) {
        return res.status(400).send({ msg: "please enter user address correctly" })
      }
      data.address = j
  
      if (!isValid(j.shipping)) {
        return res.status(400).send({ status: false, message: "please enter  shipping address" })
      }
  
  
  
      if (!isValid(j.shipping.street)) {
        return res.status(400).send({ status: false, message: "please enter  street in  shipping address" })
      }
  
  
      if (!isValid(j.shipping.city)) {
        return res.status(400).send({ status: false, message: "please enter  city in  shipping address" })
      }
      if (!isValid(j.shipping.pincode)) {
        return res.status(400).send({ status: false, message: "please enter  pincode in  shipping address" })
      }
  
      if (!/^[0-9]{6}$/.test(j.shipping.pincode)) {
        return res.status(400).send({ status: false, message: "Pin code needed in valid format in shipping address." })
      }
  
  
      if (!isValid(j.billing)) {
        return res.status(400).send({ status: false, message: "please enter  billing address" })
      }
      if (!isValid(j.billing.street)) {
        return res.status(400).send({ status: false, message: "please enter  street in  billing address" })
      }
      if (!isValid(j.billing.city)) {
        return res.status(400).send({ status: false, message: "please enter  city in  billing address" })
      }
      if (!isValid(j.billing.pincode)) {
        return res.status(400).send({ status: false, message: "please enter  pin code in   billing address" })
      }
      if (!/^[1-9][0-9]{5}$/.test(j.billing.pincode)) {
        return res.status(400).send({ status: false, message: "Pin code needed in valid format in billing address." })
      }
      let createdUser = await userModel.create(data)
      return res.status(201).send({ status: true, message: "user created succesfully", data: createdUser })
  
    }
  
    catch (error) {
      res.status(500).send({ msg: error.message })
    }
  
  }
exports.loginuser = async function (req, res) {

  let data = req.body
  if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, message: "please  enter in b0dy something" })
  }
  let { email, password } = data

  if (!isValid(email)) {
    return res.status(400).send({ status: false, message: "please enter email " })

  }

  if (!validateEmail(email)) {
    return res.status(400).send({ status: false, message: "please enter email in  correct format" })

  }
  if (!isValid(password)) {
    return res.status(400).send({ status: false, message: "please enter password" })

  }


  let findUser = await userModel.findOne({ email: email })
  if (!findUser) {
    return res.status(400).send({ status: false, message: " email does not exists" })
  }

  let hashPassword = findUser.password
  const hashedPassword = await bcrypt.compare(password, hashPassword)
  if (!hashedPassword) {
    return res.status(400).send({ status: false, message: " password incorrect" })
  }

    if (hashedPassword == true) {
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

        res.status(200).send({ status: true, msg: "User login successfull", data: { userId: userId, token: token } })
    }
}


exports.getUser = async (req, res) => {
  try {
    let userId = req.params.userId
    if (!isValidObjectId(userId)) {
      return res.status(400).send({ status: false, msg: "userid  is not valid" })

    }

    let findUser = await userModel.findById(userId)
    if (!findUser) {
      return res.status(400).send({ status: false, message: "please enter correct user id" })

    }


    return res.status(200).send({ status: true, message: "User profile details", data: findUser })
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}


exports.updateUser = async (req, res) => {
  try {
    let userId = req.params.userId
    let data = req.body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "please  provide someting to update" })
    }
    let { fname, lname, email, phone, password, profileImage, address } = data
   
   //------------------------------------------update address---------------------------------------------------------

   let findUser = await userModel.findById(userId)
   let add = findUser.address
   
    if (address == "") {
      return res.status(400).send({ status: false, message: "please enter address" })
    }
    if (address) {
      
      address = JSON.parse(address)
      if (typeof(address) != Object) {
        return res.status(400).send({ status: false, message: "please enter address in valid format to update" })
      }
      if (address.shipping == "") {
        return res.status(400).send({ status: false, message: "please enter shipping address to update" })
      }
      if (address.billing == "") {
        return res.status(400).send({ status: false, message: "please enter billing address to update" })
      }

      
      if (address.shipping) {
        if (typeof(address.shipping) != Object) {
          return res.status(400).send({ status: false, message: "please enter shpping address in valid format to update" })
        }
        if (address.shipping.street) {
          add.shipping.street = address.shipping.street
        }
        if (address.shipping.city) {
          add.shipping.city = address.shipping.city
        }
        if (address.shipping.pincode) {
          add.shipping.pincode = address.shipping.pincode
        }


      }
      if (address.billing) {
        if (typeof(address.billing) != Object) {
          return res.status(400).send({ status: false, message: "please enter billing address in valid format to update" })
        }
        if (address.billing.street) {
          add.billing.street = address.billing.street
        }
        if (address.billing.city) {
          add.billing.city = address.billing.city
        }
        if (address.billing.pincode) {
          add.billing.pincode = address.billing.pincode
        }
      }
    }

    let imageUrl = req.xyz

    if (fname == "") {
      return res.status(400).send({ status: false, message: "please   enter fname" })
    }
    if (!validName(fname)) {
      return res.status(400).send({ status: false, message: "please enter  fname corect format" })
    }

    if (lname == "") {
      return res.status(400).send({ status: false, message: "please   enter lname" })
    }
    if (!validName(lname)) {
      return res.status(400).send({ status: false, message: "please enter  lname corect format" })
    }

    if (email == "") {
      return res.status(400).send({ status: false, message: "please   enter email" })
    }
    if (email) {
      if (!validateEmail(email)) {
        return res.status(400).send({ status: false, message: "please enter email in  correct format" })

      }
      const uniqueEmail = await userModel.findOne({ email: email })
      if (uniqueEmail) {
        return res.status(400).send({ status: false, message: "email to update is already there." })
      }
    }
    if (phone == "") {
      return res.status(400).send({ status: false, message: "please   enter phone" })
    }
    if (phone) {
      if (!phone.match(/^[789][0-9]{9}$/)) {
        return res.status(400).send({ status: false, message: "please enter indian phone number" })
      }
      let uniquePhone = await userModel.findOne({ phone: phone })
      if (uniquePhone) {
        return res.status(400).send({ status: false, message: "phone already exist " })

      }
    }
    if (profileImage == "") {
      return res.status(400).send({ status: false, message: "please enter profileImage" })
    }
   

    let update = await userModel.updateOne({ _id: userId }, { $set: { fname: fname, lname: lname, email: email, phone: phone, password: password, address: add, profileImage: imageUrl } }, { new: true })

    let findUser1 = await userModel.findOne({ _id: userId })
    res.status(200).send({ status: true, "message": "User profile updated", data: findUser1 })
  }
  catch (error) {
    res.send({ msg: error.message })
  }

}








