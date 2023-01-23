module.exports=(sequelize,DataTypes)=>{
    const Bank = sequelize.define("bank", {

        bankName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        
        branchName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
         
        });
      return Bank
    }
    