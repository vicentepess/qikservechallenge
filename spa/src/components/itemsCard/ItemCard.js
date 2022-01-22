import axios from "axios";
import React, { useState } from "react";
import "./style.css";

export const ItemCard = ({ item, cart, setCart, index }) => {
  const [qnt, setQnt] = useState(0);

  const addToCart = () => {
    axios.get(`/products/${item.id}`).then((res) => {
      if (qnt === 0) return;
      if (cart.length === 0) {
        setCart([...cart, { data: res.data, count: qnt }]);
      } else {
          if (cart.length === cart.filter(elem => elem.data.id !== item.id)){
              setCart([...cart, {data: res.data, count: qnt}])
          } else {
            setCart([...cart.filter(elem => elem.data.id !== item.id), {data: res.data, count: qnt} ])
          }
      }
    });
  };

  const handlePlusButton = () => {
    setQnt(qnt + 1);
  };

  const handleLessButton = () => {
    if (qnt === 0) return;
    setQnt(qnt - 1);
  };

  return (
    <div>
      <div className="main-container">
        <br />
        <h1>{item.name}</h1>
        <h3>£{item.price/100}</h3>
        <div className="qnt-container">
          <button onClick={handleLessButton}>-</button>
          <input value={qnt} disabled />
          <button onClick={handlePlusButton}>+</button>
        </div>
        <button onClick={addToCart}>Adicionar no carrinho</button>
      </div>
      <br />
    </div>
  );
};
