const axios = require("axios");

const getBeersFromApi = async (typeOfBeer, page = 1, order, name) => {
    const limit = 10;

    const beers = await axios.get(
        `https://api.sampleapis.com/beers/${typeOfBeer}`
    );

    if (order && orders[order]) {
        orders[order](beers.data);
    }

    if (name) {
        const byName = beers.data.filter((beer) =>
            beer.name.toLowerCase().includes(name.toLocaleLowerCase())
        );

        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedBeers = byName.slice(start, end);

        // console.log(paginatedBeers);

        return (
            byName.length && {
                beers: paginatedBeers,
                totalBeers: byName.length,
            }
        );
    } else {
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedBeers = beers.data.slice(start, end);

        return {
            beers: paginatedBeers,
            totalBeers: beers.data.length,
        };
    }
};

const orders = {
    orderNameAZ: (beers) => {
        beers.sort((a, b) => a.name.localeCompare(b.name));
    },
    orderNameZA: (beers) => {
        beers.sort((a, b) => b.name.localeCompare(a.name));
    },
    orderPriceCheap: (beers) => {
        beers.sort((a, b) => {
            const precioA = parseFloat(a.price.substring(1));
            const precioB = parseFloat(b.price.substring(1));
            return precioA - precioB;
        });
    },
    orderPriceExpensive: (beers) => {
        beers.sort((a, b) => {
            const precioA = parseFloat(a.price.substring(1));
            const precioB = parseFloat(b.price.substring(1));
            return precioB - precioA;
        });
    },
    orderLessRated: (beers) => {
        beers.sort((a, b) => a.rating.average - b.rating.average);
    },
    orderMostRated: (beers) => {
        beers.sort((a, b) => b.rating.average - a.rating.average);
    },
};

module.exports = {
    getBeersFromApi,
};
