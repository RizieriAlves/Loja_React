import React from "react";
import styles from "./Awaiting.module.css";
function Awaiting({ awaiting, itens }) {
  let pedidos = Object.values(awaiting);
  return (
    <>
      <h1>Pedidos</h1>
      <div className={styles.pedidos}>
        {Object.values(awaiting).map((pedido) => {
          return (
            <div key={pedido.id} className={styles.pedido}>
              <h2>Número do pedido: {pedido.id}</h2>
              <p>
                Cliente: {pedido.cliente.nome}. Telefone:
                {pedido.cliente.telefone}
              </p>
              <h3>Endereço</h3>
              <p>Cidade: {pedido.cliente.cidade}</p>
              <p>
                {pedido.cliente.Rua},{pedido.cliente.Numero}
              </p>
              <p>Bairro: {pedido.cliente.bairro}</p>
              <h3>Itens</h3>
              {itens.map((item, index) => {
                return (
                  <p key={index}>
                    {item.qtd}x {item.name}....R$ {item.price * item.qtd}
                  </p>
                );
              })}
              <h3>Valor total: R$ {pedido.pedido.preco}</h3>
              <div className={styles.actions}>
                <button
                  onClick={async () => {
                    const id = pedido.id;
                    await fetch("http://localhost:5000/history/", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(pedido),
                    });
                    await fetch("http://localhost:5000/now/", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(pedido),
                    });
                    await fetch(`http://localhost:5000/awaiting/${id}`, {
                      method: "DELETE",
                    });
                  }}
                >
                  ACEITAR PEDIDO
                </button>
                <button
                  onClick={async () => {
                    const id = pedido.id;
                    await fetch(`http://localhost:5000/awaiting/${id}`, {
                      method: "DELETE",
                    });
                  }}
                >
                  RECUSAR PEDIDO
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Awaiting;
