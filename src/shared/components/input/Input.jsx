import "./input.css";

import PropTypes from "prop-types";

function Input(props) {
  const { type = "text", onChange, dataCy } = props;

  return (
    <div data-cy={dataCy} className="input-field">
      <input onChange={onChange} type={type} placeholder="Search Products" />
    </div>
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataCy: PropTypes.string,
};
