module.exports=(sequelize,DataTypes)=>{
    const PersonalData= sequelize.define("personalData", {
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
    
          contactNumber:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          profileImage:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          
          
       },{ timestamps: false });
      return PersonalData
    }