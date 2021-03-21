import React from "react";
import PropTypes from "prop-types";

import Dropdown from "../Dropdown";

const CurrencyField = ({
  currencies,
  selectedCurrency,
  getCurrency,
  value,
  handleOnChange,
}) => (
  <>
    <input onChange={handleOnChange} value={value} type="number" />
    <Dropdown
      options={currencies}
      getValue={getCurrency}
      value={selectedCurrency}
    />
  </>
);

CurrencyField.defaultProps = {
  value: "",
  currencies: [],
  selectedCurrency: "",
  handleOnChange: () => {},
  getCurrency: () => {},
};

CurrencyField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  currencies: PropTypes.arrayOf(PropTypes.string),
  selectedCurrency: PropTypes.string,
  handleOnChange: PropTypes.func,
  getCurrency: PropTypes.func,
};

export default CurrencyField;
