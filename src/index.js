import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif", // Set "Roboto" as the default font for body text
    heading: "Roboto, sans-serif", // Set "Roboto" as the default font for headings
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>

        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
