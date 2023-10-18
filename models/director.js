const Director = sequelize.define('directors');



module.exports= (sequelize, type) =>{
    const Director = sequelize.define('directors', {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        lastName: type.STRING
    });
    return Director;
 }