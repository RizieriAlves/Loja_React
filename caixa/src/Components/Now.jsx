import React from "react";
import styles from "./Now.module.css";
import { useState, useEffect } from "react";

function Now({ now }) {
  const [itens, setItens] = useState([]);

  function getPedItens() {
    let pedidos = Object.values(now);
    let itenspedido = {};
    pedidos.forEach((pedido) => {
      pedido.pedido.itens.forEach((element) => {
        let item = element.name;
        if (itenspedido[item] === undefined) {
          itenspedido[item] = {
            qtd: 1,
            name: element.name,
            price: element.price,
          };
        } else {
          itenspedido[item].qtd++;
        }
      });
    });
    setItens(Object.values(itenspedido));
  }
  useEffect(() => {
    getPedItens();
  }, [now]);

  return (
    <>
      <h1>Pedidos</h1>
      <div className={styles.pedidos}>
        {Object.values(now).map((pedido) => {
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
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Now;
