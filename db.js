const Sequelize = require('sequelize');

const userModel = require('./models/user');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');
const bookingModel = require('./models/booking');
const copyModel = require('./models/copy');

/*
    1) Nombre base de datos
    2) Usuario base de datos
    3) Contraseña base de datos
    4) Objeto de configuracion ORM
*/
const sequelize = new Sequelize('videoclub', 'root', 'uwu', {
        host: 'db_mysql', // db_mysql, localhost
        dialect: 'mysql',
        retry: {
            max: 1000
        }
        });

const User = userModel(sequelize, Sequelize);
const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);

// Un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as:'movies'});

// Un pelicula tiene un genero
Movie.belongsTo(Genre, {as:'genre'});

// Un director puede tener muchas peliculas
Director.hasMany(Movie, {as:'movies'});

// Una pelicula tiene un director
Movie.belongsTo(Director, {as: 'director'});

// Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreingKey: 'movieId'});

// En una pelicula participan muhos actores
MovieActor.belongsTo(Actor, {foreingKey: 'actorId'});

// Una pelicula tiene varias copias
Movie.hasMany(Copy, {as:'copies'});

// Una copia tiene una pelicula
Copy.belongsTo(Movie, {as:'movie'});

// Una copia tiene muchas reservas
Copy.hasMany(Booking,{as:'bookings'});

// Una reserva tiene una copia
Booking.belongsTo(Copy, {as:'copy'});

// Un miembro puede tener muchas reservas
Member.hasMany(Booking, {as:'bookings'});

// Una reserva tiene un miembro
Booking.belongsTo(Member, {as:'members'});

Movie.belongsToMany(Actor, {
    foreingKey: 'actorId',
    as: 'actors',
    through: 'movies_actors' // por al tabla
});

Actor.belongsToMany(Movie,{
    foreingKey: 'movieId',
    as: 'movies',
    through: 'movies_actors'
});

sequelize.sync({ // Solo para el desarrollo
    force: true
}).then(() => {
    console.log('Base de datos sincronizada');
});

module.exports = { User, Director, Genre, Movie, Actor, Member, Booking, Copy };