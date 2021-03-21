import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CurrencyField from "../index";

describe("CurrencyField", () => {
  it("should render", () => {
    const { asFragment, getByDisplayValue } = render(
      <CurrencyField value="1" currencies={["EUR", "USD"]} />,
    );

    fireEvent.change(getByDisplayValue("1"), {
      target: { value: "mocked-value" },
    });

    fireEvent.change(getByDisplayValue("EUR"), {
      target: { value: "mocked-value" },
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle value inputs", () => {
    const handleOnChange = jest.fn();
    const { getByDisplayValue } = render(
      <CurrencyField handleOnChange={handleOnChange} value="1" />,
    );
    fireEvent.change(getByDisplayValue("1"), {
      target: { value: "mocked-value" },
    });

    expect(handleOnChange).toHaveBeenCalledTimes(1);
  });

  it("should render currencies", () => {
    const { getByDisplayValue, getByText } = render(
      <CurrencyField currencies={["EUR", "USD"]} />,
    );
    getByDisplayValue("EUR");
    getByText("USD");
  });
});
