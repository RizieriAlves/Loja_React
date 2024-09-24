import React from "react";
import styles from "./Now.module.css";
import { useState, useEffect } from "react";

async function fetchDataNow() {
  try {
    const response = await fetch("http://localhost:5000/now", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

function Now() {
  const [now, setNow] = useState("");

  useEffect(() => {
    async function getdata() {
      const data = await fetchDataNow();
      setNow(data);
    }
    getdata();

    const intervalo_att = setInterval(getdata, 5000);

    return () => clearInterval(intervalo_att);
  }, []);

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
              <button
                onClick={async () => {
                  const id = pedido.id;
                  await fetch(`http://localhost:5000/now/${id}`, {
                    method: "DELETE",
                  });
                  await fetch(`http://localhost:5000/history/${id}`, {
                    method: "DELETE",
                  });
                }}
              >
                EXCLUIR
              </button>
              <button
                onClick={async () => {
                  const id = pedido.id;
                  await fetch("http://localhost:5000/history/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pedido),
                  });
                  await fetch(`http://localhost:5000/now/${id}`, {
                    method: "DELETE",
                  });
                }}
              >
                FINALIZAR
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Now;
