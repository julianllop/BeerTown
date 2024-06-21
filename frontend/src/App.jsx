import { Navigate, Route, Routes } from "react-router-dom";
// import "./App.css";
import BackToTop from "./components/backToTop";
import NavBar from "./components/navBar";
import Home from "./views/home";

function App() {
    return (
        <div className="w-full flex flex-col items-center content-between font-lato overflow-x-hidden">
            <NavBar />
            <BackToTop />
            <Routes>
                <Route path="/" element={<Navigate to="/beers/ale" />} />
                <Route exact path="/beers/:beerType" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
