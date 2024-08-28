import styles from "./components.css/checkout.module.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import Troco from "./Troco";
function Checkout({
  itens,
  setItens,
  cart,
  setCart,
  price,
  setPrice,
  qtdItens,
  setqtdItens,
}) {
  async function removeItem(index) {
    const array = [...cart];
    array.splice(index, 1);
    await setCart(array);

    let newprice = 0;
    newprice = array.reduce(function (total, item) {
      return total + item.price;
    }, 0);
    setPrice(newprice);
  }

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [num, setNum] = useState(0);
  const [pagamento, setPagamento] = useState("");
  const [troco, setTroco] = useState(0);
  async function concluirpedido(e) {
    e.preventDefault();

    let response = await fetch("http://localhost:5000/pedidos/");
    let pedidos = await response.json();

    let ids = await Object.keys(pedidos).map(Number);
    let next_Id = (await Math.max(...ids)) + 1;

    const pedidoID = Date.now();
    const pedido = {
      id: next_Id,
      exclusive_id: pedidoID,
      cliente: {
        nome: name,
        telefone: tel,
        cidade: cidade,
        bairro: bairro,
        Rua: rua,
        Numero: num,
      },
      pedido: {
        preco: price,
        troco: troco,
        itens: cart.map((item) => ({
          id: item.id,
          categoria: item.categoria,
          name: item.name,
          price: item.price,
        })),
      },
    };

    await fetch("http://localhost:5000/pedidos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.itens}>
        <ul>
          {cart.map(function (item, index) {
            return (
              <div key={index} className={styles.item}>
                <img
                  src={require(`./fotos/${item.foto}`)}
                  className={styles.image_item}
                  alt={item.name}
                />
                <li>
                  1x {item.name} - R${item.price.toFixed(2)}
                </li>{" "}
                <FaRegTrashCan
                  className={styles.trash}
                  onClick={async () => {
                    await removeItem(index);
                  }}
                />
              </div>
            );
          })}
        </ul>
        <h2>Total: R$ {price}</h2>
      </div>
      <div className={styles.form}>
        <h1>Concluir pedido</h1>
        <form onSubmit={concluirpedido}>
          <h2>Dados pessoais</h2>
          <label>
            Nome:{" "}
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Digite seu Nome"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label>
            Informe seu telefone:
            <input
              type="tel"
              name="telefone"
              id="telefone"
              placeholder="(DDD)Telefone"
              onChange={(e) => {
                setTel(e.target.value);
              }}
            />
          </label>
          <h2>Endereço</h2>
          <label>
            Cidade:{" "}
            <input
              type="text"
              name="Cidade"
              id="Cidade"
              placeholder="Digite sua Cidade"
              onChange={(e) => {
                setCidade(e.target.value);
              }}
            />
          </label>
          <label>
            Bairro:{" "}
            <input
              type="text"
              name="Bairro"
              id="Bairro"
              placeholder="Digite seu Bairro"
              onChange={(e) => {
                setBairro(e.target.value);
              }}
            />
          </label>
          <label>
            Rua:{" "}
            <input
              type="text"
              name="Rua"
              id="Rua"
              placeholder="Digite sua Rua"
              onChange={(e) => {
                setRua(e.target.value);
              }}
            />
          </label>
          <label>
            Numero:{" "}
            <input
              type="text"
              name="Numero"
              id="Numero"
              placeholder="Digite o Numero"
              onChange={(e) => {
                setNum(e.target.value);
              }}
            />
          </label>

          <h2>Forma de pagamento</h2>
          <label className={styles.pagamento}>
            <select
              name="pagamento"
              id="pagamento"
              onChange={(e) => {
                setPagamento(e.target.value);
              }}
            >
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de Débito</option>
              <option value="pix">Pix QR Code</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
            {pagamento == "dinheiro" ? <Troco setTroco={setTroco} /> : null}
          </label>

          <button>Finalizar pedido</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
