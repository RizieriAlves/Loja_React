import React from "react";

function Troco({ setTroco }) {
  return (
    <>
      {" "}
      <p>Troco para:</p>
      <input
        style={{ width: "100px" }}
        type="number"
        placeholder="R$"
        onChange={(e) => {
          setTroco(parseFloat(e.target.value));
        }}
      />
    </>
  );
}

export default Troco;
