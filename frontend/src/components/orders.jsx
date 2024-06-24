import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { fetchBeers, setStatus } from "../redux/beerSlice";
import { setPage } from "../redux/pageSlice";
import { setOrder } from "../redux/orderSlice";

export default function Orders({
    search,
    currentBeerType,
    currentOrder,
    onClose,
}) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Order by");

    const handleOption = async (option) => {
        if (currentOrder !== option.order) {
            onClose();
            setIsOpen(false);
            setSelectedOption(option.name);
            await dispatch(setPage(1));
            await dispatch(setOrder(option.order));
            await dispatch(
                fetchBeers({
                    page: 1,
                    beerType: currentBeerType,
                    order: option.order,
                    name: search,
                })
            );
            // await dispatch(setStatus());
        }
    };

    const buttonClass = "h-10 w-full text-left p-2 hover:bg-ts-lime rounded-md";

    return (
        <div className="flex flex-col gap-2 w-full">
            <div
                className="w-full h-10  focus:outline-none rounded-md shadow-md bg-lime-50 cursor-pointer flex flex-row items-center justify-between relative hover:bg-ts-lime"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4 className="pl-2">
                    {currentOrder === "" ? "Order by" : selectedOption}
                </h4>
                <button className="pr-2">
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                {isOpen && (
                    <div className="flex flex-col items-start w-full h-auto focus:outline-none rounded-md shadow-md top-2 bg-lime-50 z-10 absolute origin-top-right mt-12">
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
        </div>
    );
}

Orders.propTypes = {
    currentBeerType: PropTypes.string,
    currentOrder: PropTypes.string,
    search: PropTypes.string,
    onClose: PropTypes.func,
};
