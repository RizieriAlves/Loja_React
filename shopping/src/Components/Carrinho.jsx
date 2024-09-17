import carrinho from "./components.css/carrinho.module.css";

function Carrinho({ totalprice, qtditens, cart_itens }) {
  return (
    <>
      <div className={carrinho.container}>
        <div className={carrinho.final}>
          <b>
            Finalizar Compra
            <span className={carrinho.qtditens}>{qtditens}</span>
          </b>
        </div>

        <p className={carrinho.price}>R$ {totalprice}</p>
      </div>
    </>
  );
}

export default Carrinho;
