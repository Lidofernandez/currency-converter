import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dropdown from "../index";

describe("Dropdown", () => {
  it("should render", () => {
    const { getByDisplayValue } = render(
      <Dropdown options={["hello", "world"]} value="hello" />,
    );

    const selectedValue = getByDisplayValue("hello");
    fireEvent.change(selectedValue);

    getByDisplayValue("hello");
  });

  it("should return the selected value", () => {
    const getValue = jest.fn();
    const { getByDisplayValue } = render(
      <Dropdown
        options={["hello", "world"]}
        value="world"
        getValue={getValue}
      />,
    );

    const selectedValue = getByDisplayValue("world");
    fireEvent.change(selectedValue);

    expect(getValue).toHaveBeenCalled();
  });
});
