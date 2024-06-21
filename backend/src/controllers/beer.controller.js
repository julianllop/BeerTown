const { getBeersFromApi } = require("../functions/beer.functions");

const getBeers = async (req, res) => {
    try {
        const { beerType } = req.params;
        const { page, order, name } = req.query;

        console.log(order);
        console.log(page);
        // console.log(name);

        const beers = await getBeersFromApi(beerType, page, order, name);

        res.status(200).json(beers);
    } catch (error) {
        res.status(400).json({
            message: "Error getting beers",
            error: error.message,
        });
    }
};

module.exports = {
    getBeers,
};
