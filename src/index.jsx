import React from "react";
import { render } from "react-dom";
import App from "./App";

// This sw will handle the caching for the API calls
// and it will provide offline support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

render(<App />, document.getElementById("root"));
