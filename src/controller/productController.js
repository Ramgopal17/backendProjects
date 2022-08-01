const productModel = require("../model/productModel")

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
    let data=req.params.productId
    let getProduct=await productModel.findById(data)
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

