import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBeers } from "../redux/beerSlice";
import Beer from "./beer";

export default function BeerList({ currentOrder }) {
    const dispatch = useDispatch();

    const fetchedBeers = useSelector((state) => state.beers.beers);
    const beerStatus = useSelector((state) => state.beers.status);
    const error = useSelector((state) => state.beers.error);
    const currentPage =
        parseInt(window.localStorage.getItem("currentPage")) || 1;
    const currentBeerType =
        window.localStorage.getItem("currentBeerType") || "ale";
    useEffect(() => {
        if (beerStatus === "idle") {
            dispatch(
                fetchBeers({
                    page: currentPage,
                    beerType: currentBeerType,
                    order: currentOrder,
                })
            );
        }
    }, [beerStatus, dispatch, currentPage, currentBeerType, currentOrder]);

    if (beerStatus === "loading") {
        return <div>Loading...</div>;
    }

    if (beerStatus === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-auto w-[80vw] gap-8">
            {fetchedBeers?.beers?.map((beer) => (
                <Beer
                    key={beer.id}
                    price={beer.price}
                    name={beer.name}
                    rating={beer.rating.average}
                    image={beer.image}
                    id={beer.id}
                />
            ))}
        </div>
    );
}

BeerList.propTypes = {
    currentOrder: PropTypes.string,
};
