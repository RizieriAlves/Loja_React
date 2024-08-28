import AddCart from "./AddCart";
import styles from "./components.css/images.module.css";
import item from "./components.css/itens.module.css";

function Itens(props) {
  let categoria = [props.array];

  let itens_final = [];
  categoria.forEach(function (categoria) {
    itens_final.push(categoria.itens);
  });

  // [[{...},{...}]]
  itens_final = itens_final.flat();
  // [{...},{...}]
  return itens_final.map(function (produto) {
    return (
      <div key={produto.id} className={item.container}>
        <div className={item.item}>
          <h2 className={item.name}>{produto.name}</h2>
          <p>{produto.descricao}</p>
          <AddCart
            id={produto.id}
            name={produto.name}
            price={produto.price}
            onClick={function () {
              props.AddtoCart(produto);
            }}
          />
        </div>
        <img
          src={require(`./fotos/${produto.foto}`)}
          className={styles.image_item}
          alt={produto.name}
        />
      </div>
    );
  });
}

export default Itens;
