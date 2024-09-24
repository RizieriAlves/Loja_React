import { CartContext } from "../Context/CartContext";
import carrinho from "./components.css/carrinho.module.css";
import { useContext } from "react";

function Carrinho() {
  const { price, qtdItens } = useContext(CartContext);

  return (
    <>
      <div className={carrinho.container}>
        <div className={carrinho.final}>
          <b>
            Finalizar Compra
            <span className={carrinho.qtditens}>{qtdItens}</span>
          </b>
        </div>

        <p className={carrinho.price}>R$ {price}</p>
      </div>
    </>
  );
}

export default Carrinho;
