import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { fetchBeers } from "../redux/beerSlice";
import { setPage } from "../redux/pageSlice";
import { setOrder } from "../redux/orderSlice";

export default function Orders({ search, currentBeerType, currentOrder }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Order by");

    const handleOption = async (option) => {
        if (currentOrder !== option.order) {
            setSelectedOption(option.name);
            setIsOpen(false);
            await dispatch(setOrder(option.order));
            await dispatch(setPage(1));
            await dispatch(
                fetchBeers({
                    page: 1,
                    beerType: currentBeerType,
                    order: option.order,
                    name: search,
                })
            );
        }
    };

    const buttonClass = "h-10 w-full text-left p-2 hover:bg-ts-lime rounded-md";

    return (
        <div className="flex flex-col gap-2 w-[210px]">
            <div
                className="w-full h-10 p-2 focus:outline-none rounded-md shadow-md bg-lime-50 cursor-pointer flex flex-row items-center justify-between relative hover:bg-ts-lime"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4>{currentOrder === "" ? "Order by" : selectedOption}</h4>
                <button>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
            </div>
            {isOpen && (
                <div className="flex flex-col items-start w-[210px] h-auto focus:outline-none rounded-md shadow-md bg-lime-50 z-10 absolute origin-top-right mt-12">
                    <button
                        className={buttonClass}
                        onClick={() =>
                            handleOption({
                                name: "Order by",
                                order: "",
                            })
                        }
                    >
                        None
                    </button>
                    <button
                        className={buttonClass}
                        onClick={() => {
                            handleOption({
                                name: "Name (a-z)",
                                order: "orderNameAZ",
                            });
                        }}
                    >
                        Name (a-z)
                    </button>
                    <button
                        className={buttonClass}
                        onClick={() => {
                            handleOption({
                                name: "Name (z-a)",
                                order: "orderNameZA",
                            });
                        }}
                    >
                        Name (z-a)
                    </button>
                    <button
                        className={buttonClass}
                        onClick={() => {
                            handleOption({
                                name: "Lower price",
                                order: "orderPriceCheap",
                            });
                        }}
                    >
                        Lower price
                    </button>
                    <button
                        className={buttonClass}
                        onClick={() => {
                            handleOption({
                                name: "Higher price",
                                order: "orderPriceExpensive",
                            });
                        }}
                    >
                        Higher price
                    </button>
                    <button
                        className={buttonClass}
                        onClick={() => {
                            handleOption({
                                name: "Best rated",
                                order: "orderMostRated",
                            });
                        }}
                    >
                        Best rated
                    </button>
                    <button
                        className={buttonClass}
                        onClick={() => {
                            handleOption({
                                name: "Worst rated",
                                order: "orderLessRated",
                            });
                        }}
                    >
                        Worst rated
                    </button>
                </div>
            )}
        </div>
    );
}

Orders.propTypes = {
    currentBeerType: PropTypes.string,
    currentOrder: PropTypes.string,
    search: PropTypes.string,
};
