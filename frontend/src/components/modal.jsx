import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-start pt-20 md:items-center md:p-0 transition-colors ${
                isOpen ? "visible bg-black/20" : "invisible"
            }`}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`bg-paper h-[40vh] shadow ${
                    isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
                } w-[80%] sm:w-[40%] py-4  px-8 md:px-14 flex flex-col items-center justify-around rounded-lg`}
            >
                <button
                    onClick={onClose}
                    className="flex justify-center items-center absolute top-1 right-1 md:top-2 md:right-2 p-1 rounded-3xl text-gray-600 bg-paper hover:bg-paper hover:text-gray-900 shadow-lg hover:shadow-xl text-2xl md:text-3xl"
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
