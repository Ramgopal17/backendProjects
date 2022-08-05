const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const orderSchema = new mongoose.Schema({


userId:{type:ObjectId,ref: "User",required:true,trim:true},
items: [
    {
        productId: {
            type: ObjectId,
            ref: "Product",
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            trim: true
        }
        
    }],
    totalPrice: {
        type: Number,
        required: true,
        trim: true
    },
    totalItems: {
        type: Number,
        required: true,
        trim: true
    },
    totalQuantity: {
        type: Number,
        trim: true
    },

    cancellable: {type:Boolean, default: true},
    status: {type:String, enum:['pending', 'completed', 'cancled'],default: 'pending'},
    isDeleted: {type:Boolean, default: false}
    
},{timestamps:true})

module.exports = mongoose.model("order", orderSchema);