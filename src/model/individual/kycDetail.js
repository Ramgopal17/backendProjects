module.exports=(sequelize,DataTypes)=>{
    const KycData = sequelize.define("kycData", {
        aadharCard: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
        panCard: {
          type: DataTypes.STRING,
          allowNull: false,
         
        },
       
          
          
       });
      return KycData
    }