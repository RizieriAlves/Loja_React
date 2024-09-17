import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Shopping from "./Shopping";

function Container() {
  const [itens, setItens] = useState([]);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [qtdItens, setqtdItens] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Shopping
              itens={itens}
              setItens={setItens}
              cart={cart}
              setCart={setCart}
              price={price}
              setPrice={setPrice}
              qtdItens={qtdItens}
              setqtdItens={setqtdItens}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              itens={itens}
              setItens={setItens}
              cart={cart}
              setCart={setCart}
              price={price}
              setPrice={setPrice}
              qtdItens={qtdItens}
              setqtdItens={setqtdItens}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default Container;
