import React from "react";
import { render } from "@testing-library/react";
import App from "../index";

describe("App", () => {
  it("should render", () => {
    const { getByText } = render(<App />);
    getByText("hello");
  });
});
