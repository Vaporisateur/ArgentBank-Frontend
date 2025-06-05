import React from "react";
import PropTypes from "prop-types";

function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit"]),
  className: PropTypes.string,
};

export default Button;