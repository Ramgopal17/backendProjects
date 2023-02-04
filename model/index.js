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

db.about = require("./aboutModel.js")(sequelize, DataTypes);
db.ambulance=require("./ambulanceModel.js")(sequelize,DataTypes)
db.booking=require("./bookingModel.js")(sequelize,DataTypes)
db.contact=require("./contactUsModel.js")(sequelize,DataTypes)
db.user=require("./userModel.js")(sequelize,DataTypes)
db.vehicle=require("./vehicleModel")(sequelize,DataTypes)
db.bank=require("./bankModel")(sequelize,DataTypes)
db.address=require("./addressModel")(sequelize,DataTypes)
db.branchAddress=require("./branchAddressModel")(sequelize,DataTypes)
// db.address.belongsTo(db.user)
// db.user.hasOne(db.address)








db.sequelize.sync({ force: false })
.then(() => {
    console.log('sql is connected !')
})

module.exports=db

