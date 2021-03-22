import React, { useState, useEffect } from "react";
import CurrencyField from "../CurrencyField";

const API_CURRENCY_URL = "https://api.exchangeratesapi.io/latest";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState();
  const [value, setValue] = useState(1);
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isValueToConvert, setIsValueToConvert] = useState(true);

  useEffect(() => {
    async function fetchCurrencyRates() {
      try {
        setLoading(true);
        const response = await fetch(API_CURRENCY_URL);

        const data = await response.json();
        setLoading(false);
        const rateList = Object.keys(data.rates);
        setCurrencies([data.base, ...rateList]);
        setCurrency(data.base);
        setToCurrency(rateList[0]);
        setExchangeRate(data.rates[rateList[0]]);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchCurrencyRates();
  }, []);

  useEffect(() => {
    async function fetchCurrencyRate() {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_CURRENCY_URL}?base=${currency}&symbols=${toCurrency}`,
        );

        const data = await response.json();
        setLoading(false);
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        setLoading(false);
      }
    }

    if (currency && toCurrency) {
      if (currency === toCurrency) {
        setExchangeRate(1);
        return;
      }

      fetchCurrencyRate();
    }
  }, [currency, toCurrency]);

  const getCurrency = (event) => {
    setCurrency(event.currentTarget.value);
  };

  const getToCurrency = (event) => {
    setToCurrency(event.currentTarget.value);
  };

  const getValue = (event) => {
    setValue(event.currentTarget.value);
    setIsValueToConvert(true);
  };

  const getToValue = (event) => {
    setValue(event.currentTarget.value);
    setIsValueToConvert(false);
  };

  let valueToConvert;
  let valueConverted;
  if (isValueToConvert) {
    valueToConvert = value;
    valueConverted = value * exchangeRate;
  } else {
    valueConverted = value;
    valueToConvert = value / exchangeRate;
  }

  return (
    <div data-testid="App">
      {loading ? (
        "loading..."
      ) : (
        <>
          <CurrencyField
            currencies={currencies}
            currencyTestid="toConvert"
            selectedCurrency={currency}
            getCurrency={getCurrency}
            handleOnChange={getValue}
            value={valueToConvert}
          />
          is equal to
          <CurrencyField
            currencies={currencies}
            currencyTestid="converted"
            selectedCurrency={toCurrency}
            getCurrency={getToCurrency}
            handleOnChange={getToValue}
            value={valueConverted}
          />
        </>
      )}
    </div>
  );
};

export default App;
