const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Actor = require("../models/Actor");
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const getAll = catchError(async (req, res) => {
    const results = await Movie.findAll({
        include: [
            { model: Actor, attributes: ['firstname', 'lastname', "nationality","image","birthday"] }, 
            { model: Director,attributes: ['firstname', 'lastname', "nationality","image","birthday"] },  
            { model: Genre,attributes: ['name' ] },  
        ]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});
const updateGenres = catchError(async (req, res) => {
    const { id } = req.params;
    const { genreIds } = req.body;

    // Validar si la película existe
    const movie = await Movie.findByPk(id);
    if (!movie) {
        return res.sendStatus(404);
    }

    // Validar si los géneros existen
    const existingGenres = await Genre.findAll({
        where: { id: genreIds }
    });

    // Filtrar los IDs de los géneros que existen
    const existingGenreIds = existingGenres.map(genre => genre.id);

    // Actualizar los géneros de la película
    await movie.setGenres(existingGenreIds);

    // Obtener los géneros actualizados de la película
    const updatedGenres = await movie.getGenres();

    return res.status(200).json(updatedGenres);
});

const updateActors = catchError(async (req, res) => {
    const { id } = req.params;
    const { actorIds } = req.body;

    // Validar si la película existe
    const movie = await Movie.findByPk(id);
    if (!movie) {
        return res.sendStatus(404);
    }

    // Validar si los actores existen
    const existingActors = await Actor.findAll({
        where: { id: actorIds }
    });

    // Filtrar los IDs de los actores que existen
    const existingActorIds = existingActors.map(actor => actor.id);

    // Actualizar los actores de la película
    await movie.setActors(existingActorIds);

    // Obtener los actores actualizados de la película
    const updatedActors = await movie.getActors();

    return res.status(200).json(updatedActors);
});


const updateDirectors = catchError(async (req, res) => {
    const { id } = req.params;
    const { directorIds } = req.body;

    // Validar si la película existe
    const movie = await Movie.findByPk(id);
    if (!movie) {
        return res.sendStatus(404);
    }

    // Validar si los directores existen
    const existingDirectors = await Director.findAll({
        where: { id: directorIds }
    });

    // Filtrar los IDs de los directores que existen
    const existingDirectorIds = existingDirectors.map(director => director.id);

    // Actualizar los directores de la película
    await movie.setDirectors(existingDirectorIds);

    // Obtener los directores actualizados de la película
    const updatedDirectors = await movie.getDirectors();

    return res.status(200).json(updatedDirectors);
});



const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    updateGenres,
    updateActors,
    updateDirectors
}