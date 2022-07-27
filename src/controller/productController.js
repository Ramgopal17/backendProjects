const productModel = require("../model/productModel")
const mongoose = require('mongoose')
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
exports.createProduct = async function (req, res) {
    let productData = req.body
    let { title, description, price, currencyId, currencyFormat, isFreeShipping, productImage, style, availableSizes, installments } = productData
   let imageUrl=req.xyz
   productData.productImage=imageUrl
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

