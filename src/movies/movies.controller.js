const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({
        status: 404,
        message: 'Movie cannot be found.'
    })
}

async function list(req, res) {
    const isShowing = req.query.is_showing;
    if(isShowing) {
        res.json({ data: await service.isShowing()});
    } else {
        res.json({ data: await service.list()});
    }
}

async function read(req, res) {
    res.json({ data: res.locals.movie });
}

async function readTheaters(req, res) {
    res.json({ data: await service.readTheaters(req.params.movieId) });
}

async function readReviews(req, res) {
    res.json({ data: await service.readReviews(req.params.movieId) });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    readTheaters: [asyncErrorBoundary(movieExists), readTheaters],
    readReviews: [asyncErrorBoundary(movieExists), readReviews],

}