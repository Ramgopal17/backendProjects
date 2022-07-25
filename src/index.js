const express = require('express');

const route = require('./route/route.js');
const multer=require("multer")

const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any())
mongoose.connect("mongodb+srv://AnkeshSh07:Ny4Y2QcGUU665ifF@cluster0.62uqo.mongodb.net/group32Database", {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected")) // asynchronous behaviour
    .catch(err => console.log(err))

app.use('/', route)


app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});