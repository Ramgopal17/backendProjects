module.exports=(sequelize,DataTypes)=>{
    const Faq = sequelize.define("faq", {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
          
          },
       
       
          
       });
       Faq.removeAttribute('id');
      return Faq
    }