import PropTypes from "prop-types";
import { setPage } from "../redux/pageSlice";
import { useDispatch } from "react-redux";
import { fetchBeers, setStatus } from "../redux/beerSlice";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Pagination({
    search,
    totalBeers,
    currentPage,
    currentBeerType,
    currentOrder,
}) {
    const dispatch = useDispatch();

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
            // await dispatch(setStatus());
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
            // await dispatch(setStatus());
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
            // await dispatch(setStatus());
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
            // await dispatch(setStatus());
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
        // await dispatch(setStatus());
    };

    const selectedButtonStyle =
        "flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 p-2 sm:p-4 rounded rounded-[100%]  border-green-700 bg-green-700 text-lime-100 focus:outline-none shadow-md  text-[12px] sm:text-lg";
    const unselectedButtonStyle =
        "flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 p-2 rounded rounded-[100%] border border-green-700 text-green-700 focus:outline-none shadow-md  text-[12px] sm:text-lg";
    const arrowButtonStyle =
        "flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded rounded-[100%] border border-green-700 text-green-700 focus:outline-none shadow-md  text-[12px] sm:text-lg";

    return (
        <div className="w-[90vw] h-10 flex items-center justify-center gap-2 sm:gap-4 text-[12px] sm:text-lg">
            <button onClick={handleGoBack} className={arrowButtonStyle}>
                <IoIosArrowBack />
            </button>
            {currentPage >= 4 && (
                <button
                    onClick={handlerFirst}
                    className={unselectedButtonStyle}
                >
                    <h1 className="flex items-center justify-center w-[28px] h-[28px]">
                        1
                    </h1>
                </button>
            )}

            {currentPage >= 4 && (
                <button
                    disabled={true}
                    className="h-7 w-7 flex items-center justify-center text-green-700 focus:outline-none"
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
                        <h1 className="flex items-center justify-center w-[28px] h-[28px]">
                            {number}
                        </h1>
                    </button>
                );
            })}
            {currentPage < totalPages - 2 && totalPages < 5 && (
                <button
                    disabled={"true"}
                    className="h-7 w-7 flex items-center justify-center text-green-700 focus:outline-none"
                >
                    ...
                </button>
            )}
            {currentPage < totalPages - 2 && totalPages < 5 && (
                <button onClick={handlerLast} className={unselectedButtonStyle}>
                    {totalPages}
                </button>
            )}

            <button onClick={handleForward} className={arrowButtonStyle}>
                <IoIosArrowForward />
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
