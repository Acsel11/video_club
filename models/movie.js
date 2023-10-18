module.exports = (sequelize, type) => {
    const Movie = sequelize.define('movies', {
            id: {type: type.INTEGER, primaryKey: true, autoIncrement: TRUE},
            title: type.STRING

    });
    return Movie;
};