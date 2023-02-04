const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/dbConfig.js');


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
       
    }
}
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.signUp = require("./signUpModel.js")(sequelize, DataTypes);

db.personalDetail=require("./buisness/personalDetail")(sequelize, DataTypes);
db.buisnessDetail=require("./buisness/buisnessDetail")(sequelize, DataTypes);
db.addressDetail= require("./buisness/addressDetail")(sequelize, DataTypes);
db.kycDetail=require("./buisness/kycDetail")(sequelize, DataTypes);
db.buisnessInfo=require("./buisness/buisnessInformation")(sequelize, DataTypes);
db.productService=require("./buisness/productService")(sequelize, DataTypes)
db.mov=require("./buisness/movAndDelivery")(sequelize, DataTypes)
db.gallery=require("./buisness/gallery")(sequelize, DataTypes)
db.paymentInfo=require("./buisness/paymentInfo")(sequelize, DataTypes)
db.faq=require("./buisness/freq asked q")(sequelize, DataTypes)
// ----------------individual--------------------------------
db.personalData=require("./individual/personalData")(sequelize, DataTypes)
db.professionalDetail=require("./individual/professionalDetail")(sequelize, DataTypes)
db.kycData=require("./individual/kycDetail")(sequelize, DataTypes)



db.sequelize.sync({ force: false })
.then(() => {
    console.log('sql is connected !')
})

module.exports=db

