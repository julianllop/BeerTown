import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { fetchBeers, setStatus } from "../redux/beerSlice";
import { setPage } from "../redux/pageSlice";
import { setOrder } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";
import { setType } from "../redux/beerTypeSlice";

const ClearAll = ({ setSearch }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        await dispatch(setPage(1));
        await dispatch(setType("ale"));
        await dispatch(setOrder(""));
        setSearch("");
        await dispatch(
            fetchBeers({
                page: 1,
                beerType: "ale",
                order: "",
                name: "",
            })
        );
        navigate(`/beers/ale`);
        await dispatch(setStatus());
    };

    return (
        <button
            onClick={handleClick}
            className="w-full h-10 p-2 focus:outline-none rounded-md shadow-md bg-lime-50 cursor-pointer flex flex-row items-center justify-center hover:bg-ts-lime"
        >
            Clear filters
        </button>
    );
};

export default ClearAll;

ClearAll.propTypes = {
    setSearch: PropTypes.func,
};
