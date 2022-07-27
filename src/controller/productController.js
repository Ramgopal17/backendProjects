const product = require("../model/productModel");
const mongoose = require('mongoose')
//const { uploadFile } = require("../controller/awsController");
const { isValid } = require("../validation/validation");
const productModel = require("../model/productModel");



const createProduct = async (req, res) => {


  let data = req.body;
 const {title, description, price, currencyId, currencyFormat, isFreeShipping, style, availableSizes, installments} = data

if (!title) {
 return res.status(400).send({ status: false, msg: "please enter title" })
}
  let productCreated = await productModel.create(data)
  return res.status(201).send({ status: true, msg: 'sucessfully created', data: productCreated })








}

module.exports.createProduct = createProduct; 