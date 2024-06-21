import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { fetchBeers } from "../redux/beerSlice";
import { setPage } from "../redux/pageSlice";

const SearchBar = ({ search, setSearch, currentBeerType }) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState(search);

    const handleInputChange = (event) => {
        setInput(setSearch(event.target.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await dispatch(setPage(1));
        await dispatch(
            fetchBeers({
                page: 1,
                beerType: currentBeerType,
                order: "",
                name: search,
            })
        );
        setInput("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <div className="flex flex-row items-center justify-between shadow-lg rounded-full h-10 w-[70%] ">
            <input
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                value={input}
                placeholder="Search..."
                className="h-10 focus:outline-none bg-transparent px-6 w-[90%]"
            />
            <button
                onClick={handleSubmit}
                onKeyDown={handleKeyPress}
                className="hover:bg-ts-lime h-10 w-10 flex flex-row items-center justify-center rounded-r-full border-l border-ts-lime"
            >
                <IoIosSearch />
            </button>
        </div>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func,
    currentBeerType: PropTypes.string,
    currentOrder: PropTypes.string,
};
