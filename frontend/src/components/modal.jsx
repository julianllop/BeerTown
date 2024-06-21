import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center transition-colors ${
                isOpen ? "visible bg-black/20" : "invisible"
            }`}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`bg-white h-[40vh] shadow ${
                    isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
                } w-[80%] sm:w-[40%] py-4  px-8 flex flex-col items-center justify-around rounded-lg`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-3xl text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 hover:shadow-sm text-2xl"
                >
                    <IoIosClose />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.children,
};
