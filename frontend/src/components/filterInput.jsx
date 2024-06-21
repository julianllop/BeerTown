import PropTypes from "prop-types";
import Checkbox from "./checkbox";
import Label from "./label";

export default function FilterInput({ value, name, checked, label, onClick }) {
    const handleClick = () => {
        onClick();
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center justify-start gap-4 w-full hover:bg-ts-lime rounded-md px-4 py-2 cursor-pointer"
        >
            <Checkbox
                value={value}
                name={name}
                checked={checked}
                onClick={onClick}
            />
            <Label name={name} label={label}></Label>
        </div>
    );
}

FilterInput.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
};
