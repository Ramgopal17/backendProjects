module.exports=(sequelize,DataTypes)=>{
    const Ambulance = sequelize.define("ambulance", {

        vehicleType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        info: {
          type: DataTypes.STRING,
          allowNull: false,
        }
        });
      return Ambulance
    }
    