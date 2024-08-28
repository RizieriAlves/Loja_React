function AddCart({ id, name, price, onClick }) {
  return (
    <button onClick={onClick} name={name} key={id}>
      R${price}
    </button>
  );
}
export default AddCart;
