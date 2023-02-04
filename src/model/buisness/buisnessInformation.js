module.exports=(sequelize,DataTypes)=>{
    const BuisnessInfo = sequelize.define("buisnessInfo", {
      NameOfbuisness: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
          buisnessDescription: {
            type: DataTypes.STRING
           
          
          },
        buisnessCategory: {
                type:DataTypes.ENUM,
                values: ['Machinery and equipment', 'wheels and trucks', 'Services']
              }
       });
       BuisnessInfo.removeAttribute('id');
      return BuisnessInfo
    }