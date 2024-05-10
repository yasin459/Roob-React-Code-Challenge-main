import "./button.css";

import PropTypes from "prop-types";

function Button(props) {
  const { children = "Click me!", disabled, dataCy } = props;

  return (
    <button data-cy={dataCy} disabled={disabled} onClick={props.onClick}>
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  dataCy: PropTypes.string,
};
