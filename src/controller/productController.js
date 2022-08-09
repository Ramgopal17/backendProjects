const productModel = require("../model/productModel")
const mongoose = require('mongoose')
const { uploadFile } = require("../controller/awsController")
const { isValid, validName, isValidSize, validField, validPrice } = require("../validation/validation")
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}



exports.createProduct = async function (req, res) {
    try {
        let productData = req.body
        let image = req.files
        let { title, description, price, currencyId, currencyFormat, isFreeShipping, productImage, style, availableSizes, installments } = productData
         if(Object.keys(productData).length==0){
            return res.status(400).send({ status: false, message: "please  provide product details" })
         }


        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "please  provide title" })
        }
        if (!validField(title)) {
            return res.status(400).send({ status: false, message: "please  enter title in correct format" })
        }

        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: "please  provide description" })
        }
        if (!validField(description)) {
            return res.status(400).send({ status: false, message: "please  enter description in correct format" })
        }

        if (!isValid(price)) {
            return res.status(400).send({ status: false, message: "please  provide price" })
        }

        if (!validPrice(price)) {
            return res.status(400).send({ status: false, message: "please  enter price in Number" })
        }
        if (!isValid(currencyId)) {
            return res.status(400).send({ status: false, message: "please  provide currencyId" })
        }
        if (currencyId != "INR") {
            return res.status(400).send({ status: false, message: "please  provide currencyId INR only" })
        }
        if (!isValid(currencyFormat)) {
            return res.status(400).send({ status: false, message: "please  provide currencyFormat" })
        }
        if (currencyFormat != "₹") {
            return res.status(400).send({ status: false, message: "please  provide currencyFormat ₹ only" })
        }

        if (!validName(style)) {
            return res.status(400).send({ status: false, message: "please  enter style in correct format" })
        }


        if (!isValid(availableSizes)) {
            return res.status(400).send({ status: false, message: "please  provide availableSizes" })
        }


        if (! typeof (isFreeShipping) == Boolean) {
            return res.status(400).send({ status: false, message: "please  provide isFreeShipping in True or False" })
        }
        if (image.length == 0) {
            return res.status(400).send({ status: false, message: "please  provide productImage" })
        }

        if (availableSizes) {
            var array = ['S', 'XS', 'M', 'X', 'L', 'XXL', 'XL']

            var size = availableSizes.split(",").map(a => a.trim().toUpperCase())//creating an array

        }

        for (let i = 0; i < size.length; i++) {
            if (!array.includes(size[i])) {
                return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" })
            }
        }

        productData.availableSizes = size
        if (!(/^[0-9]{1,2}$/.test(installments))) {
            return res.status(400).send({ status: false, message: "please  enter installments in Number" })
        }

        let checktitle = await productModel.findOne({ title: title })
        if (checktitle) {
            return res.status(400).send({ status: false, message: "title already exist" })
        }

        let profileImage = await uploadFile(image[0])

        productData.productImage = profileImage


        let created = await productModel.create(productData)
        return res.status(201).send({ status: true, message: "Success", data: created })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}


//===================================================getProduct By Filter ============================================================



exports.getProducts = async (req, res) => {
    try {
        let data = req.query
        let { size, name, priceGreaterThan, priceLessThan, priceSort } = data
        if (!validField(name)) {
            return res.status(400).send({ status: false, message: "please  enter title in correct format" })
        }
        if (priceSort) {
            if (!(priceSort == -1 || priceSort == 1)) {
                return res.status(400).send({ status: false, message: " please enter valid priceSort " })
            }
        }


        let temp = { isDeleted: false }

        let availableSizes = size

        if (availableSizes) {
            let size = availableSizes.toUpperCase().split(",")
            availableSizes = size;


            for (let i = 0; i < availableSizes.length; i++) {
                if (!isValidSize(availableSizes[i])) {
                    return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" })
                }

            }
            // const sizeArray = size.trim().split(",").map((s) => s.trim());
            temp['availableSizes'] = { $in: size }


        }

        if(name){
            if (!isValid(name)) return res.status(400).send({ status: false, message: "name is in incorrect format" })
            temp["title"] = {"$regex": name};
        }
    

            temp = { title: name, ...temp }

        


        if (priceLessThan) {
            if (!validPrice(priceLessThan)) {
                return res.status(400).send({ status: false, message: " please enter valid price " })
            }

            temp['price'] = { $lt: priceLessThan }
        }

        if (priceGreaterThan) {

            if (!validPrice(priceGreaterThan)) {
                return res.status(400).send({ status: false, message: " please enter valid price " })
            }

            temp['price'] = { $gt: priceGreaterThan }
        }
        if (priceGreaterThan && priceLessThan) {
            temp['price'] = { $lt: priceLessThan, $gt: priceGreaterThan }
        }


        let finalData = await productModel.find(temp).sort({ price: priceSort })

        if (finalData.length == 0) {
            return res.status(200).send({ status: false, message: "No product available" })
        }

        return res.status(200).send({ status: true, message: "Success", data: finalData })



    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//=====================================================getProduct By Id=======================================================
exports.getByProductId = async function (req, res) {
    try{
    let productId = req.params.productId

    if (!isValidObjectId(productId)) {
        return res.status(400).send({ status: false, message: "please provide productId in valid format " })
    }
    let getProduct = await productModel.findOne({ _id: productId, isDeleted: false })

    if (!getProduct) {
        return res.status(400).send({ status: true, message: "product not found or already deleted" })
    }
    return res.status(200).send({ status: true, message: "Success", data: getProduct })
    } catch(err){
        return res.status(500).send({ status: false, message: error.message })
    }
}


//===========================================================update product=======================================================


exports.updateProduct = async function (req, res) {
    try {
        let productId = req.params.productId
        let data = req.body
        let ImageProduct = req.files
        let { title, description, price, currencyId, currencyFormat,
            isFreeShipping, style, availableSizes, installments } = data
        if (ImageProduct && ImageProduct.length > 0) {
            data.productImage = ImageProduct
        }


        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "please enter something to update" })
        }


        if (!isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: "please enter valid productId" })
        }
        let checktitle = await productModel.findOne({ title: title })
        if (checktitle) {
            return res.status(400).send({ status: false, message: "title already exist " })
        }

        if (title == "") {
            return res.status(400).send({ status: false, message: "please enter title as a value" })
        }

        if (!validName(title)) {
            return res.status(400).send({ status: false, message: "please enter title in a valid format" })
        }

        if (description == "") {
            return res.status(400).send({ status: false, message: "please enter description as a value" })
        }


        if (!validName(description)) {
            return res.status(400).send({ status: false, message: "please enter description in a valid format" })
        }




        if (price == "") {
            return res.status(400).send({ status: false, message: "please enter price as a value" })
        }
        if (price) {
            if (!validPrice(price)) {
                return res.status(400).send({ status: false, message: " please enter valid price " })
            }
        }

        if (availableSizes) {

            if (availableSizes) {
                let size = availableSizes.toUpperCase().split(",") //creating an array
                availableSizes = size;
            }
            for (let i = 0; i < availableSizes.length; i++) {
                if (!isValidSize(availableSizes[i])) {
                    return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" })
                }
            }

            let updateSize = await productModel.findById(productId)
            var size = updateSize.availableSizes

            for (let i = 0; i < size.length; i++) {

                for (let j = 0; j < availableSizes.length; j++) {

                    if (size[i] == availableSizes[j]) {

                        availableSizes.splice(j, 1)
                        j = j - 1
                    }
                }
            }
            for (let k = 0; k < availableSizes.length; k++) {
                size.push(availableSizes[k])
            }

        }
        if (currencyId) {
            if (currencyId != "INR") {
                return res.status(400).send({ status: false, message: "CurrencyId should only be INR " })
            }
        }
        if (currencyFormat) {
            if (currencyFormat != "₹") {
                return res.status(400).send({ status: false, message: "currencyFormat should only be ₹" })
            }
        }
        if (isFreeShipping) {
            if (!(isFreeShipping == "true" || isFreeShipping == "false")) {
                return res.status(400).send({ status: false, message: " isFreeShipping only be true or false" })
            }
        }
        if (!validName(style)) {
            return res.status(400).send({ status: false, message: " please enter style in correct format" })
        }
        if (installments) {
            if (!/^[0-9]{1,2}$/.test(installments)) {
                return res.status(400).send({ status: false, message: "please enter installments in correct format" })
            }
        }
        if (ImageProduct && ImageProduct.length > 0) {

            var productImage = await uploadFile(ImageProduct[0])
        }

        let updatedProduct = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, {
            $set: {
                title: title, description: description, price: price, currencyId: currencyId, currencyFormat: currencyFormat, isFreeShipping: isFreeShipping,
                productImage: productImage, style: style, availableSizes: size, installments: installments
            }
        }, { new: true })
        if (!updatedProduct) {
            return res.status(400).send({ status: false, message: "product not found or deleted" })
        }

        return res.status(200).send({ status: true, message: "updated", data: updatedProduct })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//=====================================================delete product=======================================================

exports.deleteProduct = async function (req, res) {
    try{
    let productId = req.params.productId

    if (!isValidObjectId(productId)) {
        return res.status(400).send({ status: false, message: "please provide productId in valid format " })
    }

    const deletedProduct = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, { isDeleted: true, deletedAt: new Date() }, { new: true })
    if (!deletedProduct) {
        return res.status(404).send({ status: false, message: "product details not found or already deleted" })
    }
    return res.status(200).send({ status: true, message: "Success" })
    }catch(err){
        return res.status(500).send({ status: false, message: error.message })
    }
}