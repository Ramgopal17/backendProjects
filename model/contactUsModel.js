module.exports=(sequelize,DataTypes)=>{
    const Contact = sequelize.define("contact", {

        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
          }
        });
      return Contact
    }
    