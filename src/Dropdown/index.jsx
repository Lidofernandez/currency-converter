import React from "react";
import PropTypes from "prop-types";

import css from "./index.scss";

const Dropdown = ({ options, getValue, value, testid }) => (
  <select
    onBlur={getValue}
    onChange={(event) => getValue(event)}
    value={value}
    data-testid={`${testid}`}
    className={css.select__dropdown}
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
  testid: "Dropdown",
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  getValue: PropTypes.func,
  testid: PropTypes.string,
};

export default Dropdown;
