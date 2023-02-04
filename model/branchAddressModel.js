module.exports=(sequelize,DataTypes)=>{
    const BranchAddress = sequelize.define("branchAddress", {

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
          },
          postalCode:{
            type:DataTypes.INTEGER,
            allowNull: false,
          }
        });
        BranchAddress.removeAttribute('id')
      return BranchAddress 
    }
  
  
    