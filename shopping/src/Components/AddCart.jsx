import styles from "./components.css/AddCart.module.css";

function AddCart({ id, name, price, onClick }) {
  return (
    <button className={styles.addcart} onClick={onClick} name={name} key={id}>
      R${price}
    </button>
  );
}
export default AddCart;
