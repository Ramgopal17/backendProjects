const productModel = require("../model/productModel")
const mongoose = require('mongoose')
const { isValid, validName, isValidSize } = require("../validation/validation")
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}



exports.createProduct = async function (req, res) {
    let productData = req.body
    let { title, description, price, currencyId, currencyFormat, isFreeShipping, productImage, style, availableSizes, installments } = productData
    let imageUrl = req.xyz
    productData.productImage = imageUrl

    if (!isValid(title)) {
        return res.status(400).send({ status: false, message: "please  provide title" })
    }
    if (!validName(title)) {
        return res.status(400).send({ status: false, message: "please  enter title in correct format" })
    }

    if (!isValid(description)) {
        return res.status(400).send({ status: false, message: "please  provide description" })
    }
    if (!validName(description)) {
        return res.status(400).send({ status: false, message: "please  enter description in correct format" })
    }

    if (!isValid(price)) {
        return res.status(400).send({ status: false, message: "please  provide price" })
    }
    if (!(/^[0-9]{1,100}$/.test(price))) {
        return res.status(400).send({ status: false, message: "please  enter price in Number" })
    }

    if (!isValid(currencyId)) {
        return res.status(400).send({ status: false, message: "please  provide currencyId" })
    }
    if (!validName(currencyId)) {
        return res.status(400).send({ status: false, message: "please  enter currencyId in correct format" })
    }

    if (!validName(style)) {
        return res.status(400).send({ status: false, message: "please  enter style in correct format" })
    }

    if (!isValid(currencyFormat)) {
        return res.status(400).send({ status: false, message: "please  provide currencyFormat" })
    }
    if (!isValid(availableSizes)) {
        return res.status(400).send({ status: false, message: "please  provide availableSizes" })
    }


    if (! typeof (isFreeShipping) == Boolean) {
        return res.status(400).send({ status: false, message: "please  provide isFreeShipping in True or False" })
    }

    if (availableSizes) {
        let size = availableSizes.toUpperCase().split(",") //creating an array
        availableSizes = size;
    }

    for (let i = 0; i < availableSizes.length; i++) {
        if (!isValidSize(availableSizes[i])) {
            return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" })
        }
    }


    if (!(/^[0-9]{1,2}$/.test(installments))) {
        return res.status(400).send({ status: false, message: "please  enter installments in Number" })
    }

    let checktitle = await productModel.findOne({ title: title })
    if (checktitle) {
        return res.status(400).send({ status: false, message: "title already exist" })
    }

    let created = await productModel.create(productData)
    return res.status(201).send({ status: true, msg: "succes", data: created })

}






exports.getProducts = async function (req, res) {
    let data = req.query

    let { price, availableSizes, title } = data

    if (availableSizes) {
        let size = availableSizes.toUpperCase().split(",") //creating an array
        availableSizes = size;
    }

    for (let i = 0; i < availableSizes.length; i++) {
        if (!isValidSize(availableSizes[i])) {
            return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" })
        }
    }
    let getProductsDetails = await productModel.find({ $and: [data] })
    return res.status(200).send({ status: true, msg: "products list", data: getProductsDetails })

}
exports.getByProductId = async function (req, res) {
    let productId = req.params.productId

    if (!isValidObjectId(productId)) {
        return res.status(400).send({ status: false, msg: "please provide productId in valid format " })
    }
    let getProduct = await productModel.findOne({ _id: productId, isDeleted: false })

    if (!getProduct) {
        return res.status(400).send({ status: true, msg: "product not found or already deleted" })
    }
    return res.status(200).send({ status: true, msg: "product list", data: getProduct })

}


//--------------------------------------------------------update product-----------------------------------------------------------


exports.updateProduct = async function (req, res) {
    try {
        let productId = req.params.productId

        let { title, description, price, currencyId, currencyFormat,
            isFreeShipping, productImage, style, availableSizes, installments } = req.body
        let imageUrl = req.xyz
        productImage = imageUrl

        if (!isValidObjectId(productId)) {
            return res.status(400).send({ status: false, msg: "please enter valid productId" })
        }
        let checktitle = await productModel.findOne({ title: title })
        if (checktitle) {
            return res.status(400).send({ status: false, msg: "title already exist " })
        }

        if (title == "") {
            return res.status(400).send({ status: false, msg: "please enter title as a value" })
        }

        if (!validName(title)) {
            return res.status(400).send({ status: false, msg: "please enter title in a valid format" })
        }

        if (description == "") {
            return res.status(400).send({ status: false, msg: "please enter description as a value" })
        }


        if (!validName(description)) {
            return res.status(400).send({ status: false, msg: "please enter description in a valid format" })
        }




        if (price == "") {
            return res.status(400).send({ status: false, msg: "please enter price as a value" })
        }
        if (price) {
            if (!/^[0-9]{1,100}$/.test(price)) {
                return res.status(400).send({ status: false, msg: "please enter price in correct format" })
            }
        }

        if (availableSizes) {
            for (let i = 0; i < availableSizes.length; i++) {
                if (!isValidSize(availableSizes[i])) {
                    return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" })
                }
            }
        }
        if (currencyId) {
            if (currencyId != "INR") {
                return res.status(400).send({ status: false, msg: "CurrencyId should only be INR " })
            }
        }
        if (currencyFormat) {
            if (currencyFormat != "₹") {
                return res.status(400).send({ status: false, msg: "currencyFormat should only be ₹" })
            }
        }
        if (isFreeShipping) {
            if (!(isFreeShipping == "true" || isFreeShipping == "false")) {
                return res.status(400).send({ status: false, msg: " isFreeShipping only be true or false" })
            }
        }
        if (!validName(style)) {
            return res.status(400).send({ status: false, msg: " please enter style in correct format" })
        }
        if (installments) {
            if (!/^[0-9]{1,2}$/.test(installments)) {
                return res.status(400).send({ status: false, msg: "please enter installments in correct format" })
            }
        }

        let updatedProduct = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, {
            $set: {
                title: title, description: description, price: price, currencyId: currencyId, currencyFormat: currencyFormat, isFreeShipping: isFreeShipping,
                productImage: productImage, style: style, availableSizes: availableSizes, installments: installments
            }
        }, { new: true })
        if (!updatedProduct) {
            return res.status(400).send({ status: false, msg: "product not found or deleted" })
        }
        // let updatedProduct = await productModel.findOneAndDelete({ _id: data, final}, {new: true })
        return res.status(200).send({ status: true, msg: "updated", data: updatedProduct })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

