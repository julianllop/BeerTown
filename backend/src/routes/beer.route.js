const { Router } = require("express");
const { getBeers } = require("../controllers/beer.controller");

const beerRouter = Router();

beerRouter.get("/:beerType", getBeers);

module.exports = beerRouter;
