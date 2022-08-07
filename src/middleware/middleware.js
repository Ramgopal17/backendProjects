const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


exports.authentication = async function (req, res, next) {
    try {


        let token = req.headers['authorization']
        
        if (!token) {
            return res.status(400).send({ status: false, msg: "token is not present" })
        }
        
        let a = token.split("")

        token = a.splice(7, token.length)
        token = token.join("")

      
        let decodedToken = jwt.verify(token, "ourFifthProject", function (err, decodedToken) {
            if (err) {
                return res.status(401).send({ status: false, msg: "you are not authenticate" })
            }
            
            let time = Date.now()
            let exp = decodedToken.exp
            if (time > exp) {
                return res.status(400).send({ status: false, message: "Token is expired" })
            }

            else {

                req.decodedToken = decodedToken

                next()
            }
        })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

exports.authorization = async function (req, res, next) {
    try {
        let userId = req.params.userId
        let decodedToken = req.decodedToken
        let decodeUserId = decodedToken.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, msg: "userid  is not valid" })

        }


        if (userId != decodeUserId) {
            return res.status(403).send({ status: false, msg: "you are not authorise" })
        }
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}