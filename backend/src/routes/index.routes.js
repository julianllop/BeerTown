const { Router } = require("express");

const beerRouter = require("./beer.route");

const mainRouter = Router();

mainRouter.use("/beer", beerRouter);

module.exports = mainRouter;
