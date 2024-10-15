import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBeers } from "../redux/beerSlice";
import Beer from "./beer";

export default function BeerList({ currentOrder }) {
    const dispatch = useDispatch();

    const fetchedBeers = useSelector((state) => state.beers.allBeers);
    const beerStatus = useSelector((state) => state.beers.status);
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

    // console.log(fetchBeers);

    return (
        <div className="grid grid-cols-auto justify-items-center items-center justify-between w-full gap-8">
            {fetchedBeers?.map((beer) => (
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
