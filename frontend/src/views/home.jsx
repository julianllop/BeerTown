import { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const BeerList = lazy(() => import("../components/beerList"));
import Filters from "../components/filters";
import Orders from "../components/orders";
import Pagination from "../components/pagination";
import { useParams } from "react-router-dom";
import { setPage } from "../redux/pageSlice";
import { setOrder } from "../redux/orderSlice";
import SearchBar from "../components/searchBar";
import ClearAll from "../components/clearAll";
import { LuFilter } from "react-icons/lu";
import Modal from "../components/modal";
import SkeletonList from "../components/skeletonList";
import Error from "../components/error";
// import SkeletonList from "../components/skeletonList";

export default function Home() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const beerStatus = useSelector((state) => state.beers.status);
    const fetchedBeers = useSelector((state) => state.beers.beers);
    const error = useSelector((state) => state.beers.error);
    const totalBeers = useSelector((state) => state.beers.beers.totalBeers);
    const currentPage = parseInt(
        window.localStorage.getItem("currentPage") || 1
    );
    const currentOrder = window.localStorage.getItem("currentOrder") || "";

    dispatch(setPage(currentPage));
    dispatch(setOrder(currentOrder));

    const params = useParams();

    const currentBeerType = params.beerType;

    const onClose = () => setIsOpen(false);

    console.log(error);

    return (
        <div className="w-full px-10 py-5 gap-10 flex flex-col items-center justify-between ">
            <div className="flex flex-row w-[100vw] sm:w-[80vw] sm:justify-between sm:px-5 items-center justify-center gap-10 ">
                <div
                    onClick={() => setIsOpen(true)}
                    className="h-10 w-10 sm:w-auto sm:px-2 sm:gap-2 flex justify-center items-center shadow-lg hover:shadow-xl bg-green-700 text-lime-100 text-xl rounded"
                >
                    <LuFilter className="z-10" />
                    <h2 className="hidden sm:block">filters</h2>
                </div>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <Filters search={search} onClose={onClose} />
                    <Orders
                        search={search}
                        currentBeerType={currentBeerType}
                        currentOrder={currentOrder}
                        onClose={onClose}
                    />
                    <ClearAll setSearch={setSearch} onClose={onClose} />
                </Modal>
                <SearchBar
                    currentBeerType={currentBeerType}
                    search={search}
                    setSearch={setSearch}
                />
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-row gap-8 w-[100vw]"></div>
                <div className="flex flex-col items-center justify-center gap-10 w-[80vw]">
                    {beerStatus === "loading" ? (
                        <SkeletonList />
                    ) : beerStatus === "failed" ? (
                        <Error error={error} />
                    ) : (
                        <Suspense fallback={<SkeletonList />}>
                            <BeerList currentOrder={currentOrder} />
                        </Suspense>
                    )}

                    <Pagination
                        search={search}
                        currentOrder={currentOrder}
                        currentPage={currentPage}
                        currentBeerType={currentBeerType}
                        totalBeers={fetchedBeers ? totalBeers : 0}
                    />
                </div>
            </div>
        </div>
    );
}
