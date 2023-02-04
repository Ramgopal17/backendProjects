module.exports=(sequelize,DataTypes)=>{
    const BuisnessProfile = sequelize.define("buisnessProfile", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
         
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
           
          },
          userName:{
            type: DataTypes.STRING,
            allowNull: false,
          },
         contactNumber:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          profileImage:{
            type: DataTypes.STRING,
            allowNull: false,
          },
        
          
       });
      return BuisnessProfile
    }