module.exports=(sequelize,DataTypes)=>{
    const ProfessionalDetail = sequelize.define("professionalDetail", {
        service: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
        experience: {
          type: DataTypes.STRING,
          allowNull: false,
         
        },
       
          
          
       });
      return ProfessionalDetail
    }