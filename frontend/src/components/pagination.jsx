import PropTypes from "prop-types";
import { setPage } from "../redux/pageSlice";
import { useDispatch } from "react-redux";
import { fetchBeers } from "../redux/beerSlice";

export default function Pagination({
    search,
    totalBeers,
    currentPage,
    currentBeerType,
    currentOrder,
}) {
    const dispatch = useDispatch();

    console.log(search);

    const totalPages = Math.ceil(totalBeers / 10);

    let numbers = [];
    let startPage = 1;
    let endPage = Math.min(totalPages, 5);

    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
        endPage = totalPages;
    } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
    }

    for (let i = startPage; i <= endPage; i++) {
        numbers.push(i);
    }

    const handlePage = async (number) => {
        if (number !== currentPage) {
            await dispatch(setPage(number));
            await dispatch(
                fetchBeers({
                    page: number,
                    beerType: currentBeerType,
                    order: currentOrder,
                    name: search,
                })
            );
        }
    };

    const handleForward = async () => {
        if (currentPage < totalPages) {
            await dispatch(setPage(currentPage + 1));
            await dispatch(
                fetchBeers({
                    page: currentPage + 1,
                    beerType: currentBeerType,
                    order: currentOrder,
                    name: search,
                })
            );
        }
    };

    const handleGoBack = async () => {
        if (currentPage > 1) {
            await dispatch(setPage(currentPage - 1));
            await dispatch(
                fetchBeers({
                    page: currentPage - 1,
                    beerType: currentBeerType,
                    order: currentOrder,
                    name: search,
                })
            );
        }
    };

    const handlerFirst = async () => {
        if (currentPage > 1) {
            await dispatch(setPage(1));
            await dispatch(
                fetchBeers({
                    page: 1,
                    beerType: currentBeerType,
                    order: currentOrder,
                    name: search,
                })
            );
        }
    };

    const handlerLast = async () => {
        await dispatch(setPage(totalPages));
        await dispatch(
            fetchBeers({
                page: totalPages,
                beerType: currentBeerType,
                order: currentOrder,
                name: search,
            })
        );
    };

    const selectedButtonStyle =
        "flex items-center justify-center h-8 w-8 rounded rounded-3xl border border-green-700 bg-green-700 text-lime-100 focus:outline-none shadow-md";
    const unselectedButtonStyle =
        "flex items-center justify-center h-8 w-8 rounded rounded-3xl border border-green-700 text-green-700 focus:outline-none shadow-md";

    return (
        <div className="w-auto h-10 flex items-center justify-center p-4 gap-2">
            <button
                onClick={handlerFirst}
                className="flex items-center justify-center h-8 w-8 px-6 rounded-2xl border border-green-700 text-green-700 focus:outline-none shadow-md"
            >
                {"<<<"}
            </button>
            <button
                onClick={handleGoBack}
                className="flex items-center justify-center h-8 w-8 rounded-3xl border border-green-700 text-green-700 focus:outline-none shadow-md"
            >
                {"<"}
            </button>
            {currentPage >= 4 && (
                <button
                    disabled={true}
                    className="w-10 h-10 flex items-center justify-center text-green-700 focus:outline-none"
                >
                    ...
                </button>
            )}
            {numbers?.map((number) => {
                return (
                    <button
                        onClick={() => handlePage(number)}
                        key={number}
                        className={
                            currentPage === number
                                ? selectedButtonStyle
                                : unselectedButtonStyle
                        }
                    >
                        {number}
                    </button>
                );
            })}
            {currentPage < 10 && (
                <button
                    disabled={"true"}
                    className="w-10 h-10 flex items-center justify-center text-green-700 focus:outline-none"
                >
                    ...
                </button>
            )}
            <button
                onClick={handleForward}
                className="flex items-center justify-center h-8 w-8 rounded-3xl border border-green-700 text-green-700 focus:outline-none shadow-md"
            >
                {">"}
            </button>
            <button
                onClick={handlerLast}
                className="flex items-center justify-center h-8 w-8 px-6 rounded-2xl border border-green-700 text-green-700 focus:outline-none shadow-md"
            >
                {">>>"}
            </button>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalBeers: PropTypes.number,
    currentBeerType: PropTypes.string,
    currentOrder: PropTypes.string,
    search: PropTypes.string,
    paginate: PropTypes.func,
};
