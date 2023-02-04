module.exports=(sequelize,DataTypes)=>{
    const PaymentInfo = sequelize.define("paymentInfo", {
        paymentOptions: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
          paymentTerms: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
       
       
          
       });
       PaymentInfo.removeAttribute('id');
      return PaymentInfo
    }