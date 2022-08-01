const productModel = require("../model/productModel")
const cartModel = require("../model/cartModel");
const userModel = require("../model/userModel");
const mongoose = require('mongoose')
const { isValid, validName, isValidSize, validField } = require("../validation/validation")

const { uploadFile } = require("../controller/awsController")
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}


exports.createCart = async function (req, res) {
    try{
    let userId = req.params.userId
    if(!isValidObjectId(userId)){
        return res.status(400).send({ status: false, message: "invalid userId" })
    }
    let body = req.body;
    if(Object.keys(body).length==0){
        return res.status(400).send({ status: false, message: "body should not be empty" })
    }
  let  items=body.items

  let cart= await cartModel.findOne({userId:userId})
    for(let i=0;i<items.length;i++){
    productId=items[i].productId
    
    quantity=items[i].quantity
    

    let product= await productModel.findById(productId)
    if(!product){
        return res.status(400).send({ status: false, message: "No product found" })
    }

 
 console.log(cart)
if(cart){
    for(let j=0;j<cart.items.length;j++){
        for(k=0;k<body.items;k++){
            if(cart.items[j].productId==body.items[k].productId){
                           quantity++
            }

            if(cart.items[j].productId!=body.items[k].productId){
                cart.items.push(body.items[k])
            }
        }
    }
}

if(!cart){
    body.userId=userId
    body.totalPrice=product.price*quantity
    body.totalItems=items.length
}
    }
    if(!cart){
    let saveData= await cartModel.create(body)
    res.status(201).send({status:true,mes:"success",data:saveData})

    }
    if(cart){
        res.status(201).send({status:true,mes:"success",data:cart})
    }
  
} catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}
}