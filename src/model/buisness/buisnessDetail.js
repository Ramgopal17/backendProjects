module.exports=(sequelize,DataTypes)=>{
    const BuisnessDetail = sequelize.define("buisnessDetail", {
        buisnessName: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
        buisnessWebsite: {
          type: DataTypes.STRING,
          allowNull: false,
         
        },
        from: {
            type: DataTypes.STRING,
            
           
          },
          to:{
            type: DataTypes.STRING,
            
          },
         facebookLink:{
            type: DataTypes.STRING,
           
          },
          instagramLink:{
            type: DataTypes.STRING,
           
          },
          youtubeLink:{
            type: DataTypes.STRING,
            
          },
          
       }, { timestamps: false });
       BuisnessDetail.removeAttribute('id');
      return BuisnessDetail
    }