const express = require("express");
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const app = express();

const corsOptions = {
    origin: "*",
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
