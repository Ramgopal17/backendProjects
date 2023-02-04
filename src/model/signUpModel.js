
module.exports=(sequelize,DataTypes)=>{
    const SignUp = sequelize.define("signUp", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
             unique:true
          },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
         
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          repeatPassword:{
            type: DataTypes.STRING,
            allowNull: false,
          }
          

        
    });
      return SignUp
    }