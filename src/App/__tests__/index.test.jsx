import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import App from "../index";

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("base=ChuckNorris&symbols=BruceLee")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              rates: { BruceLee: 30 },
              base: "ChuckNorris",
            }),
        });
      }

      if (url.includes("ChuckNorris&symbols=CaptainAmerica")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              rates: { CaptainAmerica: 500 },
              base: "ChuckNorris",
            }),
        });
      }

      if (url.includes("CaptainAmerica&symbols=BruceLee")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              rates: { BruceLee: 5 },
              base: "CaptainAmerica",
            }),
        });
      }

      return Promise.resolve({
        json: () =>
          Promise.resolve({
            rates: { BruceLee: 10, CaptainAmerica: 500 },
            base: "ChuckNorris",
          }),
      });
    });
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
    const { getByDisplayValue } = render(<App />);
    await waitFor(() => {
      getByDisplayValue("BruceLee");
      getByDisplayValue("ChuckNorris");
    });
  });

  it("should convert from target input", async () => {
    const { getByDisplayValue, getByTestId } = render(<App />);
    await waitFor(() => {
      getByTestId("toConvert");
      getByTestId("converted");
    });

    const chuckNorris = getByDisplayValue("1");
    fireEvent.change(chuckNorris, { target: { value: 9 } });
    await waitFor(() => getByDisplayValue(270));
  });

  it("should convert from ouput input", async () => {
    const { getByDisplayValue, getByTestId } = render(<App />);
    await waitFor(() => {
      getByTestId("toConvert");
      getByTestId("converted");
    });

    const bruceLee = getByDisplayValue("1");
    fireEvent.change(bruceLee, { target: { value: 100 } });
    await waitFor(() => getByDisplayValue(3000));
  });

  it("should convert from target dropdown", async () => {
    const { getByDisplayValue, getByTestId } = render(<App />);
    await waitFor(() => {
      getByTestId("toConvert");
    });

    fireEvent.change(getByTestId("toConvert"), {
      target: { value: "CaptainAmerica" },
    });

    await waitFor(() => getByDisplayValue(5));
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it("should convert from ouput dropdown", async () => {
    const { getByDisplayValue, getByTestId } = render(<App />);
    await waitFor(() => {
      getByTestId("converted");
    });

    fireEvent.change(getByTestId("converted"), {
      target: { value: "CaptainAmerica" },
    });

    await waitFor(() => getByDisplayValue(500));
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it("should not trigger extra API for same options", async () => {
    const { getAllByDisplayValue, getByTestId } = render(<App />);
    await waitFor(() => {
      getByTestId("toConvert");
      getByTestId("converted");
    });

    fireEvent.change(getByTestId("converted"), {
      target: { value: "ChuckNorris" },
    });

    await waitFor(() => getAllByDisplayValue(1));
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
