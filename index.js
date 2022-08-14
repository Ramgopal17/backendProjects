const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');

const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://sagarpatel14:6jM0LEgFZ8l7EID9@cluster0.nuwvybs.mongodb.net/RAMGOPALK6264-DB", {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected")) // asynchronous behaviour
    .catch(err => console.log(err))

app.use('/', route)


app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});