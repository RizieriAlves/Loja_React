import React from "react";
import styles from "./Now.module.css";
import { useState, useEffect } from "react";
function History() {
  const [history, setHistory] = useState("");
  const [itens, setItens] = useState([]);
  //Fetch no banco
  async function fetchDataHistory() {
    try {
      const response = await fetch(`http://localhost:5000/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }

  //Nova consulta a cada 5 segundos
  useEffect(() => {
    async function getdata() {
      const data = await fetchDataHistory();
      setHistory(data);
    }
    getdata();

    const intervalo_att = setInterval(getdata, 5000);

    return () => clearInterval(intervalo_att);
  }, []);

  //Obtêm os itens de cada pedido.
  function getPedItens() {
    let pedidos = Object.values(history);
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

  //Faz nova chamada.
  useEffect(() => {
    getPedItens();
  }, [history]);

  return (
    <>
      <h1>Anteriores</h1>
      <div className={styles.pedidos}>
        {Object.values(history).map((pedido) => {
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

export default History;
