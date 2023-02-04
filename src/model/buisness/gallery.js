module.exports=(sequelize,DataTypes)=>{
    const Gallery = sequelize.define("gallery", {
        uploadPhotos: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
       
       
          
       }, { timestamps: false });
       Gallery.removeAttribute('id');
      return Gallery
    }