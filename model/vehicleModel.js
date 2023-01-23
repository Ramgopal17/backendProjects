module.exports=(sequelize,DataTypes)=>{
    const Vehicle = sequelize.define("vehicle", {

        typeOfVehicle: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        insuranceProvider: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        driverLicenceNumber: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          insurancePolicyNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
          }
        });
      return Vehicle
    }
    