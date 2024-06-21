import PropTypes from "prop-types";

export default function Label({ name, label }) {
    return (
        <label htmlFor={name} className="text-lg font-medium cursor-pointer">
            {label}
        </label>
    );
}

Label.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
};
