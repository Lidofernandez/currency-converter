import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ options, getValue, value }) => (
  <select
    onBlur={getValue}
    onChange={(event) => getValue(event)}
    value={value}
    data-testid="Dropdown"
  >
    {options.map((optionItem) => (
      <option key={optionItem} value={optionItem}>
        {optionItem}
      </option>
    ))}
  </select>
);

Dropdown.defaultProps = {
  options: [],
  value: "",
  getValue: () => {},
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  getValue: PropTypes.func,
};

export default Dropdown;
