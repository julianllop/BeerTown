import { useDispatch, useSelector } from "react-redux";
import BeerList from "../components/beerList";
import Filters from "../components/filters";
import Orders from "../components/orders";
import Pagination from "../components/pagination";
import { useParams } from "react-router-dom";
import { setPage } from "../redux/pageSlice";
import { setOrder } from "../redux/orderSlice";
import SearchBar from "../components/searchBar";
import ClearAll from "../components/clearAll";
import { useState } from "react";

export default function Home() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const fetchedBeers = useSelector((state) => state.beers.beers);
    const totalBeers = useSelector((state) => state.beers.beers.totalBeers);
    const currentPage = parseInt(
        window.localStorage.getItem("currentPage") || 1
    );
    const currentOrder = window.localStorage.getItem("currentOrder") || "";

    dispatch(setPage(currentPage));
    dispatch(setOrder(currentOrder));

    const params = useParams();

    const currentBeerType = params.beerType;

    return (
        <div className="w-full h-dvh px-10 py-5 gap-5 flex flex-col items-center justify-between ">
            <SearchBar
                currentBeerType={currentBeerType}
                search={search}
                setSearch={setSearch}
            />
            <div className="w-full flex flex-row">
                <div className="flex flex-col gap-8 px-4 w-[250px]">
                    <Filters search={search} />
                    <Orders
                        search={search}
                        currentBeerType={currentBeerType}
                        currentOrder={currentOrder}
                    />
                    <ClearAll setSearch={setSearch} />
                </div>
                <div className="flex flex-col items-center gap-10 w-[80vw]">
                    <BeerList currentOrder={currentOrder} />
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
