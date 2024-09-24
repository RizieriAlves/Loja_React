import React from "react";
import ReactDOM from "react-dom/client";
import Container from "./Components/Container";
import { CartContextProvider } from "./Context/CartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartContextProvider>
      <Container />
    </CartContextProvider>
  </React.StrictMode>
);
