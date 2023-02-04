module.exports=(sequelize,DataTypes)=>{
    const ProductService = sequelize.define("productService", {
        NameOfProduct: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
         
        },
        description:{
            type: DataTypes.STRING,
           
        },
        uploadImage:{
            type: DataTypes.STRING,
            
        },
       });
       ProductService.removeAttribute('id');
      return ProductService
    }