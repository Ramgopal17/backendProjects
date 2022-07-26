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
    if (Object.keys(data) == 0) {
      return res.status(400).send({ status: false, message: "please  enter in b0dy something" })
    }

    let { fname, lname, email, phone, password, address } = data
    let j = JSON.parse(address)

    data.address = j


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
      return res.status(400).send({ status: false, message: "please enter  fname corect format" })
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
    if (!phone.match(/^[789][0-9]{9}$/)) {
      return res.status(400).send({ status: false, message: "please enter indian phone number" })
    }
    let uniquePhone = await userModel.findOne({ phone: phone })
    if (uniquePhone) {
      return res.status(400).send({ status: false, message: "phone already exist " })

    }

    if (!passwordValidate(password)) {
      return res.status(400).send({ status: false, message: "please enter pasword in  correct format" })

    }



    if (!isValid(j)) {
      return res.status(400).send({ status: false, message: "please enter address" })
    }

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
      return res.status(400).send({ status: false, message: "please enter  shipping address" })
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
    if (!/^[0-9]{6}$/.test(j.billing.pincode)) {
      return res.status(400).send({ status: false, message: "Pin code needed in valid format in billing address." })
    }



    let createdUser = await userModel.create(data)
    return res.status(201).send({ status: true, message: "user created succesfully", data: createdUser })


  }

  catch (error) {
    res.send({ msg: error.message })
  }

}

exports.loginuser = async function (req, res) {

  let data = req.body
  if (Object.keys(data) == 0) {
    return res.status(400).send({ status: false, message: "please  enter in b0dy something" })
  }
  let { email, password } = data

  if (!validateEmail(email)) {
    return res.status(400).send({ status: false, message: "please enter email in  correct format" })

  }

  let findUser = await userModel.findOne({ email: email })
  if(!findUser){
    return res.status(400).send({ status: false, message: " email does not exists" })
  }

  let hashPassword = findUser.password
  const hashedPassword = await bcrypt.compare(password, hashPassword)
  console.log(hashedPassword)

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
  let userId = req.params.userId
  if (!isValidObjectId(userId)) {
    return res.status(400).send({ status: false, msg: "userid  is not valid" })

  }

  let findUser = await userModel.findById(userId)
  if (!findUser) {
    return res.status(400).send({ status: false, message: "please enter correct user id" })

  }


  return  res.status(200).send({ status: true, message: "User profile details", data: findUser })

}


exports.updateUser = async (req, res) => {
  let userId = req.params.userId
  let data = req.body
  final = {}
  let { fname, lname, email, phone, password, address, profileImage } = data
  let imageUrl = req.xyz
  // if (fname) {
    if (!isValid(fname)) {
      return res.status(400).send({ status: false, message: "fname  to update is not in valid format or not mentioned. " })
    }
    if (!validName(fname)) {
      return res.status(400).send({ status: false, message: "please enter  fname corect format" })
    }
    // final.fname = fname
  // }
  if (lname) {
    if (!Object.values(lname) == 0) {
      return res.status(400).send({ status: false, message: "lname  to update is not in valid format or not mentioned. " })
    }
    if (!validName(lname)) {
      return res.status(400).send({ status: false, message: "please enter  lname corect format" })
    }
    final.lname = lname
  }

  if (email) {
    if (!isValid(email)) {
      return res.status(400).send({ status: false, message: "please enter email id" })
    }
    if (!validateEmail(email)) {
      return res.status(400).send({ status: false, message: "please enter email in  correct format" })

    }
    const uniqueEmail = await bookModel.findOne({ email: email })
    if (uniqueEmail) {
      return res.status(400).send({ status: false, message: "email to update is already there." })
    }
    final.email = email

  }

  let update = await userModel.updateOne({ _id: userId }, { $set: { fname: fname, lname: lname, email: email, phone: phone, password: password, address: address, profileImage: imageUrl } }, { new: true })
  // let update = await userModel.updateOne({ _id: userId }, final, { new: true })
  res.status(200).send({ status: true, "message": "User profile updated", data: update })

}