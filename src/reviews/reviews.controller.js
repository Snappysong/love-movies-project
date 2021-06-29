const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    return next({
        status: 404,
        message: 'Review cannot be found.'
    });
}

async function destroy(req, res) {
    await service.destroy(res.locals.review.review_id);
    res.sendStatus(204);
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    await service.update(updatedReview);
    res.json({ data: await service.returnUpdated(res.locals.review.review_id)});
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), destroy],
    update: [asyncErrorBoundary(reviewExists), update],

}