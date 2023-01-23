module.exports=(sequelize,DataTypes)=>{
    const Address = sequelize.define("address", {

        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
          }
        },{id:false});
      return Address 
    }
    