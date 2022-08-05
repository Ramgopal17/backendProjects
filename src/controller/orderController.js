const orderModel = require("../model/orderModel.js")
const mongoose = require('mongoose')
const cartModel = require("../model/cartModel")
const { isValid } = require("../validation/validation.js")
const userModel = require("../model/userModel.js")

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}


exports.createOrder = async function (req, res) {
    userId = req.params.userId
    if (!isValidObjectId(userId)) {
    return    res.status(400).send({ status: false, message: "invalid userId" })
    }
    body = req.body
    if (Object.keys(body).length == 0) {
      return  res.status(400).send({ status: false, message: "body should not be empty" })
    }
    let { cartId, cancellable, status } = body
    if(!isValid(cartId)){
        return res.status(400).send({status:false, msg:'cartId is required'})
    }
    if (!isValidObjectId(cartId))
        return res.status(400).send({ status: false, msg: ` cartId ${cartId} is invalid` })

    let cart = await cartModel.findOne({ _id: cartId, userId:userId})
    
    if (!cart) {
     return  res.status(404).send({ status: false, message: "cart not found or deleted" });
    }
    
    let quantity = cart.items.map(x => x.quantity)

    let sum = 0
    for (i = 0; i < quantity.length; i++) {
        sum = sum + quantity[i]
    }

    cart.totalQuantity = sum

    let data = {}

    data.userId = userId
    data.items = cart.items
    data.totalPrice = cart.totalPrice
    data.totalItems = cart.totalItems
    data.totalQuantity = sum
    data.cancellable = cancellable
    data.status = status

    let createdOrder = await orderModel.create(data)
    console.log(cartId)
    const DeleteCartDetails = await cartModel.findOneAndUpdate({ userId: userId, _id:cartId }, { $set: { items: [], totalPrice: 0, totalItems: 0 } }, { new: true })
   
    return res.status(201).send({ status: true, message: "Success", data: createdOrder })

}


exports.updateOrder = async function (req, res) {
    userId = req.params.userId
    if (!isValidObjectId(userId))
        return res.status(400).send({ status: false, msg: `${userId} is invalid` });

    const validuser = await userModel.findOne({ _id: userId })
    if (!validuser) return res.status(404).send({ status: false, msg: "User doesnot exists" })
    body = req.body

    if (Object.keys(body).length == 0)
     return   res.status(400).send({ status: false, message: "body should not be empty" })

    let { orderId, status } = body
    if (!isValid(orderId))
        return res.status(400).send({ status: false, msg: "orderId is required" })
    if (!isValidObjectId(orderId))
        return res.status(400).send({ status: false, msg: `orderId ${orderId} is invalid` });

    const validOrder = await orderModel.findOne({ _id: orderId })

    if (!validOrder) return res.status(404).send({ status: false, message: "Order does not exists" })

    if (!isValid(status))
        return res.status(400).send({ status: false, msg: "status is required" })

    if (['pending', 'completed', 'cancelled'].indexOf(status) === -1)
        return res.status(400).send({ status: false, message: `Order status should be 'pending', 'completed', 'cancelled' ` })
    

    if (validOrder.status == 'cancelled')
        return res.status(400).send({ status: false, message: "This order is already cancelled" })

    if (validOrder.status == 'completed' && status == 'pending')
        return res.status(400).send({ status: false, message: "This order is already completed" })

    if (status == 'cancelled') {
        if (validOrder.cancellable == false)
            return res.status(400).send({ status: false, message: "This order is not cancellable." })
    }




    let data = {}
    data.status = status
    // data.isDeleted = isDeleted

    let a = await orderModel.findOneAndUpdate({ _id: orderId }, data, { new: true })
 return   res.status(200).send({ status: true, message: "Success", data: a })
}


// let token=req.headers.authorisation