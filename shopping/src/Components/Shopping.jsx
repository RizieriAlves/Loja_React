import React from "react";
import styles from "./components.css/shopping.module.css"; // Importa o objeto de estilos;
import Categorias from "./Categorias";
import { useEffect } from "react";
import Carrinho from "./Carrinho";
import { Link } from "react-router-dom";
function Shopping({
  itens,
  setItens,
  cart,
  setCart,
  price,
  setPrice,
  qtdItens,
  setqtdItens,
}) {
  function AddtoCart(produto) {
    var carrinho = cart.slice();
    carrinho.push(produto);
    setCart(carrinho);

    var newprice = price + produto.price;
    setPrice(newprice);

    setqtdItens(carrinho.length);

    console.log(cart, price, qtdItens);
  }

  useEffect(() => {
    fetch("http://localhost:5000/itens", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((itens) => {
        setItens(itens);
      })
      .catch((error) => console.log("Erro na obtenção de Produtos."));
  }, [setItens]);

  return (
    <div key={1} className={styles.container}>
      <Categorias
        className={styles.categorias}
        itens={itens}
        AddtoCart={AddtoCart}
      />

      {qtdItens > 0 && (
        <Link to="/checkout" state={{ cart, price }}>
          <Carrinho
            totalprice={price}
            qtditens={qtdItens}
            cart_itens={cart}
            setCart={setCart}
          />
        </Link>
      )}
    </div>
  );
}

export default Shopping;