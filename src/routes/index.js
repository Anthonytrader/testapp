const express = require('express');
const genreRouter = require('./genre.routes');
const actorRouter = require('./actor.routes');
const directorRouter = require('./director.route');
const movieRouter = require('./movie.routes');
const router = express.Router();

// colocar las rutas aquí
router.use(genreRouter);
router.use(actorRouter);
router.use(directorRouter);
router.use(movieRouter);
module.exports = router;

