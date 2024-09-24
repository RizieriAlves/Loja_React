import { BrowserRouter, Routes, Route } from "react-router-dom";
import Console from "./Components/Console";
import Now from "./Components/Now";
import History from "./Components/History";
import styles from "./App.module.css";
import Awaiting from "./Components/Awaiting";
import { useState, useEffect } from "react";

function App() {
  //Fetch novos pedidos
  async function fetchDataAwaiting() {
    try {
      const response = await fetch("http://localhost:5000/awaiting", {
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

  const [awaiting, setAwaiting] = useState("");

  useEffect(() => {
    async function getdata() {
      const data = await fetchDataAwaiting();
      setAwaiting(data);
    }
    getdata();

    const intervalo_att = setInterval(getdata, 5000);

    return () => clearInterval(intervalo_att);
  }, []);

  const [itens, setItens] = useState([]);

  function getPedItens() {
    let pedidos = Object.values(awaiting);
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
  }, [awaiting]);

  return (
    <>
      <BrowserRouter>
        <Console />
        {awaiting.length > 0 ? (
          <Awaiting itens={itens} awaiting={awaiting} />
        ) : (
          <div className={styles.container}>
            <Routes>
              <Route path="/" element={<Now />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </>
  );
}
export default App;
