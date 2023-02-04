module.exports=(sequelize,DataTypes)=>{
    const PaymentInfo = sequelize.define("paymentInfo", {
        paymentOptions: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
          paymentTerms: {
            type: DataTypes.STRING,
            allowNull: false,
            values: ['select all','cash','Net banking','cheque/DD','UPI',"NetBanking"]
          
          },
       
       
          
       });
       PaymentInfo.removeAttribute('id');
      return PaymentInfo
    }