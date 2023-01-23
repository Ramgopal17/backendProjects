module.exports=(sequelize,DataTypes)=>{
    const Booking = sequelize.define("booking", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
            
          },
        vehicleType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
       
        pickUpLocation: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          dropLocation: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          scheduleTime: {
            type: DataTypes.ENUM("Book now","Book later"),
            allowNull: false,
          }
        });
      return Booking
    }
    