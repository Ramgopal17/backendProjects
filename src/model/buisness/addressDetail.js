module.exports=(sequelize,DataTypes)=>{
    const AddressDetail = sequelize.define("addressDetail", {
        address: {
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
          landMark:{
            type: DataTypes.STRING,
            allowNull: false,
          },
         pinCode:{
            type: DataTypes.STRING,
            allowNull: false,
          }
          
       }, { timestamps: false });
       AddressDetail.removeAttribute('id');
      return AddressDetail
    }
   