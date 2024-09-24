import styles from "./components.css/checkout.module.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState, useContext } from "react";
import Troco from "./Troco";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function Checkout() {
  const { cart, setCart, price, setPrice, setqtdItens } =
    useContext(CartContext);

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
  const navigate = useNavigate();

  if (cart.length == 0) {
    setqtdItens(0);
    navigate("/");
  }

  function validade(e) {
    e.preventDefault();
    if (cart.length == 0) {
      alert("Carrinho vazio, você será redirecionado para o carrinho");
      navigate("/");
    }

    concluirpedido();
  }

  async function concluirpedido() {
    let response = await fetch("http://localhost:5000/history/");
    let pedidos = await response.json();

    let ids = Object.keys(pedidos).map(Number);
    let next_Id = (Math.max(...ids) || 0) + 1;
    next_Id = next_Id.toString();

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
          payment: pagamento,
        })),
      },
    };

    await fetch("http://localhost:5000/awaiting/", {
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
        <form onSubmit={validade}>
          <h2>Dados pessoais</h2>
          <label>
            Nome:{" "}
            <input
              type="text"
              name="nome"
              id="nome"
              required
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
              required
              max-length="14"
              value={tel}
              placeholder="(00)00000-0000"
              onChange={(e) => {
                let telefone = e.target.value.replace(/\D/g, "");
                if (telefone.length > 0) {
                  telefone = "(" + telefone;
                }
                if (telefone.length > 3) {
                  telefone = telefone.slice(0, 3) + ")" + telefone.slice(3);
                }
                if (telefone.length > 8) {
                  telefone = telefone.slice(0, 9) + "-" + telefone.slice(9);
                }
                setTel(telefone);
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
              required
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
              required
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
              required
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
              max-length="5"
              required
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
              required
              onChange={(e) => {
                setPagamento(e.target.value);
              }}
            >
              <option value="" selected disabled></option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de Débito</option>
              <option value="pix">Pix QR Code</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
            {pagamento == "dinheiro" ? <Troco setTroco={setTroco} /> : null}
          </label>

          <button className={styles.sendbutton}>Finalizar pedido</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
