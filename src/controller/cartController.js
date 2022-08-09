const productModel = require("../model/productModel")
const cartModel = require("../model/cartModel");
const userModel = require("../model/userModel");
const mongoose = require('mongoose')
const { isValid, validName, isValidSize, validField } = require("../validation/validation")


const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

exports.createCart = async function (req, res) {
    try {
        let userId = req.params.userId
        let productId = req.body.productId
        let cartId = req.body.cartId

        let productDetails = {
            productId,
            quantity: 1
        }
        let items = [productDetails]

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id.." })
        const isValidUser = await userModel.findById({ _id: userId })
        if (!isValidUser) return res.status(404).send({ status: false, message: "user not found" })

        if (!isValid(productId)) return res.status(400).send({ status: false, message: "product Id must be present in request Body.." })
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "invalid product Id.." })
        const product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product) return res.status(404).send({ status: false, message: "product not found or may be deleted..." })
        const productPrice = product.price
        
        const cart = await cartModel.findOne({ userId: userId })



        if (cart) {
            if(!isValid(cartId)){ return res.status(400).send({ status: false, message: "please enter cartId" }) }
            if (!isValidObjectId(cartId)) return res.status(400).send({ status: false, message: "invalid cart Id.." })
            if (!await cartModel.findById(cartId)) return res.status(400).send({ status: false, message: "Cart does not exist" })
            let productIds = cart.items.map(x => x.productId.toString())
            if (productIds.includes(productId)) {
                let updatedCart = await cartModel.findOneAndUpdate({ "items.productId": productId, userId: userId,_id:cartId}, { $inc: { "items.$.quantity": 1, totalPrice: productPrice } }, { new: true })
                return res.status(200).send({ status: true, message: "Success", data: updatedCart })
            }
            else {

                let updatedCart = await cartModel.findOneAndUpdate({ userId: userId }, { $push: { items: productDetails }, $inc: { totalItems: 1, totalPrice: productPrice } }, { new: true })
                return res.status(200).send({ status: true, message: "Success", data: updatedCart })
            }
        }

        const cartCreate = {
            userId: userId,
            items: items,
            totalItems: items.length,
            totalPrice: productPrice
        }
        const cartCreated = await cartModel.create(cartCreate)
        return res.status(201).send({ status: true, message: "Success", data: cartCreated })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }

}



exports.updateCart = async function (req, res) {

    userId = req.params.userId
   

    if (!isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: "invalid user Id.." })
    }

    body = req.body

    let { removeProduct, productId } = body

    if(!isValid(removeProduct)){
        return res.status(400).send({ status: false, message: "please enter remove product as a value" })
    }
    if(!( removeProduct == 0 || removeProduct == 1)){
        return res.status(400).send({ status: false, message: "please enter  remove product 0 or 1 as  a value" })
    }
    if(!isValid(productId)){
        return res.status(400).send({ status: false, message: " please enter product id as a value .." })
    }
    
    if (!isValidObjectId(productId)) {
        return res.status(400).send({ status: false, message: `invalid  productId- ${productId}` })
    }

    let cart = await cartModel.findOne({ userId: userId })
  

    if (!cart) {
        return res.status(400).send({ status: false, message: "cart does not exist" })

    } else if (cart) {
        for (i = 0; i < cart.items.length; i++) {
            if (cart.items[i].productId == productId) {
                var qun = cart.items[i].quantity
            }
            
        }
        let product = await productModel.findOne({ _id: productId })
        if (!product) {
            return res.status(404).send({ status: false, message: "product not found or product is deleted." })
        }
        let xyz=cart.items.map(  x => x.productId.toString())
        
    if(xyz.includes(productId)==false){
        return res.status(404).send({ status: false, message: "this product is not exist in cart" })
    }
        

        let a = product.price * qun


        let b = product.price

        if (removeProduct == 0) {

            let updated = await cartModel.findOneAndUpdate({userId:userId,"items.productId":productId }, { $pull: { items: { productId: productId } }, $inc: { totalPrice: -a, totalItems: -1 } }, { new: true })


            return res.status(200).send({ status: true, message: "Success", data: updated })

        } else if (removeProduct == 1) {
            if (qun == 1) {

                let updated = await cartModel.findOneAndUpdate({userId:userId, "items.productId":productId }, { $pull: { items: { productId: productId } }, $inc: { totalPrice: -b, totalItems: -1 } }, { new: true })
                if (!updated) {
                    return res.status(400).send({ status: false, message: "it is not updated" })
                }
                return res.status(200).send({ status: true, message: "Success", data: updated })

            } else {

                let updated = await cartModel.findOneAndUpdate({ userId:userId,"items.productId": productId }, { $inc: { totalPrice: -b, "items.$.quantity": -1 } }, { new: true })
                return res.status(200).send({ status: true, message: "Success", data: updated })


            }
        }
    }
}

exports.getCartById = async function (req, res) {
    const userId = req.params.userId
    if (!isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: "invalid userId" })
    }
    const userDetails = await userModel.findOne({ _id: userId })
    if (!userDetails) {
        return res.status(400).send({ status: false, message: "user not found" })
    }
    const getCartDetails = await cartModel.findOne({ userId: userId,isDeleted:false })

    if (!getCartDetails) {
        return res.status(400).send({ status: false, message: "user does't exist" })

    }
    return res.status(200).send({ status: true, message: "Success", data: getCartDetails })
}


exports.DeleteCartById = async function (req, res) {
    const userId = req.params.userId
    if (!isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: "invalid userId" })
    }
    const userDetails = await userModel.findOne({ _id: userId })
    if (!userDetails) {
        return res.status(400).send({ status: false, message: "user not found" })
    }
    const DeleteCartDetails = await cartModel.findOneAndUpdate({ userId: userId, isDeleted: false }, { $set: { items: [], totalPrice: 0, totalItems: 0 } }, { new: true })
    if (!DeleteCartDetails) {
        return res.status(404).send({ status: false, message: "cart already deleted or not found" })
    }
    return res.status(204).send({ status: true, message: "Success" })
}

