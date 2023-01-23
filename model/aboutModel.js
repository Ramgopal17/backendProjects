module.exports=(sequelize,DataTypes)=>{
    const About = sequelize.define("about", {
       
        info: {
          type: DataTypes.STRING,
          allowNull: false,
        }
        });
      return About
    }
    