const { getAll, create, getOne, remove, update } = require('../controllers/movie.controller');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/movies')
    .get(getAll)
    .post(create);

    movieRouter.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = movieRouter;