const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./src/routes/index.routes");
require("dotenv").config();

const server = express();

server.use(
    cors({
        origin: [
            "https://beertown.onrender.com",
            "http://localhost:5173",
            "https://beer-town-backend.vercel.app",
            "https://beer-town.vercel.app",
        ],
        credentials: true,
    })
);
server.use(morgan("dev"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());

server.use("/", routes);

server.listen(3001, () => {
    console.log("Server listening on port: 3001");
});
