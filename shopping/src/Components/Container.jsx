import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Shopping from "./Shopping";

function Container() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shopping />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default Container;
