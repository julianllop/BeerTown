import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

export default function Beer({ price, name, rating, image, id }) {
    // const navigate = useNavigate();

    const handleClick = () => {
        // navigate(`http://localhost:3001/beer/${beerType}/${id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="w-[250px] h-[350px] shadow-md rounded-md flex flex-col justify-between items-start cursor-pointer hover:shadow-lg"
        >
            <img
                src={image}
                alt={name}
                className="w-[150px] h-[200px] self-center "
            />
            <div className="p-4">
                <h2 className="text-lg font-bold text-green-700">{price}</h2>
                <h2 className="text-sm">{name}</h2>
                <div className="flex flex-row items-center gap-2">
                    <FaStar className="text-orange-400" />
                    <h3>{rating.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
}

Beer.propTypes = {
    price: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,
};
