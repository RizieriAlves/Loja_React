import Itens from "./Itens";
import categoria from "./components.css/categoria.module.css";

function Categorias({ itens, AddtoCart }) {
  //Filtra os objetos visiveis, não feito com map para não incluir undefined.
  let visible_on = [];
  function visivel() {
    Object.values(itens).forEach(function (item) {
      if (item.visible) {
        visible_on.push(item);
      }
    });
  }
  visivel();
  //Passa por cada item, verificando se dentro de um array já existe a categoria do item.
  //Separa por categoria.
  let categorias = [];
  function criaCategoria() {
    visible_on.forEach(function (item) {
      let cat_item = item.categoria;
      if (categorias[cat_item] === undefined) {
        categorias[cat_item] = { itens: [], id: cat_item };
      }
      categorias[cat_item].itens.push(item);
    });
  }
  criaCategoria();
  categorias = Object.values(categorias);
  //Renderiza uma categoria por vez:
  return categorias.map(function (item) {
    return (
      <div key={item.id} className={categoria.categoria}>
        <h1>{item.id}</h1>
        <div className={categoria.itens}>
          <Itens array={item} AddtoCart={AddtoCart} />
        </div>
      </div>
    );
  });
}
export default Categorias;
