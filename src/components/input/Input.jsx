import "./input.css";

import PropTypes from "prop-types";

function Input(props) {
  const { type = "text", onChange } = props;

  return (
    <div className="input-field">
      <input onChange={onChange} type={type} placeholder="Search Products" />
    </div>
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
