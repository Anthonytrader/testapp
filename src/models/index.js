const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor = require('../models/Actor');

Movie.belongsToMany(Actor,{through: "MoviesActors"});
Actor.belongsToMany(Movie,{through:"MoviesActors"});

Movie.belongsToMany(Genre, { through: "MovieGenres" });
Genre.belongsToMany(Movie, { through: "MovieGenres" });

Director.belongsToMany(Movie,{through:"MovieDirector"});
Movie.belongsToMany(Director,{through:"MovieDirector"});