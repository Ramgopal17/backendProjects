module.exports=(sequelize,DataTypes)=>{
    const KycDetail = sequelize.define("kycDetail", {
        aadharCard: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
        panCard: {
          type: DataTypes.STRING,
          allowNull: false,
         
        },
        gstRegistration: {
            type: DataTypes.STRING,
            allowNull: false,
           
          }
        
          
       });
       KycDetail.removeAttribute('id');
      return KycDetail
    }