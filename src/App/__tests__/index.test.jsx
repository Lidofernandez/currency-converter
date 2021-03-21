import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import App from "../index";

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ rates: { BruceLee: 10 }, base: "ChuckNorris" }),
      }),
    );
  });

  afterEach(() => {
    fetch.mockClear();
  });

  it("should render", async () => {
    const { getByTestId, asFragment } = render(<App />);
    await waitFor(() => getByTestId("App"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the currencies", async () => {
    const { getByDisplayValue, getAllByTestId } = render(<App />);
    await waitFor(() => {
      getAllByTestId("Dropdown");
      getByDisplayValue("BruceLee");
      getByDisplayValue("ChuckNorris");
    });
  });

  it("should convert from target input", async () => {
    const { getByDisplayValue, getAllByTestId } = render(<App />);
    await waitFor(() => {
      getAllByTestId("Dropdown");
    });

    const chuckNorris = getByDisplayValue("1");
    fireEvent.change(chuckNorris, { target: { value: 9 } });
    await waitFor(() => getByDisplayValue(90));
  });

  it("should convert from ouput input", async () => {
    const { getByDisplayValue, getAllByTestId } = render(<App />);
    await waitFor(() => {
      getAllByTestId("Dropdown");
    });

    const bruceLee = getByDisplayValue("10");
    fireEvent.change(bruceLee, { target: { value: 100 } });
    await waitFor(() => getByDisplayValue(10));
  });

  it("should convert from target dropdown", async () => {
    const { getByDisplayValue, getAllByTestId } = render(<App />);
    await waitFor(() => {
      getAllByTestId("Dropdown");
    });

    const chuckNorris = getByDisplayValue("ChuckNorris");
    fireEvent.change(chuckNorris, { target: { value: "BruceLee" } });
    await waitFor(() => getByDisplayValue(10));
  });

  it("should convert from ouput dropdown", async () => {
    const { getByDisplayValue, getAllByTestId } = render(<App />);
    await waitFor(() => {
      getAllByTestId("Dropdown");
    });

    const bruceLee = getByDisplayValue("BruceLee");
    fireEvent.change(bruceLee, { target: { value: "ChuckNorris" } });
    await waitFor(() => getByDisplayValue(1));
  });
});
