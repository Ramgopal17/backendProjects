const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    {
        userId: {type:ObjectId, ref:User, required:true, unique:true},
        items: [{
          productId: {type:ObjectId, ref ,required:true },
          quantity: {type:Number, required:true,}
        }],
        totalPrice: {type:Number,required:true, comment: "Holds total price of all the items in the cart"},
        totalItems: {type:Number, required:true, comment: "Holds total number of items in the cart"},
     
      }


})