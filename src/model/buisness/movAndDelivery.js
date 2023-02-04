module.exports=(sequelize,DataTypes)=>{
    const Mov = sequelize.define("mov", {
        mov: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
        estimatedDelivery: {
          type: DataTypes.STRING,
          allowNull: false,
         
        },
        
          
       });
       Mov.removeAttribute('id');
      return Mov
    }