const productModel = require("../model/productModel")
const mongoose = require('mongoose')
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
exports.createProduct = async function (req, res) {
    let productData = req.body
    let { title, description, price, currencyId, currencyFormat, isFreeShipping, productImage, style, availableSizes, installments } = productData
   let imageUrl = req.xyz
   productData.productImage = imageUrl

if(!isValid(title)){
    return res.status(400).send({status: false, message: "please  provide title" })
}
if(!validName(title)){
    return res.status(400).send({status: false, message: "please  enter title in correct format" })
}

if(!isValid(description)){
    return res.status(400).send({status: false, message: "please  provide description" })
}
if(!validName(description)){
    return res.status(400).send({status: false, message: "please  enter description in correct format" })
}

if(!isValid(price)){
    return res.status(400).send({status: false, message: "please  provide price" })
}
if( !(/^[0-9]{1,100}$/.test(price))){
    return res.status(400).send({status: false, message: "please  enter price in Number" })
}

if(!isValid(currencyId)){
    return res.status(400).send({status: false, message: "please  provide currencyId" })
}
if(!validName(currencyId)){
    return res.status(400).send({status: false, message: "please  enter currencyId in correct format" })
}

if(!validName(style)){
    return res.status(400).send({status: false, message: "please  enter style in correct format" })
}

if(!isValid(currencyFormat)){
    return res.status(400).send({status: false, message: "please  provide currencyFormat" })
}
if(!isValid(availableSizes)){
    return res.status(400).send({status: false, message: "please  provide availableSizes" })
}


if(! typeof(isFreeShipping) == Boolean ){
    return res.status(400).send({status: false, message: "please  provide isFreeShipping in True or False" })
}
console.log(typeof(availableSizes))
if(  !(availableSizes =="S"|| availableSizes == "XS"|| availableSizes == "M"|| availableSizes == "X" || availableSizes == "L" || availableSizes == "XXL" || availableSizes =="XL" )){
    return res.status(400).send({status: false, message: "please enter availableSizes in S, XS , M , X , L , XXL , XL" })
}

if( !(/^[0-9]{1,2}$/.test(installments))){
    return res.status(400).send({status: false, message: "please  enter installments in Number" })
}

let checktitle = await productModel.findOne({ title:title})
if(checktitle){
    return res.status(400).send({status: false, message: "title already exist" })
}

    let created=await productModel.create(productData)
   return res.status(201).send({status:true,msg:"succes",data:created})
   
}






exports.getProducts=async function(req,res){
    let data=req.query
    // $or:[{title:title},{price:price},{availableSizes:availableSizes}]
   console.log(data)
    let{price,availableSizes,title}=data
    let getProductsDetails=await productModel.find({$and:[data]})
   return res.status(200).send({status:true,msg:"products list",data:getProductsDetails})

}
exports.getByProductId=async function(req,res){
    let productId=req.params.productId
   if(!isValidObjectId(productId)){
    return res.status(400).send({status:false,msg:"please provide productId in valid format "})
   }
    let getProduct=await productModel.findOne({_id:productId,isDeleted:false})
    console.log(getProduct)
    if(!getProduct){
        return res.status(400).send({status:true,msg:"product not found or already deleted"})
    }
    return res.status(200).send({status:true,msg:"product list",data:getProduct})

}
exports.updateProduct=async function(req,res){
  let data=req.params.productId
  let {title, description, price, currencyId, currencyFormat,
    isFreeShipping, productImage, style, availableSizes, installments}=req.body
    let updatedProduct=await productModel.findOneAndUpdate({_id:data},{$set:{title:title,description:description,price:price,currencyId:currencyId ,currencyFormat:currencyFormat,isFreeShipping:isFreeShipping,
    productImage:productImage,style:style,availableSizes:availableSizes,installments:installments }},{new:true})
    return res.status(200).send({status:true,msg:"updated",data:updatedProduct})
}

