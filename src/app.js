const express = require("express");
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();
app.use(express.json());

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(cors({
//     origin: '*',
// }))

// const corsOptions = {
//     origin: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// }
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions))

// app.use(cors());
// app.options("*", cors());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
