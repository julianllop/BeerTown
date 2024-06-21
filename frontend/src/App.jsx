import { Navigate, Route, Routes } from "react-router-dom";
// import "./App.css";
import BackToTop from "./components/backToTop";
import NavBar from "./components/navBar";
import Home from "./views/home";
import Detail from "./views/detail";

function App() {
    return (
        <div className="w-full h-[100vh] flex flex-col items-center content-between font-lato overflow-x-hidden">
            <NavBar />
            <BackToTop />
            <Routes>
                <Route path="/" element={<Navigate to="/beers/ale" />} />
                <Route exact path="/beers/:beerType" element={<Home />} />
                <Route exact path="/beers/:beerType/:id" element={<Detail />} />
            </Routes>
        </div>
    );
}

export default App;
