import React from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

//Provider
export const CartContextProvider = ({ children }) => {
  const [itens, setItens] = useState([]);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [qtdItens, setqtdItens] = useState(0);

  return (
    <CartContext.Provider
      value={{
        itens,
        setItens,
        cart,
        setCart,
        price,
        setPrice,
        qtdItens,
        setqtdItens,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
