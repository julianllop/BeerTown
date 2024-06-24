import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FilterInput from "./filterInput";
import { useDispatch } from "react-redux";
import { fetchBeers, setStatus } from "../redux/beerSlice";
import { setType } from "../redux/beerTypeSlice";
import { setPage } from "../redux/pageSlice";
import { useNavigate, useParams } from "react-router-dom";
import { setOrder } from "../redux/orderSlice";

export default function Filters({ search, onClose }) {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentBeerType = params.beerType;
    const [selectedFilter, setSelectedFilter] = useState(currentBeerType);

    useEffect(() => {
        setSelectedFilter(currentBeerType);
    }, [currentBeerType]);

    const currentPage =
        parseInt(window.localStorage.getItem("currentPage")) || 1;

    useEffect(() => {
        dispatch(setType(currentBeerType));
    }, [currentBeerType, dispatch, navigate]);

    const handleFilter = async (typeOfBeer) => {
        onClose();
        setSelectedFilter(typeOfBeer);
        await dispatch(setPage(1));
        await dispatch(setType(typeOfBeer));
        await dispatch(setOrder(""));
        navigate(`/beers/${typeOfBeer}`);
        await dispatch(
            fetchBeers({
                page: currentPage,
                beerType: typeOfBeer,
                order: "",
                name: search,
            })
        );
        await dispatch(setStatus());
    };

    return (
        <div className="flex flex-col gap-2 w-full bg-lime-50">
            <div className="flex flex-col gap-2 shadow-md rounded-md">
                <FilterInput
                    value="ale"
                    name="ale"
                    label="ale"
                    checked={selectedFilter === "ale"}
                    onClick={() => handleFilter("ale")}
                />
                <FilterInput
                    value="red-ale"
                    name="redAle"
                    label="red ale"
                    checked={selectedFilter === "red-ale"}
                    onClick={() => handleFilter("red-ale")}
                />
                <FilterInput
                    value="stouts"
                    name="stout"
                    label="stout"
                    checked={selectedFilter === "stouts"}
                    onClick={() => handleFilter("stouts")}
                />
            </div>
        </div>
    );
}

Filters.propTypes = {
    search: PropTypes.string,
    onClose: PropTypes.func,
};
