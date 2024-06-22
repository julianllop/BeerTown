import PropTypes from "prop-types";
import { PiWarningCircleThin } from "react-icons/pi";

const Error = () => {
    const message = "I'm sorry! We don't have those beers in our stock";
    return (
        <div className="w-[80vw] h-[70vh] border-2 border-red-900/70 rounded-lg flex flex-col justify-center items-center gap-5">
            <PiWarningCircleThin className="text-5xl text-red-900/70" />
            <h3 className="text-xl font-semibold px-4 text-center text-red-900/70">
                {message}
            </h3>
        </div>
    );
};

export default Error;

Error.propTypes = {
    error: PropTypes.string,
};
